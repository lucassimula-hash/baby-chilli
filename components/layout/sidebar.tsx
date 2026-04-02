"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { components } from "@/lib/registry";
import { useRef, useState, useCallback, useEffect } from "react";

const foundations = [
  { name: "Colors", slug: "colors" },
  { name: "Typography", slug: "typography" },
  { name: "Spacing", slug: "spacing" },
  { name: "Icons", slug: "icons" },
  { name: "Logos", slug: "logos" },
];

const showcasePages = [
  { name: "Showcase", slug: "campaign" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    height: number;
    opacity: number;
  }>({ top: 0, height: 0, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const getItemRect = useCallback((slug: string) => {
    const el = itemRefs.current.get(slug);
    const parent = navRef.current;
    if (!el || !parent) return null;
    const parentRect = parent.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    return {
      top: itemRect.top - parentRect.top + parent.scrollTop,
      height: itemRect.height,
    };
  }, []);

  const activeSlug = pathname?.replace("/docs/", "") || "";

  // Position highlight on active item when not hovering
  useEffect(() => {
    if (!isHovering && activeSlug) {
      const rect = getItemRect(activeSlug);
      if (rect) {
        setHighlightStyle({ top: rect.top, height: rect.height, opacity: 1 });
      }
    }
  }, [activeSlug, isHovering, getItemRect]);

  // Recalculate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeSlug) {
        const rect = getItemRect(activeSlug);
        if (rect) {
          setHighlightStyle({ top: rect.top, height: rect.height, opacity: 1 });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSlug, getItemRect]);

  const handleItemHover = (slug: string) => {
    setIsHovering(true);
    const rect = getItemRect(slug);
    if (rect) {
      setHighlightStyle({ top: rect.top, height: rect.height, opacity: 1 });
    }
  };

  const handleNavLeave = () => {
    setIsHovering(false);
    // Slide back to active item
    if (activeSlug) {
      const rect = getItemRect(activeSlug);
      if (rect) {
        setHighlightStyle({ top: rect.top, height: rect.height, opacity: 1 });
        return;
      }
    }
    setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const registerRef = (slug: string, el: HTMLAnchorElement | null) => {
    if (el) itemRefs.current.set(slug, el);
    else itemRefs.current.delete(slug);
  };

  const isActive = (slug: string) => pathname === `/docs/${slug}`;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[var(--sidebar-width)] flex-col transition-transform duration-300 ease-in-out",
          "border-r border-[var(--borders-default)] bg-[var(--backgrounds-base)]",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <Link href="/docs/campaign" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Chilli"
              width={48}
              height={48}
              unoptimized
            />
          </Link>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] md:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav
          ref={navRef}
          className="relative flex-1 overflow-y-auto bg-[var(--backgrounds-base)] px-3 pb-6 pt-2 scrollbar-thin scrollbar-thumb-[#323132] scrollbar-track-transparent"
          onMouseLeave={handleNavLeave}
        >
          {/* Sliding highlight */}
          <div
            className="absolute left-3 right-3 z-0 rounded-full bg-[var(--backgrounds-neutral-primary-default)] pointer-events-none"
            style={{
              top: highlightStyle.top,
              height: highlightStyle.height,
              opacity: highlightStyle.opacity,
              transition:
                "top 150ms ease, height 150ms ease, opacity 100ms ease",
            }}
          />

          {/* Showcase */}
          <div className="mb-[var(--space-9)]">
            <ul className="space-y-0.5">
              {showcasePages.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${item.slug}`}
                    ref={(el) => registerRef(item.slug, el)}
                    onClick={onClose}
                    onMouseEnter={() => handleItemHover(item.slug)}
                    className={cn(
                      "relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-100 block",
                      isActive(item.slug)
                        ? "text-[var(--text-base-primary)] font-medium"
                        : "text-[var(--text-base-secondary)]"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-[var(--space-9)]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--text-base-secondary)] px-3 mb-2 block">
              Components
            </span>
            <ul className="space-y-0.5">
              {components.map((component) => (
                <li key={component.slug}>
                  <Link
                    href={`/docs/${component.slug}`}
                    ref={(el) => registerRef(component.slug, el)}
                    onClick={onClose}
                    onMouseEnter={() => handleItemHover(component.slug)}
                    className={cn(
                      "relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-100 block",
                      isActive(component.slug)
                        ? "text-[var(--text-base-primary)] font-medium"
                        : "text-[var(--text-base-secondary)]"
                    )}
                  >
                    {component.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Foundations */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--text-base-secondary)] px-3 mb-2 block">
              Foundations
            </span>
            <ul className="space-y-0.5">
              {foundations.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${item.slug}`}
                    ref={(el) => registerRef(item.slug, el)}
                    onClick={onClose}
                    onMouseEnter={() => handleItemHover(item.slug)}
                    className={cn(
                      "relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-100 block",
                      isActive(item.slug)
                        ? "text-[var(--text-base-primary)] font-medium"
                        : "text-[var(--text-base-secondary)]"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
