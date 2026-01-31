import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface BrightnessSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const BrightnessSlider = ({ value, onChange, disabled }: BrightnessSliderProps) => {
  return (
    <motion.div 
      className="w-full max-w-xs glass-surface rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: disabled ? 1 : 1 + (value / 500),
              opacity: disabled ? 0.3 : 0.5 + (value / 200),
            }}
          >
            <Sun className={`w-5 h-5 ${disabled ? 'text-muted-foreground' : 'text-accent'}`} />
          </motion.div>
          <span className="text-sm font-medium text-foreground uppercase tracking-wider font-display">
            Brightness
          </span>
        </div>
        <span className={`text-lg font-bold font-display ${disabled ? 'text-muted-foreground' : 'text-accent'}`}>
          {value}%
        </span>
      </div>
      
      <div className="relative">
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={10}
          max={100}
          step={5}
          disabled={disabled}
          className="w-full"
        />
        
        {/* Brightness level indicators */}
        <div className="flex justify-between mt-3 px-1">
          {[10, 25, 50, 75, 100].map((level) => (
            <div
              key={level}
              className={`text-xs ${
                value >= level 
                  ? disabled ? 'text-muted-foreground' : 'text-accent' 
                  : 'text-muted-foreground/50'
              }`}
            >
              {level === 10 ? 'Low' : level === 100 ? 'Max' : ''}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
