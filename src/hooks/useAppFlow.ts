import { useState, useCallback } from 'react';

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
    
    // TODO: Integrate Dodo payments here
    // For now, simulate payment processing
    console.log(`Processing ${plan} subscription...`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsPaymentLoading(false);
    setCurrentScreen('torch');
  }, []);

  return {
    currentScreen,
    isSubscribed,
    isPaymentLoading,
    goToPayment,
    goToTorch,
    handleSubscribe,
  };
};
