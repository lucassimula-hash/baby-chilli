"use client";

import { Menu, Search } from "lucide-react";

export function Header({
  onMenuClick,
  onSearchClick,
  }: {
  onMenuClick: () => void;
  onSearchClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] items-center bg-[var(--backgrounds-base)]/80 backdrop-blur-xl">
      <div className="relative flex w-full items-center px-4 md:px-6">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <button
          onClick={onSearchClick}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] px-3 py-1.5 text-sm text-[var(--text-base-secondary)] transition-colors hover:border-[var(--borders-default)] hover:text-[var(--text-base-primary)]"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline rounded border border-[var(--borders-default)] bg-[var(--backgrounds-base)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-base-secondary)]">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
