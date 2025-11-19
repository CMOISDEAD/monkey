import { useState, useCallback, useEffect } from "react";
import { cn } from "./lib/utils";

const WORDS_LIST = "ate eat art import date cake";

const STATES = {
  active: "bg-foreground text-background",
  inactive: "text-muted",
  pressed: "text-muted-foreground",
  invalid: "text-destructive",
} as const;

export default function App() {
  const [words] = useState(() => WORDS_LIST.split(""));
  const [current, setCurrent] = useState(0);
  const [wrong, setWrong] = useState<Set<number>>(() => new Set());

  const isWrongKey = (index: number) => wrong.has(index);

  const markWrong = (index: number) => {
    setWrong((prev) => new Set(prev).add(index));
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;

      if (key === "Backspace") {
        setCurrent((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (key === "Escape") {
        setWrong(new Set());
        setCurrent(0);
        return;
      }

      if (key === words[current]) {
        setCurrent((prev) => Math.min(prev + 1, words.length));
        return;
      }

      markWrong(current);
      console.log("wrong key:", key);
    },
    [words, current],
  );

  useEffect(() => {
    if (current !== words.length) return;

    console.log("success");
    setCurrent(0);
    setWrong(new Set());
  }, [current, words.length]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        tabIndex={0}
        onKeyDown={handleKeyPress}
        className="flex gap-1 text-2xl font-bold border border-dashed p-16 focus:outline-none"
      >
        {words.map((char, i) => {
          const isCurrent = i === current;
          const isWrong = isWrongKey(i);

          return (
            <p
              key={i}
              className={cn(
                STATES.inactive,
                isCurrent && STATES.active,
                isWrong && STATES.invalid,
                "min-w-5 flex items-center justify-center",
              )}
            >
              {char}
            </p>
          );
        })}
      </div>
    </div>
  );
}
