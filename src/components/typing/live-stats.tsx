interface Props {
  wps: number | null,
  rawWps: number | null,
  accuracy: number | null,
  streak: number
}

export const LiveStats = ({ wps, rawWps, accuracy, streak }: Props) => {
  return (
    <div className="flex gap-8 justify-center text-center animate-in fade-in">
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{wps ? wps.toFixed(0) : 0}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">WPM</div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{rawWps ? rawWps.toFixed(0) : 0}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Raw</div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{accuracy ? accuracy.toFixed(1) : 100}%</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Accuracy</div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{streak}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Streak</div>
      </div>
    </div>
  )
}
