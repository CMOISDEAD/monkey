import { useTypingStore } from "@/store/store";
import { TopBar } from "./top-bar";
import { TypingText } from "./typing-text";
import { useTyping } from "@/hooks/use-typing";
import { Pointer, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export const Typing = () => {
  const [focus, setFocus] = useState(false);
  const { distribution } = useTypingStore(state => state)
  const { status, words, current, isWrongKey, handleKeyPress, reset } =
    useTyping({
      distribution
    });

  const handleReset = () => {
    reset()
    setFocus(false)
  }

  return (
    <div className="w-7xl">
      <TopBar />
      <div className="relative overflow-hidden">
        <div
          tabIndex={0}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={handleKeyPress}
          className="flex gap-1 text-2xl leading-loose tracking-tight select-none p-16 focus:outline-none border-y"
        >
          {status === "finished" ? (
            <div className="w-full flex items-center justify-center">
              <Button size="icon-lg" onClick={handleReset}>
                <RefreshCw className="size-6" />
              </Button>
            </div>
          ) : (
            <>
              {!focus && (
                <div className="absolute inset-0 bg-secondary/90 text-secondary-foreground w-full h-full flex items-center justify-center gap-4">
                  <Pointer className="size-6" />
                  Click here to focus
                </div>
              )}
              <TypingText words={words} current={current} isWrongKey={isWrongKey} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
