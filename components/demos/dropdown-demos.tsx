"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dropdown, MenuItem } from "@/components/ui/dropdown";

const labels = ["List item", "List item", "List item", "List item", "List item", "List item", "List item"];

export function DropdownSmall() {
  const [checked, setChecked] = useState(2);
  return <Dropdown checkedIndex={checked} size="sm" className="w-[260px]">{labels.map((label, i) => <MenuItem key={i} icon={Plus} label={label} index={i} onSelect={() => setChecked(i)} />)}</Dropdown>;
}
export function DropdownMedium() {
  const [checked, setChecked] = useState(2);
  return <Dropdown checkedIndex={checked} size="md" className="w-[260px]">{labels.map((label, i) => <MenuItem key={i} icon={Plus} label={label} index={i} onSelect={() => setChecked(i)} />)}</Dropdown>;
}
export function DropdownLarge() {
  const [checked, setChecked] = useState(2);
  return <Dropdown checkedIndex={checked} size="lg" className="w-[260px]">{labels.map((label, i) => <MenuItem key={i} icon={Plus} label={label} index={i} onSelect={() => setChecked(i)} />)}</Dropdown>;
}