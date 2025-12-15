import { Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import { Typing } from "./components/typing/typing";
import { TypingStats } from "./components/typing/typing-stats";
import { ThemeSelector } from "./components/themes/themes-selector";

export default function App() {
  return (
    <div className="min-h-screen font-mono flex flex-col bg-linear-to-br from-stone-900 to-stone-950">
      <header className="flex justify-between px-8 py-2">
        <h1 className="text-primary">Min</h1>
        <ul className="flex gap-8 items-center">
          <li>
            <Button variant="ghost" size="icon-lg">
              <Settings className="size-5" />
            </Button>
          </li>
        </ul>
      </header>
      <main className="relative h-full flex-1 flex items-center justify-center">
        <Typing />
        <TypingStats />
      </main>
      <footer className="flex items-center justify-between px-8 py-2">
        <Button variant="link" size="sm">
          Github
        </Button>

        <ul className="flex gap-8 items-center text-muted-foreground text-sm">
          <li>
            <ThemeSelector />
          </li>
          <li>v0.0.1</li>
        </ul>
      </footer>
    </div>
  );
}
