"use client"

import { useTypingStore } from "@/store/store"

export const TopBar = () => {
  const { distribution, changeDistribution } = useTypingStore()

  return (
    <div className="flex items-center justify-between mb-12 pb-6 border-b border-border">
      <h1 className="text-2xl font-bold tracking-tight">Min</h1>

      <div className="flex gap-2">
        <button
          onClick={() => changeDistribution("qwerty")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${distribution === "qwerty"
            ? "text-foreground bg-primary/10"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          qwerty
        </button>
        <button
          onClick={() => changeDistribution("dvorak")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${distribution === "dvorak"
            ? "text-foreground bg-primary/10"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          dvorak
        </button>
        <button
          onClick={() => changeDistribution("colemak")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${distribution === "colemak"
            ? "text-foreground bg-primary/10"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          colemak
        </button>
      </div>
    </div>
  )
}

