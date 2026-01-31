import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckoutRequest {
  plan: 'monthly' | 'yearly';
  returnUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('DODO_PAYMENTS_API_KEY');
    if (!apiKey) {
      console.error('DODO_PAYMENTS_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { plan, returnUrl } = await req.json() as CheckoutRequest;
    console.log(`Creating checkout for plan: ${plan}, returnUrl: ${returnUrl}`);

    // Define product IDs based on plan
    // These should be replaced with actual Dodo product IDs once created
    const productId = plan === 'yearly' 
      ? Deno.env.get('DODO_YEARLY_PRODUCT_ID') || 'pdt_torch_yearly'
      : Deno.env.get('DODO_MONTHLY_PRODUCT_ID') || 'pdt_torch_monthly';

    // Create checkout session via Dodo API
    const response = await fetch('https://api.dodopayments.com/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billing: {
          city: "",
          country: "US",
          state: "",
          street: "",
          zipcode: "",
        },
        customer: {
          email: "",
          name: "",
        },
        product_id: productId,
        quantity: 1,
        return_url: returnUrl,
        payment_link: true,
        metadata: {
          plan: plan,
          source: 'torch_app',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Dodo API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create checkout session', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Checkout session created:', data);

    return new Response(
      JSON.stringify({ 
        checkoutUrl: data.payment_link || data.checkout_url,
        subscriptionId: data.subscription_id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    const error = err as Error;
    console.error('Error creating checkout:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});