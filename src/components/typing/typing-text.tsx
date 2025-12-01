import { cn } from "@/lib/utils";

const STATES = {
  active: "bg-foreground text-background",
  inactive: "text-muted-foreground",
  pressed: "text-muted-foreground",
  invalid: "text-destructive",
} as const;

interface Props {
  words: string[];
  current: number;
  isWrongKey: (i: number) => boolean;
}

export const TypingText = ({ words, current, isWrongKey }: Props) => {
  return (
    <>
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
    </>
  );
};
