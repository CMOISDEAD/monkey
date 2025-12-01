import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

interface TypingState {
  distribution: string;
  changeDistribution: (distribution: string) => void;
}

const useTypingStore = create<TypingState>()(
  devtools(
    persist(
      (set) => ({
        distribution: "QWERTY",
        changeDistribution: (distribution: string) => set({ distribution }),
      }),
      { name: "typing-storage" },
    ),
  ),
);

export { useTypingStore };
