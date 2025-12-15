import { useState } from "react"
import { useTyping } from "@/hooks/use-typing"
import { useTypingStore } from "@/store/store"
import { TypingText } from "./typing-text"
import { TopBar } from "./top-bar"
import { Pointer, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Rnd } from "react-rnd"

export const Typing = () => {
  const [focus, setFocus] = useState(false)
  const { distribution } = useTypingStore()

  const { status, words, current, isWrongKey, handleKeyPress, reset } = useTyping({
    distribution,
  })


  const handleReset = () => {
    reset()
    setFocus(false)
  }

  return (
    <Rnd
      bounds="parent"
      dragHandleClassName="drag-bar"
      default={{
        x: 200,
        y: 20,
        width: "80%",
        height: "40%"
      }}
      className="border overflow-hidden shadow bg-stone-900">
      <div className="h-full flex flex-col">
        <TopBar handleReset={handleReset} />

        <div className="flex justify-center items-center h-full">
          {status === "finished" ? (
            <Button onClick={handleReset} size="lg" className="gap-2">
              <RefreshCw className="size-4" />
              Try Again
            </Button>
          ) : (
            <div
              tabIndex={0}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={handleKeyPress}
              className="relative overflow-hidden focus:outline-none transition-colors"
            >
              <div className="relative cursor-text  flex flex-wrap content-center gap-2 p-5">
                {!focus && (
                  <div className="absolute inset-0 bg-background/5 backdrop-blur flex items-center justify-center gap-3 z-10">
                    <Pointer className="size-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to focus</span>
                  </div>
                )}
                <div className="text-5xl leading-relaxed tracking-normal select-none font-mono w-full">
                  <TypingText words={words} current={current} isWrongKey={isWrongKey} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-muted-foreground uppercase tracking-widest py-2">
          {status === "idle" ? "Press any key to start " : "ESC to reset"}
        </div>
      </div>
    </Rnd>
  )
}

