"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] items-center bg-transparent backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="hidden md:block" />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
