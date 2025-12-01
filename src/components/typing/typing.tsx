import { TopBar } from "./top-bar";
import { TypingText } from "./typing-text";
import { useTyping } from "./use-typing";
import { Pointer } from "lucide-react";

export const Typing = () => {
  const { words, current, isWrongKey, handleKeyPress, focus, setFocus } =
    useTyping();

  return (
    <div>
      <TopBar />
      <div className="relative overflow-hidden">
        <div
          tabIndex={0}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={handleKeyPress}
          className="flex gap-1 text-2xl leading-loose tracking-tight select-none p-16 focus:outline-none border-y"
        >
          {!focus && (
            <div className="absolute inset-0 bg-secondary/90 text-secondary-foreground w-full h-full flex items-center justify-center gap-4">
              <Pointer className="size-6" />
              Click here to focus
            </div>
          )}

          <TypingText words={words} current={current} isWrongKey={isWrongKey} />
        </div>
      </div>
    </div>
  );
};
