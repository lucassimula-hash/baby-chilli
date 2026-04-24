"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { components } from "@/lib/registry";

const foundations = [
  { name: "Colors", slug: "colors" },
  { name: "Typography", slug: "typography" },
  { name: "Spacing", slug: "spacing" },
  { name: "Icons", slug: "icons" },
  { name: "Flags", slug: "flags" },
  { name: "Logos", slug: "logos" },
];

function getBreadcrumb(pathname: string): { category: string; name: string } | null {
  const slug = pathname.replace("/docs/", "");
  if (!slug || slug === "/docs") return null;

  const foundation = foundations.find((f) => f.slug === slug);
  if (foundation) return { category: "Foundations", name: foundation.name };

  const component = components.find((c) => c.slug === slug);
  if (component) return { category: "Components", name: component.name };

  return null;
}

export function Header({
  onMenuClick,
  onSearchClick,
}: {
  onMenuClick: () => void;
  onSearchClick: () => void;
}) {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] items-center bg-[var(--backgrounds-base)]/80 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          {breadcrumb && (
            <nav className="hidden md:flex items-center gap-1.5 text-sm">
              <span className="text-[var(--text-base-secondary)]">
                {breadcrumb.category}
              </span>
              <span className="text-[var(--text-base-secondary)] opacity-40">
                /
              </span>
              <span className="text-[var(--text-base-primary)] font-medium">
                {breadcrumb.name}
              </span>
            </nav>
          )}
        </div>

        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 rounded-full border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] px-3 py-1.5 text-sm text-[var(--text-base-secondary)] transition-colors hover:border-[var(--borders-default)] hover:text-[var(--text-base-primary)]"
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
