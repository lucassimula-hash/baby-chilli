"use client";

import { ActionTextArea } from "@/components/ui/action-textarea";

export function ActionTextAreaDefault() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionTextArea placeholder="tap to add" />
    </div>
  );
}

export function ActionTextAreaStates() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionTextArea placeholder="tap to add" />
      <ActionTextArea defaultValue="user description" />
      <ActionTextArea defaultValue="user description" error />
      <ActionTextArea placeholder="tap to add" disabled />
    </div>
  );
}

export function ActionTextAreaGlass() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <ActionTextArea placeholder="tap to add" glass />
      <ActionTextArea defaultValue="user description" glass />
      <ActionTextArea defaultValue="user description" glass error />
      <ActionTextArea placeholder="tap to add" glass disabled />
    </div>
  );
}
