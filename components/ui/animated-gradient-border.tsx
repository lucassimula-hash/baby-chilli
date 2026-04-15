import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationMode = "none" | "auto-rotate" | "rotate-on-hover" | "stop-rotate-on-hover";

interface GradientColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  children?: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  gradientColors?: GradientColors;
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const DEFAULT_GRADIENT_COLORS: GradientColors = {
  primary: "rgba(245, 245, 245, 0.06)",
  secondary: "rgba(245, 245, 245, 0.22)",
  accent: "rgba(255, 75, 235, 0.16)",
};

export function BorderRotate({
  children,
  className,
  animationMode = "auto-rotate",
  animationSpeed = 8,
  gradientColors = DEFAULT_GRADIENT_COLORS,
  backgroundColor = "var(--color-neutral-900)",
  borderWidth = 1,
  borderRadius = 24,
  style,
  ...props
}: BorderRotateProps) {
  const animationClass =
    animationMode === "none"
      ? ""
      : animationMode === "rotate-on-hover"
      ? "gradient-border-hover"
      : animationMode === "stop-rotate-on-hover"
        ? "gradient-border-stop-hover"
        : "gradient-border-auto";

  const combinedStyle = {
    "--gradient-primary": gradientColors.primary,
    "--gradient-secondary": gradientColors.secondary,
    "--gradient-accent": gradientColors.accent,
    "--bg-color": backgroundColor,
    "--border-width": `${borderWidth}px`,
    "--border-radius": `${borderRadius}px`,
    "--animation-duration": `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 18%,
        ${gradientColors.accent} 32%,
        ${gradientColors.secondary} 44%,
        ${gradientColors.primary} 56%,
        ${gradientColors.secondary} 70%,
        ${gradientColors.accent} 84%,
        ${gradientColors.primary} 100%
      )
    `,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
    ...style,
  } as CSSProperties;

  return (
    <div
      className={cn("gradient-border-component", animationClass, className)}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
}
