"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const labelVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1",
      lg: "gap-2",
      xl: "gap-2"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const nameVariants = cva("font-medium text-[var(--text-base-primary)] leading-tight", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const supportingVariants = cva("font-normal text-[var(--text-base-secondary)] leading-tight", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-sm"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const avatarSizeMap = {
  sm: "xsm",
  md: "sm",
  lg: "md",
  xl: "md"
};
export const AvatarLabel = forwardRef(({
  src,
  fallback,
  name,
  supportingText,
  size = "md",
  className,
  ...props
}, ref) => {
  return <div ref={ref} className={cn(labelVariants({
    size
  }), className)} {...props}>{<Avatar src={src} fallback={fallback} size={avatarSizeMap[size]} />}{<div className="flex flex-col justify-center">{<span className={nameVariants({
        size
      })}>{name}</span>}{supportingText && <span className={supportingVariants({
        size
      })}>{supportingText}</span>}</div>}</div>;
});
AvatarLabel.displayName = "AvatarLabel";