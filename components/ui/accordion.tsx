"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Context for group mode ─────────────────────────── */
interface AccordionGroupCtx {
  type: "single" | "multiple";
  openValues: string[];
  toggle: (value: string) => void;
}

const GroupContext = createContext<AccordionGroupCtx | null>(null);

/* ─── AccordionGroup ─────────────────────────────────── */
export function AccordionGroup({
  type = "single",
  defaultValue,
  children,
  className,
}: {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}) {
  const [openValues, setOpenValues] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggle = (value: string) => {
    setOpenValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return type === "single" ? [value] : [...prev, value];
    });
  };

  return (
    <GroupContext.Provider value={{ type, openValues, toggle }}>
      <div className={cn("flex flex-col w-full", className)}>{children}</div>
    </GroupContext.Provider>
  );
}

/* ─── AccordionItem ──────────────────────────────────── */
export function AccordionItem({
  value,
  title,
  children,
  defaultOpen = false,
  className,
}: {
  value?: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const group = useContext(GroupContext);
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const isOpen = group && value ? group.openValues.includes(value) : localOpen;

  const toggle = () => {
    if (group && value) {
      group.toggle(value);
    } else {
      setLocalOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <button
        onClick={toggle}
        className={cn(
          "flex items-center gap-1 w-full text-left cursor-pointer transition-all duration-200",
          isOpen
            ? "bg-[var(--backgrounds-neutral-primary-default)] px-3 py-2 rounded-t-2xl"
            : "px-3 py-2 hover:bg-[var(--backgrounds-neutral-primary-hover)] rounded-2xl"
        )}
      >
        <span
          className={cn(
            "flex-1 text-sm leading-5",
            isOpen
              ? "font-medium text-[var(--text-base-primary)]"
              : "font-normal text-[var(--text-base-secondary)]"
          )}
        >
          {title}
        </span>
        <ChevronRight
          size={20}
          className={cn(
            "shrink-0 transition-transform duration-200 ease-out",
            isOpen
              ? "rotate-90 text-[var(--text-base-primary)]"
              : "text-[var(--text-base-secondary)]"
          )}
        />
      </button>

      {/* Content */}
      <div
        className="overflow-hidden transition-[height] duration-200 ease-out"
        style={{ height: isOpen ? contentHeight : 0 }}
      >
        <div
          ref={contentRef}
          className={cn(
            "bg-[var(--backgrounds-neutral-primary-default)]",
            "px-3 pt-1 pb-3 rounded-b-2xl"
          )}
        >
          <div className="text-sm leading-5 font-normal text-[var(--text-base-secondary)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

AccordionGroup.displayName = "AccordionGroup";
AccordionItem.displayName = "AccordionItem";
