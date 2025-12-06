import { useTypingStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import type { KEYBOARD_LAYOUT } from "@/types/types"
import { RotateCcw } from "lucide-react"

interface Props {
  handleReset: () => void
}

export const TopBar = ({ handleReset }: Props) => {
  const { distribution, changeDistribution } = useTypingStore()
  const options = ["querty", "dvorak", "colemak"] as KEYBOARD_LAYOUT[]

  return (
    <div className="drag-bar flex items-center justify-between bg-secondary border-b border-border hover:cursor-drag">
      <Button size="icon" onClick={handleReset}>
        <RotateCcw className="size-4" />
      </Button>

      <div className="flex gap-2">
        {options.map((name, i) => (
          <Button
            key={i}
            variant="ghost"
            className={name === distribution ? "bg-muted-foreground text-muted" : ""}
            onClick={() => changeDistribution(name)}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}

