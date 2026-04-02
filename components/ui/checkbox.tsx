"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva("relative inline-flex items-center justify-center shrink-0 border transition-all duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] cursor-pointer outline-none active:scale-90", {
  variants: {
    size: {
      sm: "size-4 rounded",
      md: "size-5 rounded-md"
    },
    variant: {
      unchecked: "bg-[var(--backgrounds-neutral-primary-default)] border-[var(--borders-default)] hover:bg-[var(--backgrounds-neutral-primary-default)] active:bg-[var(--backgrounds-neutral-primary-default)]",
      checked: "bg-[var(--backgrounds-brand-strong-default)] border-[var(--borders-brand-default)] hover:bg-[var(--backgrounds-brand-strong-default)] active:bg-[var(--backgrounds-brand-strong-default)]",
      number: "bg-[var(--backgrounds-brand-strong-default)] border-[var(--borders-brand-default)] hover:bg-[var(--backgrounds-brand-strong-default)] active:bg-[var(--backgrounds-brand-strong-default)]"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "unchecked"
  }
});
export const Checkbox = forwardRef(({
  checked = false,
  indeterminate = false,
  onCheckedChange,
  size = "md",
  number,
  disabled = false,
  className,
  label,
  description,
  ...props
}, ref) => {
  const isChecked = checked || indeterminate || number !== undefined;
  const iconSize = size === "sm" ? 12 : 16;
  const variant = number !== undefined ? "number" : isChecked ? "checked" : "unchecked";
  const checkbox = <button ref={ref} type="button" role="checkbox" aria-checked={indeterminate ? "mixed" : checked} disabled={disabled} className={cn(checkboxVariants({
    size,
    variant
  }), "focus-visible:shadow-[0_0_0_2px_var(--shadow-brand-moderate)]", disabled && "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)] cursor-not-allowed opacity-40", className)} onClick={() => !disabled && onCheckedChange?.(!checked)} {...props}>{checked && !indeterminate && number === undefined && <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" className="text-white">{<path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}</svg>}{indeterminate && <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" className="text-white">{<path d="M3.5 8H12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}</svg>}{number !== undefined && <span className={cn("text-[var(--text-fixed)] font-semibold", size === "sm" ? "text-[9px]" : "text-[11px]")}>{number}</span>}</button>;
  if (!label) return checkbox;
  return <div className="inline-flex items-start gap-2">{checkbox}{<div className={cn("flex flex-col gap-0 select-none", !disabled && "cursor-pointer")} onClick={() => !disabled && onCheckedChange?.(!checked)}>{<span className={cn("font-medium text-[var(--text-base-primary)]", size === "sm" ? "text-sm leading-5" : "text-base leading-6", disabled && "opacity-40")}>{label}</span>}{description && <span className={cn("text-[var(--text-base-secondary)] text-sm leading-5", disabled && "opacity-40")}>{description}</span>}</div>}</div>;
});
Checkbox.displayName = "Checkbox";