"use client";

import { useState } from "react";
import { MapPin, ChevronRight, Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ActionInput } from "@/components/ui/action-input";
import { CauseInput } from "@/components/ui/cause-input";

export function InputFieldDemo() {
  const [value, setValue] = useState("");
  return <div className="flex flex-col gap-6 w-full max-w-[400px]">{<Input label="Label" placeholder="placeholder" helperText="helper text" leftIcon={<MapPin size={20} />} rightIcon={<ChevronRight size={20} />} />}{<Input label="Email" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter your email" leftIcon={<Mail size={20} />} clearable onClear={() => setValue("")} helperText="We'll never share your email." />}{<Input label="Website" leadingText="https://" placeholder="your-site.com" rightIcon={<ChevronRight size={20} />} helperText="Enter your website URL" />}{<Input label="Username" value="ab" error="Username must be at least 3 characters." leftIcon={<Search size={20} />} />}{<Input label="Disabled field" placeholder="Can't edit this" disabled />}</div>;
}
export function ActionInputDemo() {
  const [toggleVal, setToggleVal] = useState(false);
  return <div className="flex flex-col gap-6 w-full max-w-[400px]">{<ActionInput label="Label" placeholder="placeholder" leftIcon={<MapPin size={20} />} helperText="helper text" />}{<ActionInput label="Location" defaultValue="Paris, France" leftIcon={<MapPin size={20} />} helperText="helper text" />}{<ActionInput label="Assigned to" defaultValue="@username" showAvatar avatarSrc="https://i.pravatar.cc/40" />}{<ActionInput label="Notifications" defaultValue="Push enabled" showToggle toggleChecked={toggleVal} onToggleChange={setToggleVal} rightIcon={null} />}{<ActionInput label="Label" defaultValue="user text" leftIcon={<MapPin size={20} />} error="helper text" />}</div>;
}
export function CauseInputDemo() {
  const [causeValue, setCauseValue] = useState("");
  return <div className="flex flex-col gap-6 w-full max-w-[400px]">{<CauseInput placeholder="add cause" />}{<CauseInput value={causeValue || "ClimateWalk"} onChange={e => setCauseValue(e.target.value)} placeholder="add cause" />}{<CauseInput defaultValue="add cause" error="add a cause to publish" />}</div>;
}
export function FormTitleDemo() {
  return <div className="flex items-center justify-center min-h-[100px] text-[var(--text-base-secondary)] text-sm">Form Title — Awaiting Figma specs</div>;
}
export function NumberInputDemo() {
  return <div className="flex items-center justify-center min-h-[100px] text-[var(--text-base-secondary)] text-sm">Number Input Field — Awaiting Figma specs</div>;
}