import { TEXT } from "@/lib/text";
import { useState, useCallback, useEffect, useRef } from "react";

const random = Math.floor(Math.random() * TEXT.length);

export const useTyping = () => {
  const words = useRef(TEXT[random].split(""));
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong] = useState<Set<number>>(() => new Set());
  const [focus, setFocus] = useState(false);

  const isWrongKey = (index: number) => wrong.has(index);

  const markWrong = (index: number) => {
    setWrong((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const reset = () => {
    setCurrent(0);
    setWrong(new Set());
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;

      // ignore special keys
      if (key.length > 1 && key !== "Backspace" && key !== "Escape") {
        return;
      }

      if (key === "Backspace") {
        setCurrent((prev) => Math.max(prev - 1, 0));
        setWrong((prev) => {
          prev.delete(current - 1);
          return prev;
        });
        return;
      }

      if (key === "Escape") {
        reset();
        return;
      }

      const chars = words.current;

      // correct key
      if (key === chars[current]) {
        setCurrent((prev) => Math.min(prev + 1, chars.length));
        return;
      }

      // wrong key
      markWrong(current);
    },
    [current],
  );

  // finish
  useEffect(() => {
    if (current === words.current.length) {
      console.log("success");
      reset();
    }
  }, [current]);

  return {
    // state
    current,
    words: words.current,
    wrong,

    // helpers
    isWrongKey,

    // focus
    focus,
    setFocus,

    // handlers
    handleKeyPress,
    reset,
  };
};
