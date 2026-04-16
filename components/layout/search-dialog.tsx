"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { components } from "@/lib/registry";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? components.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : components;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-search-item]");
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].slug);
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  function navigate(slug: string) {
    router.push(`/docs/${slug}`);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg mx-4 overflow-hidden rounded-2xl border border-[var(--borders-default)] bg-[var(--backgrounds-elevated)] shadow-2xl">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[var(--borders-default)] px-4 py-3">
          <Search
            size={16}
            className="shrink-0 text-[var(--text-base-secondary)]"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components..."
            className="flex-1 bg-transparent text-sm text-[var(--text-base-primary)] outline-none placeholder:text-[var(--text-base-secondary)]"
          />
          <kbd className="shrink-0 rounded-md border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-base-secondary)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-[var(--text-base-secondary)]">
              No components found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul>
              {results.map((component, index) => (
                <li key={component.slug}>
                  <button
                    data-search-item
                    onClick={() => navigate(component.slug)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors",
                      selectedIndex === index
                        ? "bg-[var(--backgrounds-neutral-primary-default)]"
                        : "hover:bg-[var(--backgrounds-neutral-secondary-default)]"
                    )}
                  >
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-sm truncate",
                          selectedIndex === index
                            ? "text-[var(--text-base-primary)] font-medium"
                            : "text-[var(--text-base-primary)]"
                        )}
                      >
                        {component.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-base-secondary)] line-clamp-1">
                        {component.description}
                      </p>
                    </div>
                    {selectedIndex === index && (
                      <ArrowRight
                        size={14}
                        className="shrink-0 ml-3 text-[var(--text-base-secondary)]"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
