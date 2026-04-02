import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(["inline-flex items-center justify-center rounded-full", "cursor-pointer transition-colors duration-150", "transition-transform active:scale-[0.96]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--borders-brand-default)]", "disabled:pointer-events-none disabled:cursor-not-allowed"].join(" "), {
  variants: {
    variant: {
      primary: ["bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]", "hover:bg-[var(--btn-primary-bg-hover)]", "disabled:bg-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)]"].join(" "),
      secondary: ["bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)]", "hover:bg-[var(--btn-secondary-bg-hover)]", "disabled:bg-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)]"].join(" "),
      transparent: ["bg-transparent text-[var(--text-base-secondary)]", "hover:bg-[var(--backgrounds-neutral-secondary-default)]", "disabled:bg-transparent disabled:text-[var(--btn-disabled-text)]"].join(" ")
    },
    size: {
      xsm: "size-7",
      sm: "size-8",
      md: "size-10",
      lg: "size-12"
    },
    glass: {
      true: ["backdrop-blur-[14px]", "border border-[var(--borders-glass-lighter)]", "shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.12),inset_0_-0.5px_0_0_rgba(166,166,166,0.2)]"].join(" "),
      false: ""
    }
  },
  compoundVariants: [{
    variant: "primary",
    glass: true,
    className: "!bg-[var(--backgrounds-neutral-glass-default)] !text-[var(--btn-primary-text)] hover:!bg-[var(--backgrounds-neutral-glass-hover)]"
  }, {
    variant: "secondary",
    glass: true,
    className: "!bg-[var(--btn-glass-secondary-bg)] !text-[var(--btn-secondary-text)] hover:!bg-[var(--btn-glass-secondary-bg-hover)]"
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
export const IconButton = forwardRef(({
  className,
  variant,
  size = "md",
  glass,
  icon: Icon,
  loading = false,
  disabled,
  ...props
}, ref) => {
  const iconSize = iconSizeMap[size ?? "md"];
  const isDisabled = disabled || loading;
  return <button className={cn(iconButtonVariants({
    variant,
    size,
    glass,
    className
  }))} ref={ref} disabled={isDisabled} {...props}>{loading ? <Loader2 size={iconSize} className="animate-spin" /> : <Icon size={iconSize} />}</button>;
});
IconButton.displayName = "IconButton";
