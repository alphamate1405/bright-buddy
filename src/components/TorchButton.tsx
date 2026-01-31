import { motion } from "framer-motion";
import { Power } from "lucide-react";

interface TorchButtonProps {
  isOn: boolean;
  onToggle: () => void;
  brightness: number;
}

export const TorchButton = ({ isOn, onToggle, brightness }: TorchButtonProps) => {
  const glowIntensity = isOn ? brightness / 100 : 0;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        animate={{
          opacity: isOn ? 0.3 + glowIntensity * 0.4 : 0,
          scale: isOn ? 1 + glowIntensity * 0.2 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle, hsl(45 100% 55% / ${glowIntensity * 0.5}) 0%, transparent 70%)`,
        }}
      />
      
      {/* Animated ring border */}
      <motion.div
        className="absolute w-52 h-52 rounded-full"
        animate={{
          opacity: isOn ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className={`absolute inset-0 rounded-full ${isOn ? 'tactical-ring animate-rotate-slow' : 'bg-secondary'}`}
          style={{ padding: '3px' }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </div>
      </motion.div>

      {/* Main button */}
      <motion.button
        onClick={onToggle}
        className={`relative w-44 h-44 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOn 
            ? 'bg-gradient-to-b from-accent to-amber-500 torch-glow-intense' 
            : 'bg-gradient-to-b from-secondary to-muted hover:from-muted hover:to-secondary'
        }`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        animate={{
          boxShadow: isOn 
            ? `0 0 ${30 + brightness}px hsl(45 100% 55% / ${0.3 + glowIntensity * 0.4}), 0 0 ${60 + brightness}px hsl(45 100% 55% / ${0.2 + glowIntensity * 0.3})`
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <motion.div
          animate={{
            scale: isOn ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: isOn ? Infinity : 0,
            repeatDelay: 1,
          }}
        >
          <Power 
            className={`w-16 h-16 transition-colors duration-300 ${
              isOn ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
            strokeWidth={2.5}
          />
        </motion.div>
      </motion.button>

      {/* Status indicator */}
      <motion.div
        className="absolute -bottom-8 flex items-center gap-2"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <div 
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isOn ? 'bg-accent' : 'bg-muted-foreground'
          }`}
        />
        <span className={`text-sm font-medium font-display tracking-wider uppercase ${
          isOn ? 'text-accent' : 'text-muted-foreground'
        }`}>
          {isOn ? 'Active' : 'Standby'}
        </span>
      </motion.div>
    </div>
  );
};
