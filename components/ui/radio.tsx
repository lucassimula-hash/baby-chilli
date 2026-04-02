"use client";

import { forwardRef, useContext, createContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const radioVariants = cva("relative inline-flex items-center justify-center rounded-full border transition-all duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] cursor-pointer shrink-0 outline-none active:scale-90", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5"
    },
    variant: {
      unchecked: "bg-[var(--backgrounds-neutral-primary-default)] border-[var(--borders-default)]",
      checked: "bg-[var(--backgrounds-brand-strong-default)] border-[var(--borders-brand-default)]"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "unchecked"
  }
});
export const RadioGroupContext = createContext({});
export const RadioGroup = forwardRef(({
  value,
  onValueChange,
  orientation = "vertical",
  children,
  className,
  ...props
}, ref) => {
  return <RadioGroupContext.Provider value={{
    value,
    onValueChange
  }}>{<div ref={ref} role="radiogroup" className={cn("flex", orientation === "vertical" ? "flex-col gap-3" : "flex-row gap-4", className)} {...props}>{children}</div>}</RadioGroupContext.Provider>;
});
RadioGroup.displayName = "RadioGroup";
export const Radio = forwardRef(({
  checked: checkedProp,
  onCheckedChange,
  size = "md",
  label,
  description,
  value,
  disabled = false,
  className,
  ...props
}, ref) => {
  const group = useContext(RadioGroupContext);
  const isChecked = group.value !== undefined ? group.value === value : checkedProp ?? false;
  const handleChange = () => {
    if (disabled) return;
    if (group.onValueChange && value) group.onValueChange(value);else onCheckedChange?.(!isChecked);
  };
  const radioButton = <button ref={ref} type="button" role="radio" aria-checked={isChecked} disabled={disabled} className={cn(radioVariants({
    size,
    variant: isChecked ? "checked" : "unchecked"
  }), "focus-visible:shadow-[0_0_0_2px_var(--shadow-brand-moderate)]", disabled && "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)] cursor-not-allowed opacity-40", className)} onClick={handleChange} {...props}>{isChecked && <span className={cn("rounded-full bg-[#F5F5F5]", size === "sm" ? "size-2" : "size-2.5")} />}</button>;
  if (!label && !description) return radioButton;
  return <div className="inline-flex items-start gap-2">{<div className="flex items-center pt-0.5 shrink-0">{radioButton}</div>}{<div className={cn("flex flex-col gap-0 select-none", !disabled && "cursor-pointer")} onClick={handleChange}>{label && <span className={cn("font-medium text-[var(--text-base-primary)] leading-tight", size === "sm" ? "text-sm" : "text-base", disabled && "opacity-40")}>{label}</span>}{description && <span className={cn("font-normal text-[var(--text-base-secondary)]", size === "sm" ? "text-xs leading-4" : "text-sm leading-5", disabled && "opacity-40")}>{description}</span>}</div>}</div>;
});
Radio.displayName = "Radio";