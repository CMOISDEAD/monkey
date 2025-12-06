import { Palette } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"

export const ThemeSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <Palette className="size-4" />
        <SelectValue placeholder="theme..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Dark</SelectLabel>
          <SelectItem value="apple">Monokai</SelectItem>
          <SelectItem value="banana">Dark+</SelectItem>
          <SelectItem value="blueberry">Gruvbox Dark</SelectItem>
          <SelectItem value="grapes">Carbonfox</SelectItem>
          <SelectItem value="pineapple">Atlas</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
