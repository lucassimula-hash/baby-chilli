import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const chipVariants = cva(["inline-flex items-center rounded-full font-medium", "text-[var(--text-base-primary)]", "transition-colors duration-150"].join(" "), {
  variants: {
    type: {
      fill: "bg-[var(--backgrounds-neutral-primary-default)]",
      light: "bg-transparent border border-[var(--borders-default)]"
    },
    size: {
      sm: "h-5 text-[12px] leading-[16px] gap-1",
      md: "h-6 text-[12px] leading-[16px] gap-1",
      lg: "h-7 text-[14px] leading-[20px] gap-1",
      xl: "h-8 text-[14px] leading-[20px] gap-1"
    }
  },
  defaultVariants: {
    type: "fill",
    size: "md"
  }
});
const paddingMap = {
  sm: {
    default: "px-2 py-0.5",
    withLeading: "pl-1 pr-2 py-0.5"
  },
  md: {
    default: "px-2 py-1",
    withLeading: "pl-1 pr-2 py-1"
  },
  lg: {
    default: "px-3 py-1",
    withLeading: "pl-1 pr-3 py-1"
  },
  xl: {
    default: "px-4 py-1.5",
    withLeading: "pl-1.5 pr-4 py-1.5"
  }
};
const avatarSizeMap = {
  sm: 16,
  md: 20,
  lg: 20,
  xl: 24
};
const iconSizeMap = {
  sm: 16,
  md: 16,
  lg: 20,
  xl: 20
};
const removeSizeMap = {
  sm: 12,
  md: 12,
  lg: 14,
  xl: 14
};
export const Chip = forwardRef(({
  className,
  size = "md",
  type,
  variant = "default",
  label,
  avatarSrc,
  socialIcon,
  onRemove,
  ...props
}, ref) => {
  const s = size ?? "md";
  const hasLeading = variant === "avatar" || variant === "social";
  const padding = paddingMap[s][hasLeading ? "withLeading" : "default"];
  const avatarSize = avatarSizeMap[s];
  const iconSize = iconSizeMap[s];
  const removeSize = removeSizeMap[s];
  return <div ref={ref} className={cn(chipVariants({
    type,
    size,
    className
  }), padding)} {...props}>{variant === "avatar" && avatarSrc && <img src={avatarSrc} alt="" className="rounded-full object-cover shrink-0" style={{
      width: avatarSize,
      height: avatarSize
    }} />}{variant === "social" && socialIcon && <span className="shrink-0 flex items-center justify-center" style={{
      width: iconSize,
      height: iconSize
    }}>{socialIcon}</span>}{<span>{label}</span>}{onRemove && <button onClick={onRemove} className="shrink-0 flex items-center justify-center rounded-full text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] transition-colors" aria-label="Remove">{<X size={removeSize} />}</button>}</div>;
});
Chip.displayName = "Chip";