import { motion, AnimatePresence } from "framer-motion";
import { Flashlight } from "lucide-react";
import { TorchButton } from "@/components/TorchButton";
import { BrightnessSlider } from "@/components/BrightnessSlider";
import { ModeSelector } from "@/components/ModeSelector";
import { StrobeSpeed } from "@/components/StrobeSpeed";
import { useTorch } from "@/hooks/useTorch";

const Index = () => {
  const {
    isOn,
    toggle,
    brightness,
    setBrightness,
    mode,
    setMode,
    strobeSpeed,
    setStrobeSpeed,
    isBlinking,
    isNativeAvailable,
  } = useTorch();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient background glow when torch is on */}
      <AnimatePresence>
        {isOn && isBlinking && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: brightness / 200 }}
            exit={{ opacity: 0 }}
            transition={{ duration: mode === 'strobe' ? 0.05 : 0.3 }}
            style={{
              background: `radial-gradient(circle at 50% 30%, 
                hsl(45 100% 55% / ${brightness / 300}) 0%, 
                hsl(45 100% 50% / ${brightness / 500}) 30%, 
                transparent 70%
              )`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-6 py-12 safe-area-inset">
        {/* Header */}
        <motion.header
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Flashlight className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-display tracking-wider text-gradient-torch">
              TORCH
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Tap to illuminate
          </p>
        </motion.header>

        {/* Main torch button */}
        <motion.div
          className="flex-1 flex items-center justify-center py-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <TorchButton 
            isOn={isOn && isBlinking} 
            onToggle={toggle} 
            brightness={brightness} 
          />
        </motion.div>

        {/* Controls */}
        <div className="w-full flex flex-col items-center gap-4 pb-8">
          <BrightnessSlider 
            value={brightness} 
            onChange={setBrightness}
            disabled={!isOn}
          />
          
          <ModeSelector 
            mode={mode} 
            onModeChange={setMode}
            isOn={isOn}
          />
          
          <AnimatePresence>
            {mode === 'strobe' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full flex justify-center overflow-hidden"
              >
                <StrobeSpeed
                  value={strobeSpeed}
                  onChange={setStrobeSpeed}
                  disabled={!isOn}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.p
          className="text-xs text-muted-foreground/60 text-center max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isNativeAvailable 
            ? '✓ Native flashlight connected' 
            : 'For full flashlight control on mobile, install as an app via your browser menu'}
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
