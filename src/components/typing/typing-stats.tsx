interface TypingStatsProps {
  wps: number | null
  rawWps: number | null
  accuracy: number | null
  streak: number
  maxStreak: number
  errors: Array<{ index: number; expected: string; pressed: string; isCorrect: boolean; timestamp: number }>
}

export const TypingStats = ({ wps, rawWps, accuracy, streak, maxStreak, errors }: TypingStatsProps) => {
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
    <div className="space-y-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
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
    </div>
  )
}
