import { useState, useEffect, useCallback, useRef } from 'react';
import { TorchMode } from '@/components/ModeSelector';
import { CapacitorFlash } from '@capgo/capacitor-flash';

export const useTorch = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [mode, setMode] = useState<TorchMode>('steady');
  const [strobeSpeed, setStrobeSpeed] = useState(10);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isNativeAvailable, setIsNativeAvailable] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sosTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if native flashlight is available on mount
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const { value } = await CapacitorFlash.isAvailable();
        setIsNativeAvailable(value);
        console.log('Native flashlight available:', value);
      } catch (error) {
        console.log('Running in web mode - native flashlight not available');
        setIsNativeAvailable(false);
      }
    };
    checkAvailability();
  }, []);

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

  // Control native flashlight
  const setNativeFlashlight = useCallback(async (on: boolean) => {
    if (!isNativeAvailable) return;
    
    try {
      if (on) {
        await CapacitorFlash.switchOn({ intensity: brightness / 100 });
      } else {
        await CapacitorFlash.switchOff();
      }
    } catch (error) {
      console.error('Error controlling flashlight:', error);
    }
  }, [isNativeAvailable, brightness]);

  const playSOS = useCallback(() => {
    let patternIndex = 0;
    let isLit = true;
    setIsBlinking(true);
    setNativeFlashlight(true);

    const runPattern = () => {
      if (!isOn || mode !== 'sos') {
        setIsBlinking(false);
        setNativeFlashlight(false);
        return;
      }

      setIsBlinking(isLit);
      setNativeFlashlight(isLit);
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
  }, [isOn, mode, sosPattern, setNativeFlashlight]);

  const playStrobe = useCallback(() => {
    setIsBlinking(true);
    let currentState = true;
    setNativeFlashlight(true);
    
    intervalRef.current = setInterval(() => {
      currentState = !currentState;
      setIsBlinking(currentState);
      setNativeFlashlight(currentState);
    }, 1000 / (strobeSpeed * 2));
  }, [strobeSpeed, setNativeFlashlight]);

  useEffect(() => {
    clearIntervals();

    if (isOn) {
      if (mode === 'strobe') {
        playStrobe();
      } else if (mode === 'sos') {
        playSOS();
      } else {
        setIsBlinking(true);
        setNativeFlashlight(true);
      }
    } else {
      setIsBlinking(false);
      setNativeFlashlight(false);
    }

    return clearIntervals;
  }, [isOn, mode, strobeSpeed, clearIntervals, playStrobe, playSOS, setNativeFlashlight]);

  // Update brightness when changed while torch is on
  useEffect(() => {
    if (isOn && mode === 'steady' && isNativeAvailable) {
      setNativeFlashlight(true);
    }
  }, [brightness, isOn, mode, isNativeAvailable, setNativeFlashlight]);

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
    isNativeAvailable,
  };
};
