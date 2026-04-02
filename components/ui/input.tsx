"use client";

import { useState, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const inputContainerVariants = cva("flex items-center gap-2 w-full h-12 px-3 rounded-2xl text-base overflow-clip transition-all duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]", {
  variants: {
    state: {
      default: "bg-[var(--backgrounds-neutral-secondary-default)] border border-[var(--borders-neutral-moderate)]",
      focused: "bg-[var(--backgrounds-neutral-secondary-default)] border border-[var(--borders-brand-default)] shadow-[0_0_0_2px_var(--shadow-brand-moderate)]",
      error: "bg-[var(--backgrounds-neutral-secondary-default)] border border-[var(--borders-danger-default)] shadow-[0_0_0_2px_var(--shadow-danger-moderate)]",
      disabled: "bg-[var(--backgrounds-disabled)] border border-[var(--borders-disabled)] cursor-not-allowed opacity-50"
    }
  },
  defaultVariants: {
    state: "default"
  }
});
export const Input = forwardRef(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  clearable,
  onClear,
  actionButton,
  leadingText,
  disabled,
  className,
  inputClassName,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const state = disabled ? "disabled" : error ? "error" : focused ? "focused" : "default";
  return <div className={cn("flex flex-col gap-2 w-full", className)}>{label && <label className="text-sm font-medium text-[var(--text-base-primary)] leading-5">{label}</label>}{<div className={inputContainerVariants({
      state
    })}>{leadingText && <span className="text-[var(--text-base-secondary)] text-base font-normal shrink-0 whitespace-nowrap">{leadingText}</span>}{leftIcon && <span className="size-5 shrink-0 text-[var(--text-base-secondary)] flex items-center justify-center">{leftIcon}</span>}{<input ref={ref} disabled={disabled} className={cn("flex-1 min-w-0 bg-transparent outline-none font-normal", "text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)]", "text-base", disabled && "cursor-not-allowed", inputClassName)} onFocus={e => {
        setFocused(true);
        onFocus?.(e);
      }} onBlur={e => {
        setFocused(false);
        onBlur?.(e);
      }} {...props} />}{rightIcon && <span className="size-5 shrink-0 text-[var(--text-base-secondary)] flex items-center justify-center">{rightIcon}</span>}{clearable && <button type="button" onClick={onClear} className="size-7 shrink-0 rounded-full bg-[var(--backgrounds-neutral-secondary-default)] flex items-center justify-center text-[var(--text-base-primary)] hover:opacity-80 transition-opacity">{<X size={16} />}</button>}{actionButton && <button type="button" onClick={actionButton.onClick} className="shrink-0 min-w-[56px] px-2 py-1 rounded-full bg-[var(--backgrounds-neutral-secondary-default)] text-sm font-medium text-[var(--text-base-primary)] hover:opacity-80 transition-opacity">{actionButton.label}</button>}</div>}{(helperText || error) && <p className={cn("text-sm font-normal leading-5", error ? "text-[var(--text-danger-primary)]" : "text-[var(--text-base-secondary)]")}>{error || helperText}</p>}</div>;
});
Input.displayName = "Input";