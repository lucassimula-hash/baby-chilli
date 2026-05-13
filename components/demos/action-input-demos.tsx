"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { ActionInput } from "@/components/ui/action-input";

export function ActionInputDefault() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionInput
        label="Location"
        placeholder="Add a city"
        helperText="Used to personalize nearby actions."
        leftIcon={<MapPin size={20} />}
      />
    </div>
  );
}

export function ActionInputStates() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionInput
        label="Location"
        placeholder="Add a city"
        helperText="Used to personalize nearby actions."
        leftIcon={<MapPin size={20} />}
      />
      <ActionInput
        label="Filled"
        defaultValue="Paris, France"
        helperText="Used to personalize nearby actions."
        leftIcon={<MapPin size={20} />}
      />
      <ActionInput
        label="Error"
        defaultValue="Pa"
        error="Enter at least 3 characters."
        leftIcon={<MapPin size={20} />}
      />
      <ActionInput
        label="Disabled"
        defaultValue="Paris, France"
        helperText="Location is locked for this step."
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
        label="Notifications"
        placeholder="Select preferences"
        helperText="Enable push updates for new activity."
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
        label="Assigned to"
        placeholder="@username"
        helperText="Tag the owner of this action."
        showAvatar
        avatarSrc="https://i.pravatar.cc/40?u=1"
      />
      <ActionInput
        label="Assigned to"
        defaultValue="@marina"
        helperText="Tag the owner of this action."
        showAvatar
        avatarSrc="https://i.pravatar.cc/40?u=1"
      />
    </div>
  );
}
