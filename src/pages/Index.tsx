import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "./SplashScreen";
import { PaymentScreen } from "./PaymentScreen";
import { TorchScreen } from "./TorchScreen";
import { useAppFlow } from "@/hooks/useAppFlow";

const Index = () => {
  const {
    currentScreen,
    isPaymentLoading,
    goToPayment,
    handleSubscribe,
  } = useAppFlow();

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'splash' && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <SplashScreen onContinue={goToPayment} />
        </motion.div>
      )}

      {currentScreen === 'payment' && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <PaymentScreen 
            onSubscribe={handleSubscribe}
            isLoading={isPaymentLoading}
          />
        </motion.div>
      )}

      {currentScreen === 'torch' && (
        <motion.div
          key="torch"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TorchScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
