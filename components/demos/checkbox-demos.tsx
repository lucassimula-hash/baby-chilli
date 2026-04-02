"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDefault() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  return <div className="flex items-center gap-6">{<Checkbox checked={c1} onCheckedChange={setC1} />}{<Checkbox checked={c2} onCheckedChange={setC2} />}{<Checkbox indeterminate />}{<Checkbox number={1} />}{<Checkbox number={3} />}</div>;
}
export function CheckboxSizes() {
  return <div className="flex items-center gap-6">{<div className="flex items-center gap-3">{<Checkbox size="sm" />}{<Checkbox size="sm" checked />}{<Checkbox size="sm" number={1} />}</div>}{<div className="flex items-center gap-3">{<Checkbox size="md" />}{<Checkbox size="md" checked />}{<Checkbox size="md" number={1} />}</div>}</div>;
}
export function CheckboxStates() {
  return <div className="flex items-center gap-4">{<Checkbox checked={false} />}{<Checkbox checked />}{<Checkbox indeterminate />}{<Checkbox disabled />}{<Checkbox checked disabled />}</div>;
}
export function CheckboxWithTextDemo() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(false);
  return <div className="flex flex-col gap-4">{<Checkbox checked={c1} onCheckedChange={setC1} label="Accept terms and conditions" description="You agree to our Terms of Service and Privacy Policy." />}{<Checkbox checked={c2} onCheckedChange={setC2} label="Enable notifications" description="Receive email notifications for new activity." />}{<Checkbox checked={c3} onCheckedChange={setC3} label="Disabled option" description="This option is not available." disabled />}</div>;
}