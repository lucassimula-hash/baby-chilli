"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

export function ToggleDefault() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  return <div className="flex items-center gap-6">{<Toggle checked={c1} onCheckedChange={setC1} />}{<Toggle checked={c2} onCheckedChange={setC2} />}</div>;
}
export function ToggleSizes() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  return <div className="flex items-center gap-6">{<Toggle size="sm" checked={sm} onCheckedChange={setSm} />}{<Toggle size="md" checked={md} onCheckedChange={setMd} />}</div>;
}
export function ToggleStates() {
  return <div className="flex items-center gap-4">{<Toggle checked={false} />}{<Toggle checked />}{<Toggle disabled />}{<Toggle checked disabled />}</div>;
}
export function ToggleWithLabel() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(false);
  return <div className="flex flex-col gap-4">{<Toggle checked={c1} onCheckedChange={setC1} label="Enable notifications" description="Receive push notifications on your device." />}{<Toggle checked={c2} onCheckedChange={setC2} label="Dark mode" description="Use dark theme across the app." />}{<Toggle checked={c3} onCheckedChange={setC3} label="Disabled toggle" description="This setting is locked." disabled />}</div>;
}