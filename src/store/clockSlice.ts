import { create } from "zustand";
import type { Color } from "chess.js";

interface ClockState {
  whiteMs: number;
  blackMs: number;
  activeColor: Color | null;
  incrementMs: number;
  isRunning: boolean;

  init: (initialMs: number, incrementMs: number) => void;
  start: (color: Color) => void;
  stop: () => void;
  // Deducts elapsed time from the active color. Returns the color that flagged, or null.
  deduct: (elapsedMs: number) => Color | null;
  // Apply Fischer increment to movedColor, then start opponent's clock.
  afterMove: (movedColor: Color) => void;
  reset: () => void;
}

export const useClockStore = create<ClockState>((set, get) => ({
  whiteMs: 0,
  blackMs: 0,
  activeColor: null,
  incrementMs: 0,
  isRunning: false,

  init: (initialMs, incrementMs) =>
    set({ whiteMs: initialMs, blackMs: initialMs, activeColor: null, incrementMs, isRunning: false }),

  start: (color) => set({ activeColor: color, isRunning: true }),

  stop: () => set({ isRunning: false }),

  deduct: (elapsedMs) => {
    const { activeColor, whiteMs, blackMs, isRunning } = get();
    if (!activeColor || !isRunning) return null;

    if (activeColor === "w") {
      const newMs = Math.max(0, whiteMs - elapsedMs);
      set({ whiteMs: newMs });
      if (newMs <= 0) { set({ isRunning: false }); return "w"; }
    } else {
      const newMs = Math.max(0, blackMs - elapsedMs);
      set({ blackMs: newMs });
      if (newMs <= 0) { set({ isRunning: false }); return "b"; }
    }
    return null;
  },

  afterMove: (movedColor) => {
    const { incrementMs, whiteMs, blackMs } = get();
    const opponent: Color = movedColor === "w" ? "b" : "w";
    // Apply Fischer increment to the player who just moved
    if (movedColor === "w") {
      set({ whiteMs: whiteMs + incrementMs });
    } else {
      set({ blackMs: blackMs + incrementMs });
    }
    set({ activeColor: opponent, isRunning: true });
  },

  reset: () =>
    set({ whiteMs: 0, blackMs: 0, activeColor: null, incrementMs: 0, isRunning: false }),
}));
