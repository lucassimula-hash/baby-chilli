"use client";

import { ThinkingIndicator } from "@/components/ui/thinking-indicator";

export function ThinkingDefault() {
  return <div className="flex items-center justify-center py-8">{<ThinkingIndicator />}</div>;
}
export function ThinkingCustom() {
  return <div className="flex flex-col items-center gap-6 py-8">{<ThinkingIndicator words={["Loading", "Processing", "Almost done"]} />}{<ThinkingIndicator words={["Analyzing", "Searching", "Generating", "Reviewing"]} interval={2000} />}</div>;
}