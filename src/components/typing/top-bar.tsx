import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypingStore } from "@/store/store";

export const TopBar = () => {
  const { distribution, changeDistribution } = useTypingStore((state) => state);

  return (
    <div className="w-full flex justify-between py-3">
      <div>
        <p>WPS: 61</p>
      </div>

      <Select onValueChange={(value) => changeDistribution(value)}>
        <SelectTrigger>
          <SelectValue placeholder={distribution} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="QWERTY">Qwerty</SelectItem>
            <SelectItem value="COLEMAK">Colemak</SelectItem>
            <SelectItem value="DVORAK">Dvorak</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
