import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface StrobeSpeedProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const StrobeSpeed = ({ value, onChange, disabled }: StrobeSpeedProps) => {
  return (
    <motion.div 
      className="w-full max-w-xs glass-surface rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: disabled ? 0 : value * 3.6,
            }}
            transition={{ duration: 0.3 }}
          >
            <Gauge className={`w-5 h-5 ${disabled ? 'text-muted-foreground' : 'text-primary'}`} />
          </motion.div>
          <span className="text-sm font-medium text-foreground uppercase tracking-wider font-display">
            Strobe Speed
          </span>
        </div>
        <span className={`text-lg font-bold font-display ${disabled ? 'text-muted-foreground' : 'text-primary'}`}>
          {value}Hz
        </span>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={1}
        max={20}
        step={1}
        disabled={disabled}
        className="w-full"
      />
      
      <div className="flex justify-between mt-3 px-1">
        <span className={`text-xs ${disabled ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
          Slow
        </span>
        <span className={`text-xs ${disabled ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
          Fast
        </span>
      </div>
    </motion.div>
  );
};
