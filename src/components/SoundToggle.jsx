import { useState } from "react";
import useSoundManager from "../hooks/useSoundManager";

/**
 * Sound Toggle — Fixed position button to enable/disable sound
 */
const SoundToggle = () => {
  const { soundEnabled, toggleSound } = useSoundManager();

  // We expose the global instance via window so other components can access it
  // In a production app you'd use React context instead
  if (typeof window !== "undefined") {
    window.__soundManager = { soundEnabled };
  }

  return null; // The toggle is rendered inside Navbar instead
};

/**
 * Standalone Sound Toggle Button component
 * Import this where you need the visual toggle
 */
export const SoundToggleButton = ({ soundEnabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative w-9 h-9 rounded-full flex items-center justify-center border border-white/10 hover:border-[#00E5CC]/30 transition-all duration-300 cursor-pointer group"
      style={{
        background: soundEnabled
          ? "rgba(0,229,204,0.08)"
          : "rgba(255,255,255,0.03)",
      }}
      title={soundEnabled ? "Sound On" : "Sound Off"}
      aria-label="Toggle sound effects"
    >
      {soundEnabled ? (
        <svg
          className="w-4 h-4 text-[#00E5CC] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-white-500 group-hover:text-white-800 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      )}

      {/* Tiny pulse ring when enabled */}
      {soundEnabled && (
        <span className="absolute inset-0 rounded-full border border-[#00E5CC]/20 animate-ping opacity-30" />
      )}
    </button>
  );
};

export default SoundToggle;
