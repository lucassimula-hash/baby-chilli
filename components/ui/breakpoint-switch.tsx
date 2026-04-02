"use client";

import { cn } from "@/lib/utils";

export function BreakpointSwitch({
  value,
  onChange
}) {
  return <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--backgrounds-neutral-secondary-default)] self-start">{<button onClick={() => onChange("mobile")} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", value === "mobile" ? "bg-[var(--backgrounds-neutral-primary-default)] text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] active:text-[var(--text-base-primary)]")}>Mobile</button>}{<button onClick={() => onChange("desktop")} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", value === "desktop" ? "bg-[var(--backgrounds-neutral-primary-default)] text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] active:text-[var(--text-base-primary)]")}>Desktop</button>}</div>;
}
BreakpointSwitch.displayName = "BreakpointSwitch";