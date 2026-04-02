"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";

const defaultItems = [{
  label: "label",
  value: "tab1",
  icon: <Plus size={16} />,
  rightIcon: <ChevronDown size={16} />
}, {
  label: "label",
  value: "tab2",
  icon: <Plus size={16} />,
  rightIcon: <ChevronDown size={16} />
}, {
  label: "label",
  value: "tab3",
  icon: <Plus size={16} />,
  rightIcon: <ChevronDown size={16} />
}, {
  label: "label",
  value: "tab4",
  icon: <Plus size={16} />,
  rightIcon: <ChevronDown size={16} />
}];
export function TabsUnderline() {
  const [value, setValue] = useState("tab1");
  return <div className="flex flex-col gap-6">{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="underline" size="sm" />}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="underline" size="md" />}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="underline" size="lg" />}</div>;
}
export function TabsPill() {
  const [value, setValue] = useState("tab1");
  return <div className="flex flex-col gap-6">{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="pill" size="sm" />}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="pill" size="md" />}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="pill" size="lg" />}</div>;
}
export function TabsSegmented() {
  const [value, setValue] = useState("tab1");
  const twoItems = defaultItems.slice(0, 2);
  return <div className="flex flex-col gap-6">{<Tabs items={twoItems} value={value} onValueChange={setValue} type="segmented" size="sm" />}{<Tabs items={twoItems} value={value} onValueChange={setValue} type="segmented" size="md" />}{<Tabs items={twoItems} value={value} onValueChange={setValue} type="segmented" size="lg" />}</div>;
}
export function TabsSizes() {
  const [value, setValue] = useState("tab1");
  return <div className="flex flex-col gap-6">{<div>{<p className="text-xs text-[var(--text-base-secondary)] mb-2">Small</p>}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="pill" size="sm" />}</div>}{<div>{<p className="text-xs text-[var(--text-base-secondary)] mb-2">Medium</p>}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="pill" size="md" />}</div>}{<div>{<p className="text-xs text-[var(--text-base-secondary)] mb-2">Large</p>}{<Tabs items={defaultItems} value={value} onValueChange={setValue} type="pill" size="lg" />}</div>}</div>;
}