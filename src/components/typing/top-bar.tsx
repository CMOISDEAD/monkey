import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypingStats } from "@/hooks/use-typing-stats";
import { useTypingStore } from "@/store/store";
import type { KEYBOARD_LAYOUT } from "@/types/types";

export const TopBar = () => {
  const { distribution, changeDistribution, stats } = useTypingStore((state) => state);

  return (
    <div className="w-full flex justify-between py-3">
      <div>
        <p>WPM: {stats.wps}</p>
        <p>RWPM: {stats.rawWps}</p>
        <p>STREAK: {stats.streak}</p>
        <p>MSTREAK: {stats.maxStreak}</p>
        <p>accuracy: {stats.accuracy}</p>
      </div>

      <Select onValueChange={(value: KEYBOARD_LAYOUT) => changeDistribution(value)}>
        <SelectTrigger>
          <SelectValue placeholder={distribution} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="qwerty">Qwerty</SelectItem>
            <SelectItem value="colemak">Colemak</SelectItem>
            <SelectItem value="dvorak">Dvorak</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
