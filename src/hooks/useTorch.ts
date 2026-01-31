import { useState, useEffect, useCallback, useRef } from 'react';
import { TorchMode } from '@/components/ModeSelector';

export const useTorch = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [mode, setMode] = useState<TorchMode>('steady');
  const [strobeSpeed, setStrobeSpeed] = useState(10);
  const [isBlinking, setIsBlinking] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sosTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // SOS Pattern: ... --- ... (3 short, 3 long, 3 short)
  const sosPattern = [
    // S: 3 short
    200, 200, 200, 200, 200, 400,
    // O: 3 long
    600, 200, 600, 200, 600, 400,
    // S: 3 short
    200, 200, 200, 200, 200, 1000,
  ];

  const clearIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (sosTimeoutRef.current) {
      clearTimeout(sosTimeoutRef.current);
      sosTimeoutRef.current = null;
    }
  }, []);

  const playSOS = useCallback(() => {
    let patternIndex = 0;
    let isLit = true;
    setIsBlinking(true);

    const runPattern = () => {
      if (!isOn || mode !== 'sos') {
        setIsBlinking(false);
        return;
      }

      setIsBlinking(isLit);
      isLit = !isLit;
      
      sosTimeoutRef.current = setTimeout(() => {
        patternIndex++;
        if (patternIndex >= sosPattern.length) {
          patternIndex = 0;
          isLit = true;
        }
        runPattern();
      }, sosPattern[patternIndex]);
    };

    runPattern();
  }, [isOn, mode, sosPattern]);

  const playStrobe = useCallback(() => {
    setIsBlinking(true);
    
    intervalRef.current = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000 / (strobeSpeed * 2));
  }, [strobeSpeed]);

  useEffect(() => {
    clearIntervals();

    if (isOn) {
      if (mode === 'strobe') {
        playStrobe();
      } else if (mode === 'sos') {
        playSOS();
      } else {
        setIsBlinking(true);
      }
    } else {
      setIsBlinking(false);
    }

    return clearIntervals;
  }, [isOn, mode, strobeSpeed, clearIntervals, playStrobe, playSOS]);

  const toggle = useCallback(() => {
    setIsOn(prev => !prev);
  }, []);

  return {
    isOn,
    toggle,
    brightness,
    setBrightness,
    mode,
    setMode,
    strobeSpeed,
    setStrobeSpeed,
    isBlinking,
  };
};
