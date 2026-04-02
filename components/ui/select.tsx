"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown, MenuItem } from "@/components/ui/dropdown";

const triggerVariants = cva("relative inline-flex items-center rounded-full cursor-pointer transition-colors duration-100 font-medium select-none active:scale-[0.97] transition-transform", {
  variants: {
    size: {
      sm: "h-8 px-2 gap-0.5 text-sm",
      md: "h-10 px-3 gap-1 text-base"
    },
    variant: {
      default: "bg-[var(--backgrounds-neutral-primary-default)] border border-[var(--borders-default)] hover:bg-[var(--backgrounds-neutral-primary-default)] active:bg-[var(--backgrounds-neutral-primary-pressed)]",
      avatar: "bg-[var(--backgrounds-neutral-primary-default)] border border-[var(--borders-default)] hover:bg-[var(--backgrounds-neutral-primary-default)] active:bg-[var(--backgrounds-neutral-primary-pressed)]",
      borderless: "bg-transparent hover:bg-[var(--backgrounds-neutral-secondary-default)] active:bg-[var(--backgrounds-neutral-primary-pressed)]"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default"
  }
});
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  size = "md",
  variant = "default",
  avatarSrc,
  className
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPos, setMenuPos] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  const containerRef = useRef(null);
  const selectedOption = options.find(o => o.value === value);
  const displayLabel = selectedOption?.label || placeholder;
  const isFilled = !!selectedOption;
  const iconSize = size === "sm" ? 16 : 20;
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 8,
        left: rect.left,
        width: Math.max(rect.width, 240)
      });
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  return <div ref={containerRef} className={cn("relative inline-block", className)}>{<button type="button" onClick={() => setOpen(!open)} className={cn(triggerVariants({
      size,
      variant
    }), isFilled && variant !== "borderless" && "bg-[var(--backgrounds-neutral-secondary-default)]", open && "bg-[var(--backgrounds-neutral-primary-pressed)]")}>{<ChevronDown size={iconSize} className={cn("shrink-0 transition-colors", isFilled || open ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)]")} />}{variant === "avatar" && avatarSrc && isFilled && <img src={avatarSrc} alt="" className={cn("rounded-full object-cover shrink-0", size === "sm" ? "size-5 ml-0.5" : "size-6 ml-1")} />}{<span className={cn("whitespace-nowrap", size === "sm" ? "px-0.5" : "px-1", isFilled || open ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-primary)]")}>{variant === "avatar" && isFilled ? `@${displayLabel}` : displayLabel}</span>}{<ChevronDown size={iconSize} className={cn("shrink-0 transition-colors", isFilled || open ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)]")} />}</button>}{open && mounted && createPortal(<div className="fixed z-[9999]" style={{
      top: menuPos.top,
      left: menuPos.left,
      width: menuPos.width
    }}>{<Dropdown checkedIndex={options.findIndex(o => o.value === value)} size={size === "sm" ? "sm" : "md"}>{options.map((option, i) => <MenuItem icon={option.icon} label={option.label} index={i} onSelect={() => {
          onChange?.(option.value);
          setOpen(false);
        }} />)}</Dropdown>}</div>, document.body)}</div>;
}
Select.displayName = "Select";