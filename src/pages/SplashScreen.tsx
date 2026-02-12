import React from "react";
import { motion } from "framer-motion";
import { Flashlight, Sun, Zap, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SplashScreenProps {
  onContinue: () => void;
}

const features = [
  {
    icon: Flashlight,
    title: "Easy Torch Light",
    description: "One tap to illuminate your surroundings instantly",
  },
  {
    icon: Sun,
    title: "Adjustable Brightness",
    description: "Set the perfect brightness level for any situation",
  },
  {
    icon: Zap,
    title: "Multiple Light Modes",
    description: "Steady, strobe, and SOS emergency patterns",
  },
  {
    icon: AlertTriangle,
    title: "SOS Emergency Signal",
    description: "Universal distress signal at your fingertips",
  },
];

export const SplashScreen = React.forwardRef<HTMLDivElement, SplashScreenProps>(({ onContinue }, ref) => {
  return (
    <div ref={ref} className="relative min-h-screen bg-background overflow-hidden">
      {/* Background glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 20%, 
            hsl(45 100% 55% / 0.15) 0%, 
            hsl(185 100% 50% / 0.05) 40%, 
            transparent 70%
          )`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-12 safe-area-inset">
        {/* Logo & Header */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 20px hsl(45 100% 55% / 0.5))",
                "drop-shadow(0 0 40px hsl(45 100% 55% / 0.8))",
                "drop-shadow(0 0 20px hsl(45 100% 55% / 0.5))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flashlight className="w-20 h-20 text-accent" />
          </motion.div>
          
          <h1 className="text-4xl font-bold font-display tracking-wider text-gradient-torch">
            TORCH
          </h1>
          <p className="text-muted-foreground text-center max-w-xs">
            Your pocket flashlight, always ready
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="flex flex-col gap-4 mt-12 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-surface rounded-xl p-4 flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-sm font-semibold text-foreground tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing teaser */}
        <motion.div
          className="mt-auto pt-8 flex flex-col items-center gap-6 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <p className="text-muted-foreground text-sm">All this for just</p>
            <p className="text-3xl font-bold font-display text-gradient-torch mt-1">
              $1<span className="text-lg text-muted-foreground">/month</span>
            </p>
          </div>

          <Button
            onClick={onContinue}
            className="w-full h-14 text-lg font-display tracking-wider bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity rounded-xl"
          >
            Get Started
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-xs text-muted-foreground/60 text-center">
            Cancel anytime. No hidden fees.
          </p>
        </motion.div>
      </div>
    </div>
  );
});

SplashScreen.displayName = "SplashScreen";
