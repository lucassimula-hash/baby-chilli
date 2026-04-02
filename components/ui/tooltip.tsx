"use client";

import { useState, useEffect, useRef, useCallback, Fragment, cloneElement } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 8,
  delayDuration = 200,
  className
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const tr = triggerRef.current.getBoundingClientRect();
    const tt = tooltipRef.current.getBoundingClientRect();
    let top = 0;
    let left = 0;
    switch (side) {
      case "top":
        top = tr.top - tt.height - sideOffset;
        left = tr.left + (tr.width - tt.width) / 2;
        break;
      case "bottom":
        top = tr.bottom + sideOffset;
        left = tr.left + (tr.width - tt.width) / 2;
        break;
      case "left":
        top = tr.top + (tr.height - tt.height) / 2;
        left = tr.left - tt.width - sideOffset;
        break;
      case "right":
        top = tr.top + (tr.height - tt.height) / 2;
        left = tr.right + sideOffset;
        break;
    }
    setPosition({
      top,
      left
    });
  }, [side, sideOffset]);
  const show = () => {
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delayDuration);
  };
  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };
  const originMap = {
    top: "origin-bottom",
    bottom: "origin-top",
    left: "origin-right",
    right: "origin-left"
  };
  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: e => {
      children.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: e => {
      children.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: e => {
      children.props.onFocus?.(e);
      show();
    },
    onBlur: e => {
      children.props.onBlur?.(e);
      hide();
    },
    onTouchStart: e => {
      children.props.onTouchStart?.(e);
      show();
    },
    onTouchEnd: e => {
      children.props.onTouchEnd?.(e);
      hide();
    }
  });
  const arrowStyle = {
    top: "left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45",
    bottom: "left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45",
    left: "-right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45",
    right: "-left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45",
  };
  return <Fragment>{trigger}{mounted && createPortal(<div ref={tooltipRef} role="tooltip" className={cn("fixed z-[9999] pointer-events-none", "px-3 py-2 rounded-xl max-w-[280px]", "bg-[var(--backgrounds-neutral-inverse-default)] text-[var(--text-base-alternate)]", "text-sm font-normal leading-5", "border border-[var(--borders-default)]", "shadow-[0_4px_12px_rgba(0,0,0,0.12)]", "transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]", originMap[side], isVisible ? "opacity-100 scale-100 translate-y-0 translate-x-0" : side === "top" ? "opacity-0 scale-95 translate-y-1" : side === "bottom" ? "opacity-0 scale-95 -translate-y-1" : side === "left" ? "opacity-0 scale-95 translate-x-1" : "opacity-0 scale-95 -translate-x-1", className)} style={{
      top: position.top,
      left: position.left,
      visibility: isVisible ? "visible" : "hidden"
    }}>{content}{<div className={cn("absolute bg-[var(--backgrounds-neutral-inverse-default)] border border-[var(--borders-default)]", arrowStyle[side])} />}</div>, document.body)}</Fragment>;
}
Tooltip.displayName = "Tooltip";