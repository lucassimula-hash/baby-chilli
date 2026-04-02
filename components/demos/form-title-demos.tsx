"use client";

import { FormTitle } from "@/components/ui/form-title";

export function FormTitleDefault() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <FormTitle placeholder="add cause" />
    </div>
  );
}

export function FormTitleStates() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <FormTitle placeholder="add cause" />
      <FormTitle defaultValue="ClimateWalk" />
      <FormTitle placeholder="add cause" error="add a cause to publish" />
    </div>
  );
}
