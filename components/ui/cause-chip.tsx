import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const CAUSE_COLORS = ["neon-pink", "bright-pink", "electric-magenta", "purple", "ultra-blue", "blue", "cyan-blue", "liquid-blue", "bright-cyan", "caribbean-green", "lime-green", "lime", "yellow", "amber-orange", "orange", "red", "antique-gold", "desert-orange", "midnight-blue", "grey"];
const causeChipVariants = cva("inline-flex items-center rounded-full font-medium transition-colors duration-150", {
  variants: {
    size: {
      xs: "h-5 px-2 py-0.5 text-[12px] leading-[16px]",
      md: "h-6 px-2 py-1 text-[12px] leading-[16px]",
      lg: "h-7 px-3 py-1 text-[14px] leading-[20px]"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
export const CauseChip = forwardRef(({
  className,
  size,
  color,
  type = "default",
  label,
  ...props
}, ref) => {
  const lighter = `var(--backgrounds-other-${color}-lighter)`;
  const strong = `var(--backgrounds-other-${color}-strong)`;
  return <div ref={ref} className={cn(causeChipVariants({
    size,
    className
  }), type === "glass" && "backdrop-blur-[8px]")} style={{
    backgroundColor: lighter,
    color: strong,
    ...(type === "glass" ? {
      borderWidth: "0.5px",
      borderStyle: "solid",
      borderColor: lighter
    } : {})
  }} {...props}>{label}</div>;
});
CauseChip.displayName = "CauseChip";