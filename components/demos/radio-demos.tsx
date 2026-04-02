"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/components/ui/radio";

export function RadioDefault() {
  const [value, setValue] = useState("option1");
  return <RadioGroup value={value} onValueChange={setValue}>{<Radio value="option1" label="Option 1" />}{<Radio value="option2" label="Option 2" />}{<Radio value="option3" label="Option 3" />}</RadioGroup>;
}
export function RadioSizes() {
  return <div className="flex items-center gap-8">{<div className="flex items-center gap-3">{<Radio size="sm" checked={false} />}{<Radio size="sm" checked />}</div>}{<div className="flex items-center gap-3">{<Radio size="md" checked={false} />}{<Radio size="md" checked />}</div>}</div>;
}
export function RadioStates() {
  return <div className="flex items-center gap-4">{<Radio checked={false} />}{<Radio checked />}{<Radio disabled />}{<Radio checked disabled />}</div>;
}
export function RadioHorizontal() {
  const [value, setValue] = useState("a");
  return <RadioGroup value={value} onValueChange={setValue} orientation="horizontal">{<Radio value="a" label="Daily" />}{<Radio value="b" label="Weekly" />}{<Radio value="c" label="Monthly" />}</RadioGroup>;
}
export function RadioWithTextDemo() {
  const [value, setValue] = useState("email");
  return <RadioGroup value={value} onValueChange={setValue}>{<Radio value="email" label="Email notifications" description="Receive updates via email." />}{<Radio value="sms" label="SMS notifications" description="Receive updates via text message." />}{<Radio value="none" label="No notifications" description="You won't receive any notifications." disabled />}</RadioGroup>;
}