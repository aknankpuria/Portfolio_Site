import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Sound Manager Hook — Subtle hover/click sounds
 * Portfolio.md spec: "Subtle hover/click sounds, VERY LOW volume, Optional toggle"
 */

// Generate sounds using Web Audio API (no external files needed)
const createAudioContext = () => {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext || window.webkitAudioContext)();
};

const playTone = (ctx, frequency, duration, volume, type = "sine") => {
  if (!ctx) return;
  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently fail — sound is non-critical
  }
};

const useSoundManager = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  // Lazy init audio context (requires user interaction)
  const ensureContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureContext();
    playTone(ctx, 800, 0.08, 0.03, "sine");
  }, [soundEnabled, ensureContext]);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureContext();
    playTone(ctx, 600, 0.12, 0.05, "triangle");
    setTimeout(() => playTone(ctx, 900, 0.08, 0.03, "sine"), 50);
  }, [soundEnabled, ensureContext]);

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureContext();
    playTone(ctx, 523, 0.15, 0.04, "sine");
    setTimeout(() => playTone(ctx, 659, 0.15, 0.04, "sine"), 100);
    setTimeout(() => playTone(ctx, 784, 0.2, 0.04, "sine"), 200);
  }, [soundEnabled, ensureContext]);

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      const ctx = ensureContext();
      // Play a tiny confirmation tone
      playTone(ctx, 700, 0.1, 0.04, "sine");
    }
  }, [soundEnabled, ensureContext]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playHover,
    playClick,
    playSuccess,
  };
};

export default useSoundManager;
