"use client";

import { useState, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const itemVariants = cva("flex items-center gap-3 px-2 rounded-lg w-full cursor-pointer transition-colors duration-100", {
  variants: {
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
export const DropdownItem = forwardRef(({
  label,
  size = "md",
  checked = false,
  icon,
  showIcon = true,
  onSelect,
  className,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const isActive = checked || hovered;
  return <div ref={ref} className={cn(itemVariants({
    size
  }), hovered ? "bg-[var(--backgrounds-neutral-secondary-default)]" : "bg-transparent", className)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onSelect} role="menuitem" tabIndex={0} onKeyDown={e => e.key === "Enter" && onSelect?.()} {...props}>{<div className="flex flex-1 items-center gap-2 min-w-0">{showIcon && <span className={cn("size-4 shrink-0 flex items-center justify-center", isActive ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)]")}>{icon || <Plus size={16} />}</span>}{<span className={cn("text-sm font-normal leading-5 truncate", isActive ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)]")}>{label}</span>}</div>}{checked && <Check size={16} className="shrink-0 text-[var(--backgrounds-brand-strong-default)]" />}</div>;
});
DropdownItem.displayName = "DropdownItem";