import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(["inline-flex items-center justify-center font-medium", "text-[var(--text-base-primary)]", "border border-[var(--borders-default)]"].join(" "), {
  variants: {
    type: {
      fill: "bg-[var(--backgrounds-neutral-secondary-default)]",
      ghost: "bg-transparent"
    },
    size: {
      sm: "h-5 px-1.5 py-0.5 text-[12px] leading-[16px] gap-0.5 rounded-[4px]",
      md: "h-6 px-2 py-1 text-[12px] leading-[16px] gap-1 rounded-[6px]",
      lg: "h-7 px-2 py-1 text-[14px] leading-[20px] gap-1 rounded-[8px]"
    }
  },
  defaultVariants: {
    type: "fill",
    size: "sm"
  }
});
export const Badge = forwardRef(({
  className,
  type,
  size,
  label,
  dot,
  dotColor,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  return <div ref={ref} className={cn(badgeVariants({
    type,
    size,
    className
  }))} {...props}>{leftIcon && <span className="size-3 shrink-0 flex items-center justify-center">{leftIcon}</span>}{dot && <span className="size-1.5 rounded-full shrink-0" style={{
      backgroundColor: dotColor || "var(--backgrounds-brand-strong-default)"
    }} />}{<span>{label}</span>}{rightIcon && <span className="size-3 shrink-0 flex items-center justify-center">{rightIcon}</span>}</div>;
});
Badge.displayName = "Badge";
