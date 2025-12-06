import { useTypingStore } from "@/store/store"
import { Rnd } from "react-rnd"

export const TypingStats = () => {
  const { wps, rawWps, accuracy, streak, maxStreak } = useTypingStore(state => state.stats)
  const errors: any[] = []
  const stats = [
    {
      label: "WPM",
      value: wps ? wps.toFixed(0) : 0,
    },
    {
      label: "Raw WPM",
      value: rawWps ? rawWps.toFixed(0) : 0,
    },
    {
      label: "Accuracy",
      value: accuracy ? accuracy.toFixed(1) : 0,
      suffix: "%",
    },
    {
      label: "Streak",
      value: streak,
    },
    {
      label: "Best Streak",
      value: maxStreak,
    },
  ]

  return (
    <Rnd
      bounds="parent"
      dragHandleClassName="drag-bar"
      //@ts-ignore
      default={{
        x: 200, y: 600
      }}
      className="bg-stone-900 border shadow overflow-hidden">
      <div className="bg-secondary h-6 border-b hover:cursor-grab drag-bar" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center space-y-2 border-l border-border pl-6 md:border-l-0 md:pl-0">
            <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      {errors.length > 0 && (
        <div className="border-t border-border pt-8 space-y-4">
          <div className="font-semibold text-foreground flex items-center gap-2 text-sm uppercase tracking-widest">
            <span>Errors</span>
            <span className="text-base">{errors.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Common mistakes:{" "}
            <span className="text-foreground font-mono">
              {errors
                .slice(0, 3)
                .map((e) => `"${e.pressed}"`)
                .join(", ")}
            </span>
          </div>
        </div>
      )}
    </Rnd>
  )
}
