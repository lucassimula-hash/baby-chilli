"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/textarea";

export function TextAreaDefault() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <TextArea label="Label" placeholder="add email" helperText="Helper text" />
    </div>
  );
}

export function TextAreaStates() {
  const [value, setValue] = useState("user description");
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <TextArea label="Placeholder" placeholder="add email" helperText="Helper text" />
      <TextArea
        label="Filled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Helper text"
      />
      <TextArea label="Disabled" placeholder="add email" helperText="Helper text" disabled />
    </div>
  );
}

export function TextAreaWithAI() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <TextArea
        label="Label"
        placeholder="add email"
        helperText="Helper text"
        showAiButton
      />
      <TextArea
        label="Label"
        defaultValue="user description"
        helperText="Helper text"
        showAiButton
      />
      <TextArea
        label="Label"
        placeholder="add email"
        helperText="Helper text"
        showAiButton
        disabled
      />
    </div>
  );
}
