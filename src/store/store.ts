import type { KEYBOARD_LAYOUT } from "@/types/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Stats {
  status: string,
  wps: number | null;
  rawWps: number | null;
  accuracy: number | null;
  streak: number;
  maxStreak: number;
}

interface TypingState {
  distribution: KEYBOARD_LAYOUT;
  changeDistribution: (distribution: KEYBOARD_LAYOUT) => void;
  stats: Stats,
  saveStats: (stats: Stats) => void
}

const useTypingStore = create<TypingState>()(
  devtools(
    persist(
      (set) => ({
        distribution: "qwerty",
        changeDistribution: (distribution: KEYBOARD_LAYOUT) => set({ distribution }),
        stats: {
          status: "idle",
          wps: null,
          rawWps: null,
          accuracy: null,
          streak: 0,
          maxStreak: 0,
        },
        saveStats: (stats: Stats) => set(state => ({ ...state, stats }))
      }),
      { name: "typing-storage" },
    ),
  ),
);

export { useTypingStore };
