import { cn } from "@/lib/utils"

const STATES = {
  active: "bg-foreground text-background font-semibold",
  inactive: "text-muted-foreground",
  pressed: "text-muted-foreground",
  invalid: "text-destructive bg-destructive/10",
} as const

interface Props {
  words: string[]
  current: number
  isWrongKey: (i: number) => boolean
}

export const TypingText = ({ words, current, isWrongKey }: Props) => {
  return (
    <>
      {words.map((char, i) => {
        const isCurrent = i === current
        const isWrong = isWrongKey(i)

        return (
          <span
            key={i}
            className={cn(
              "px-0.5 py-1 transition-all duration-75",
              STATES.inactive,
              isCurrent && STATES.active,
              isWrong && STATES.invalid,
              "min-w-[0.25rem] inline-flex items-center justify-center",
            )}
          >
            {char === " " ? "·" : char}
          </span>
        )
      })}
    </>
  )
}

