import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flashlight, Sun, Zap, AlertTriangle, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentScreenProps {
  onSubscribe: (plan: "monthly" | "yearly") => void;
  isLoading?: boolean;
}

const features = [
  { icon: Flashlight, text: "Instant torch control" },
  { icon: Sun, text: "Adjustable brightness" },
  { icon: Zap, text: "Strobe & blink modes" },
  { icon: AlertTriangle, text: "SOS emergency signal" },
];

export const PaymentScreen = React.forwardRef<HTMLDivElement, PaymentScreenProps>(({ onSubscribe, isLoading }, ref) => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  return (
    <div ref={ref} className="relative min-h-screen bg-background overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 30%, 
            hsl(185 100% 50% / 0.1) 0%, 
            transparent 60%
          )`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-8 safe-area-inset">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Flashlight className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-display tracking-wider text-gradient-torch">
              TORCH PRO
            </h1>
          </div>
          <p className="text-muted-foreground text-center">
            Unlock the full power of your flashlight
          </p>
        </motion.div>

        {/* Features recap */}
        <motion.div
          className="glass-surface rounded-2xl p-6 mt-8 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-sm font-semibold text-foreground tracking-wider mb-4 uppercase">
            What's included
          </h2>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <div className="p-1.5 rounded-full bg-accent/20">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="text-sm text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing tiers */}
        <motion.div
          className="w-full max-w-sm mt-6 flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Yearly plan */}
          <motion.button
            className={`relative w-full p-4 rounded-2xl border-2 transition-all text-left ${
              selectedPlan === "yearly"
                ? "border-accent bg-accent/10"
                : "border-border bg-card/50 hover:border-muted-foreground/50"
            }`}
            onClick={() => setSelectedPlan("yearly")}
            whileTap={{ scale: 0.98 }}
          >
            {/* Best value badge */}
            <div className="absolute -top-3 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-display font-bold rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              BEST VALUE
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <div>
                <h3 className="font-display font-semibold text-foreground">Yearly</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Save 16% vs monthly</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-display text-foreground">$9.99</p>
                <p className="text-xs text-muted-foreground">USD + taxes/year</p>
              </div>
            </div>
            
            {selectedPlan === "yearly" && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Check className="w-3 h-3 text-accent-foreground" />
              </motion.div>
            )}
          </motion.button>

          {/* Monthly plan */}
          <motion.button
            className={`relative w-full p-4 rounded-2xl border-2 transition-all text-left ${
              selectedPlan === "monthly"
                ? "border-primary bg-primary/10"
                : "border-border bg-card/50 hover:border-muted-foreground/50"
            }`}
            onClick={() => setSelectedPlan("monthly")}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display font-semibold text-foreground">Monthly</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Flexible billing</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-display text-foreground">$0.99</p>
                <p className="text-xs text-muted-foreground">USD + taxes/month</p>
              </div>
            </div>
            
            {selectedPlan === "monthly" && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Check className="w-3 h-3 text-primary-foreground" />
              </motion.div>
            )}
          </motion.button>
        </motion.div>

        {/* Subscribe button */}
        <motion.div
          className="mt-auto pt-8 w-full max-w-sm flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => onSubscribe(selectedPlan)}
            disabled={isLoading}
            className="w-full h-14 text-lg font-display tracking-wider bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity rounded-xl disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                Subscribe Now
                {selectedPlan === "yearly" ? " — $9.99/year" : " — $0.99/month"}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground/60 text-center">
            Secure payment. Cancel anytime.<br />
            By subscribing, you agree to our Terms of Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
});

PaymentScreen.displayName = "PaymentScreen";
