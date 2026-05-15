"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const SHIMMER_SWEEP_ENTER = {
  opacity: 1,
  x: 0,
  filter: "blur(0px)",
};

const SHIMMER_SWEEP_INITIAL = {
  opacity: 0,
  x: -22,
  filter: "blur(8px)",
};

const SHIMMER_SWEEP_TRANSITION = {
  duration: 0.612,
  ease: [0.22, 1, 0.36, 1] as const,
};

type AnimatedTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

export function AnimatedTitle({
  as = "h1",
  className,
  children,
  ...props
}: AnimatedTitleProps) {
  const reducedMotion = useReducedMotion();
  const MotionH1 = motion.h1 as any;
  const sharedClassName = cn(
    "inline-block will-change-transform will-change-[opacity,filter]",
    className
  );

  if (as !== "h1") {
    const Tag = as as ElementType;

    return (
      <Tag className={sharedClassName} {...(props as any)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionH1
      initial={reducedMotion ? false : SHIMMER_SWEEP_INITIAL}
      animate={SHIMMER_SWEEP_ENTER}
      transition={SHIMMER_SWEEP_TRANSITION}
      className={sharedClassName}
      {...(props as any)}
    >
      {children}
    </MotionH1>
  );
}
