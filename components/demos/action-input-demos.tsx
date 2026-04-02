"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { ActionInput } from "@/components/ui/action-input";

export function ActionInputDefault() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionInput
        label="Label"
        placeholder="placeholder"
        helperText="helper text"
        leftIcon={<MapPin size={20} />}
      />
    </div>
  );
}

export function ActionInputStates() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionInput
        label="Placeholder"
        placeholder="placeholder"
        helperText="helper text"
        leftIcon={<MapPin size={20} />}
      />
      <ActionInput
        label="Filled"
        defaultValue="user text"
        helperText="helper text"
        leftIcon={<MapPin size={20} />}
      />
      <ActionInput
        label="Error"
        defaultValue="user text"
        error="helper text"
        leftIcon={<MapPin size={20} />}
      />
      <ActionInput
        label="Disabled"
        defaultValue="user text"
        helperText="helper text"
        leftIcon={<MapPin size={20} />}
        disabled
      />
    </div>
  );
}

export function ActionInputWithToggle() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionInput
        label="Label"
        placeholder="placeholder"
        helperText="helper text"
        leftIcon={<MapPin size={20} />}
        showToggle
        toggleChecked={toggle}
        onToggleChange={setToggle}
      />
    </div>
  );
}

export function ActionInputWithAvatar() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionInput
        label="Label"
        placeholder="placeholder"
        helperText="helper text"
        showAvatar
        avatarSrc="https://i.pravatar.cc/40?u=1"
      />
      <ActionInput
        label="Label"
        defaultValue="user text"
        helperText="helper text"
        showAvatar
        avatarSrc="https://i.pravatar.cc/40?u=1"
      />
    </div>
  );
}
