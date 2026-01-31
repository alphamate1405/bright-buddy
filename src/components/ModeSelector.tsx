import { motion } from "framer-motion";
import { Zap, Radio, AlertTriangle } from "lucide-react";

export type TorchMode = 'steady' | 'strobe' | 'sos';

interface ModeSelectorProps {
  mode: TorchMode;
  onModeChange: (mode: TorchMode) => void;
  isOn: boolean;
}

const modes = [
  { id: 'steady' as TorchMode, label: 'Steady', icon: Zap, description: 'Constant light' },
  { id: 'strobe' as TorchMode, label: 'Strobe', icon: Radio, description: 'Rapid blink' },
  { id: 'sos' as TorchMode, label: 'SOS', icon: AlertTriangle, description: 'Emergency signal' },
];

export const ModeSelector = ({ mode, onModeChange, isOn }: ModeSelectorProps) => {
  return (
    <motion.div 
      className="w-full max-w-xs glass-surface rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <span className="text-sm font-medium text-foreground uppercase tracking-wider font-display block mb-4 px-2">
        Light Mode
      </span>
      
      <div className="grid grid-cols-3 gap-2">
        {modes.map((modeItem) => {
          const Icon = modeItem.icon;
          const isActive = mode === modeItem.id;
          const isDanger = modeItem.id === 'sos';
          
          return (
            <motion.button
              key={modeItem.id}
              onClick={() => onModeChange(modeItem.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? isDanger
                    ? 'bg-destructive/20 border-2 border-destructive'
                    : 'bg-primary/20 border-2 border-primary'
                  : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary'
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{
                  scale: isActive && isOn ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: modeItem.id === 'strobe' ? 0.15 : 0.5,
                  repeat: isActive && isOn ? Infinity : 0,
                }}
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive 
                      ? isDanger ? 'text-destructive' : 'text-primary'
                      : 'text-muted-foreground'
                  }`} 
                />
              </motion.div>
              
              <span className={`text-xs font-medium font-display uppercase tracking-wide ${
                isActive 
                  ? isDanger ? 'text-destructive' : 'text-primary'
                  : 'text-muted-foreground'
              }`}>
                {modeItem.label}
              </span>
              
              {isActive && (
                <motion.div
                  className={`absolute -bottom-1 left-1/2 w-1 h-1 rounded-full ${
                    isDanger ? 'bg-destructive' : 'bg-primary'
                  }`}
                  layoutId="activeIndicator"
                  style={{ x: '-50%' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-3 font-sans">
        {modes.find(m => m.id === mode)?.description}
      </p>
    </motion.div>
  );
};
