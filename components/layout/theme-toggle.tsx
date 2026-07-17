"use client";

import { Moon } from "lucide-react";

export function ThemeToggle() {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-base-secondary)]"
      aria-label="Dark mode only"
      title="Dark mode only"
    >
      <Moon size={16} />
    </div>
  );
}
