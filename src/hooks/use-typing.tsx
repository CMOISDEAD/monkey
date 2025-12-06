import { TEXT } from "@/lib/text";
import { KEYBOARD_LAYOUTS } from "@/lib/utils";
import type { KEYBOARD_LAYOUT } from "@/types/types";
import { useState, useCallback, useEffect, useRef } from "react";
import { useTypingStats } from "./use-typing-stats";

const random = Math.floor(Math.random() * TEXT.length);

export const useTyping = ({ distribution }: { distribution: KEYBOARD_LAYOUT }) => {
  const words = useRef(TEXT[random].split(""));
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle")
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong] = useState<Set<number>>(() => new Set());
  const [focus, setFocus] = useState(false);

  const {
    removeEvent,
    startSession,
    registerKeyEvent,
    finishSession,
    resetSession
  } = useTypingStats();

  const isWrongKey = (index: number) => wrong.has(index);

  const markWrong = (index: number) => {
    setWrong(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const backspace = () => {
    const prevIndex = Math.max(current - 1, 0)
    setCurrent(prevIndex)
    removeEvent(prevIndex)
    setWrong(prev => {
      const next = new Set(prev);
      next.delete(current - 1)
      return next
    })
  }

  const reset = () => {
    setStatus("idle")
    setCurrent(0);
    setWrong(new Set());
    resetSession()
  };


  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;

      if (key === "Escape") return reset();

      if (key === "Backspace") return backspace();

      if (key.length > 1) return;

      setStatus("running")

      if (current === 0) startSession();

      const chars = words.current;
      const map = KEYBOARD_LAYOUTS[distribution] ?? KEYBOARD_LAYOUTS.qwerty;
      const mappedKey = map(key);
      const expected = chars[current];

      const isCorrect = mappedKey === expected;

      if (!isCorrect) {
        markWrong(current);
      }

      setCurrent(prev => Math.min(prev + 1, chars.length));

      registerKeyEvent({
        index: current,
        expected,
        pressed: mappedKey,
        isCorrect,
      });
    },
    [current, distribution]
  );

  useEffect(() => {
    if (current === words.current.length) {
      finishSession();
      setStatus("finished")
    }
  }, [current, finishSession]);

  useEffect(() => {
    reset();
    resetSession();
  }, [distribution]);

  return {
    status,
    current,
    words: words.current,
    wrong,
    isWrongKey,
    focus,
    setFocus,
    handleKeyPress,
    reset,
  };
};
