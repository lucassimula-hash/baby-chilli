"use client";

import { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Spring tokens (from fluid-functionalism) ── */
const springs = {
  fast: {
    type: "spring",
    duration: 0.08,
    bounce: 0
  },
  moderate: {
    type: "spring",
    duration: 0.16,
    bounce: 0.15
  },
  slow: {
    type: "spring",
    duration: 0.24,
    bounce: 0.15
  }
};
/* ── Size configs ── */
const SIZE_CONFIG = {
  sm: {
    trackW: 34,
    trackH: 20,
    thumb: 16,
    offset: 2
  },
  md: {
    trackW: 48,
    trackH: 28,
    thumb: 22,
    offset: 3
  }
};
export const PILL_EXTEND = 2;
export const PRESS_EXTEND = 4;
export const PRESS_SHRINK = 4;
export const DRAG_DEAD_ZONE = 2;
/* ── Component ── */
export const Toggle = forwardRef(({
  checked = false,
  onCheckedChange,
  size = "md",
  label,
  description,
  disabled = false,
  className,
  ...props
}, ref) => {
  const cfg = SIZE_CONFIG[size];
  const THUMB_TRAVEL = cfg.trackW - cfg.thumb - cfg.offset * 2;
  const hasMounted = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const pointerStart = useRef(null);
  const motionX = useMotionValue(checked ? cfg.offset + THUMB_TRAVEL : cfg.offset);
  useEffect(() => {
    hasMounted.current = true;
  }, []);
  // Compute thumb shape
  const thumbWidth = pressed ? cfg.thumb + PRESS_EXTEND : hovered ? cfg.thumb + PILL_EXTEND : cfg.thumb;
  const thumbHeight = pressed ? cfg.thumb - PRESS_SHRINK : cfg.thumb;
  const thumbY = pressed ? cfg.offset + PRESS_SHRINK / 2 : cfg.offset;
  const extraWidth = thumbWidth - cfg.thumb;
  const thumbX = checked ? cfg.offset + THUMB_TRAVEL - extraWidth : cfg.offset;
  // Sync motionX when thumbX changes and not dragging
  useEffect(() => {
    if (dragging.current) return;
    if (!hasMounted.current) {
      motionX.set(thumbX);
    } else {
      animate(motionX, thumbX, springs.moderate);
    }
  }, [thumbX, motionX]);
  // ── Pointer handlers (drag support) ──
  const handlePointerDown = useCallback(e => {
    if (disabled) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setPressed(true);
    dragging.current = false;
    didDrag.current = false;
    pointerStart.current = {
      clientX: e.clientX,
      originX: motionX.get()
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [disabled, motionX]);
  const handlePointerMove = useCallback(e => {
    if (!pointerStart.current) return;
    const delta = e.clientX - pointerStart.current.clientX;
    if (!dragging.current) {
      if (Math.abs(delta) < DRAG_DEAD_ZONE) return;
      dragging.current = true;
    }
    const dragMin = cfg.offset;
    const pressedThumbWidth = cfg.thumb + PRESS_EXTEND;
    const dragMax = cfg.trackW - cfg.offset - pressedThumbWidth;
    const rawX = pointerStart.current.originX + delta;
    motionX.set(Math.max(dragMin, Math.min(dragMax, rawX)));
  }, [motionX, cfg]);
  const handlePointerUp = useCallback(e => {
    if (!pointerStart.current) return;
    setPressed(false);
    if (dragging.current) {
      didDrag.current = true;
      dragging.current = false;
      const currentX = motionX.get();
      const dragMin = cfg.offset;
      const pressedThumbWidth = cfg.thumb + PRESS_EXTEND;
      const dragMax = cfg.trackW - cfg.offset - pressedThumbWidth;
      const midpoint = (dragMin + dragMax) / 2;
      const shouldBeOn = currentX > midpoint;
      if (shouldBeOn !== checked) {
        onCheckedChange?.(!checked);
      } else {
        const snapTarget = checked ? cfg.offset + THUMB_TRAVEL : cfg.offset;
        animate(motionX, snapTarget, springs.moderate);
      }
      requestAnimationFrame(() => {
        didDrag.current = false;
      });
    }
    pointerStart.current = null;
  }, [checked, onCheckedChange, motionX, cfg, THUMB_TRAVEL]);
  return <div ref={ref} className={cn("relative z-10 flex items-center gap-2.5 cursor-pointer select-none touch-none", disabled && "opacity-50 pointer-events-none", className)} onPointerEnter={e => {
    if (e.pointerType === "mouse") setHovered(true);
  }} onPointerLeave={() => setHovered(false)} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onClick={() => {
    if (disabled || didDrag.current) return;
    onCheckedChange?.(!checked);
  }} {...props}>{<div role="switch" aria-checked={checked} tabIndex={disabled ? -1 : 0} className={cn("relative shrink-0 rounded-full outline-none cursor-pointer", "transition-colors duration-100", "focus-visible:shadow-[0_0_0_2px_var(--shadow-brand-moderate)]")} style={{
      width: cfg.trackW,
      height: cfg.trackH,
      backgroundColor: checked ? "var(--backgrounds-brand-strong-default)" : "var(--backgrounds-neutral-secondary-default)"
    }} onClick={e => e.stopPropagation()} onKeyDown={e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!disabled) onCheckedChange?.(!checked);
      }
    }}>{<motion.span className="absolute top-0 left-0 block rounded-full bg-[var(--backgrounds-neutral-inverse-default)] shadow-[0_0_1px_rgba(0,0,0,0.02),0_2px_2px_rgba(0,0,0,0.02),0_4px_3px_rgba(0,0,0,0.01)]" initial={false} style={{
        x: motionX
      }} animate={{
        y: thumbY,
        width: thumbWidth,
        height: thumbHeight
      }} transition={hasMounted.current ? springs.moderate : {
        duration: 0
      }} />}</div>}{(label || description) && <div className="flex flex-col gap-0 select-none">{label && <span className={cn("text-[13px] font-medium transition-colors duration-100", checked ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)]")}>{label}</span>}{description && <span className="text-xs text-[var(--text-base-secondary)]">{description}</span>}</div>}</div>;
});
Toggle.displayName = "Toggle";