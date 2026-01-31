import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type AppScreen = 'splash' | 'payment' | 'torch';

export const useAppFlow = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const goToPayment = useCallback(() => {
    setCurrentScreen('payment');
  }, []);

  const goToTorch = useCallback(() => {
    setCurrentScreen('torch');
  }, []);

  const handleSubscribe = useCallback(async (plan: 'monthly' | 'yearly') => {
    setIsPaymentLoading(true);
    
    try {
      const returnUrl = `${window.location.origin}?payment=success`;
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan, returnUrl },
      });

      if (error) {
        console.error('Checkout error:', error);
        toast.error('Failed to start checkout. Please try again.');
        setIsPaymentLoading(false);
        return;
      }

      if (data?.checkoutUrl) {
        // Redirect to Dodo checkout
        window.location.href = data.checkoutUrl;
      } else {
        console.error('No checkout URL received:', data);
        toast.error('Payment service unavailable. Please try again later.');
        setIsPaymentLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Something went wrong. Please try again.');
      setIsPaymentLoading(false);
    }
  }, []);

  // Check for payment success on mount
  useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setIsSubscribed(true);
      setCurrentScreen('torch');
      toast.success('Payment successful! Enjoy your Torch Pro subscription.');
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  });

  return {
    currentScreen,
    isSubscribed,
    isPaymentLoading,
    goToPayment,
    goToTorch,
    handleSubscribe,
  };
};
