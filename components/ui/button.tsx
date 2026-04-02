import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(["inline-flex items-center justify-center whitespace-nowrap rounded-full", "font-medium font-[var(--font-family-secondary)] tracking-[0]", "cursor-pointer transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--borders-brand-default)] focus-visible:ring-offset-0", "disabled:pointer-events-none disabled:border-none disabled:bg-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)] disabled:shadow-none"].join(" "), {
  variants: {
    variant: {
      brand: ["border border-[var(--borders-brand-lighter)]", "bg-[var(--btn-brand-bg)] text-[var(--text-base-primary)]", "shadow-[var(--shadow-brand-moderate)]", "hover:bg-[var(--btn-brand-bg-hover)]"].join(" "),
      primary: ["bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]", "hover:bg-[var(--btn-primary-bg-hover)]"].join(" "),
      secondary: ["bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)]", "hover:bg-[var(--btn-secondary-bg-hover)]"].join(" "),
      ghost: ["bg-transparent text-[var(--text-base-secondary)]", "hover:bg-[var(--backgrounds-neutral-secondary-default)] hover:text-[var(--text-base-primary)]"].join(" "),
      danger: ["bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]", "hover:bg-[var(--btn-destructive-bg-hover)]"].join(" "),
      "danger-soft": ["bg-[var(--btn-destructive-secondary-bg)] text-[var(--btn-destructive-secondary-text)]", "hover:bg-[var(--btn-destructive-secondary-bg-hover)]"].join(" ")
    },
    size: {
      xsm: "h-7 px-2 py-1 text-[14px] leading-[20px] gap-0",
      sm: "h-8 px-2 py-1 text-[14px] leading-[20px] gap-1",
      md: "h-10 px-4 text-[16px] leading-[24px] gap-1",
      lg: "h-12 px-4 text-[16px] leading-[24px] gap-1 min-w-[72px]"
    },
    glass: {
      true: "backdrop-blur-sm",
      false: ""
    }
  },
  compoundVariants: [{
    variant: "brand",
    glass: true,
    className: "!bg-[var(--btn-glass-primary-bg)] !text-[var(--btn-brand-text)] hover:!bg-[var(--btn-glass-primary-bg-hover)]"
  }, {
    variant: "primary",
    glass: true,
    className: "!bg-[var(--backgrounds-neutral-glass-default)] !text-[var(--btn-primary-text)] hover:!bg-[var(--backgrounds-neutral-glass-hover)]"
  }, {
    variant: "secondary",
    glass: true,
    className: "!bg-[var(--btn-glass-secondary-bg)] !text-[var(--btn-secondary-text)] hover:!bg-[var(--btn-glass-secondary-bg-hover)]"
  }, {
    variant: "ghost",
    glass: true,
    className: "!bg-[var(--btn-glass-ghost-bg)] !text-[var(--btn-glass-ghost-text)] hover:!bg-[var(--btn-glass-ghost-bg-hover)]"
  }],
  defaultVariants: {
    variant: "primary",
    size: "md",
    glass: false
  }
});
const iconSizeMap = {
  xsm: 16,
  sm: 16,
  md: 20,
  lg: 20
};
export const Button = forwardRef(({
  className,
  variant,
  size = "md",
  glass,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled,
  children,
  ...props
}, ref) => {
  const iconSize = iconSizeMap[size ?? "md"];
  const isDisabled = disabled || loading;
  return <button className={cn(buttonVariants({
    variant,
    size,
    glass,
    className
  }))} ref={ref} disabled={isDisabled} {...props}>{loading ? <Loader2 size={iconSize} className="animate-spin" /> : LeftIcon ? <LeftIcon size={iconSize} /> : null}{children}{RightIcon && !loading && <RightIcon size={iconSize} />}</button>;
});
Button.displayName = "Button";
