import { useState } from "react"
import { useTyping } from "@/hooks/use-typing"
import { useTypingStore } from "@/store/store"
import { TypingText } from "./typing-text"
import { TypingStats } from "./typing-stats"
import { TopBar } from "./top-bar"
import { Pointer, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveStats } from "./live-stats"

export const Typing = () => {
  const [focus, setFocus] = useState(false)
  const { distribution } = useTypingStore()

  const { status, words, current, isWrongKey, handleKeyPress, reset } = useTyping({
    distribution,
  })

  const { wps, rawWps, accuracy, streak, maxStreak } = useTypingStore(state => state.stats)

  const handleReset = () => {
    reset()
    setFocus(false)
  }

  return (
    <div className="w-full max-w-5xl">
      <TopBar />

      {status === "finished" ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          <TypingStats
            wps={wps}
            rawWps={rawWps}
            accuracy={accuracy}
            streak={streak}
            maxStreak={maxStreak}
            errors={[]}
          />
          <div className="flex justify-center">
            <Button onClick={handleReset} size="lg" className="gap-2">
              <RefreshCw className="size-4" />
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div
            tabIndex={0}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={handleKeyPress}
            className="relative overflow-hidden focus:outline-none transition-colors"
          >
            <div className="relative border border-border p-12 bg-background hover:bg-muted/30 transition-colors cursor-text min-h-[240px] flex flex-wrap content-center gap-2">
              {!focus && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-xs flex items-center justify-center gap-3 z-10">
                  <Pointer className="size-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to focus</span>
                </div>
              )}
              <div className="text-lg leading-relaxed tracking-normal select-none font-mono w-full">
                <TypingText words={words} current={current} isWrongKey={isWrongKey} />
              </div>
            </div>
          </div>

          {status === "running" && (
            <LiveStats
              wps={wps}
              rawWps={rawWps}
              accuracy={accuracy}
              streak={streak}
            />
          )}

          {status === "idle" && (
            <div className="text-center text-xs text-muted-foreground uppercase tracking-widest mt-4">
              Press any key to start • ESC to reset
            </div>
          )}
        </div>
      )}
    </div>
  )
}

