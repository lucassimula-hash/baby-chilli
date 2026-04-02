"use client";

import { useState, useEffect, useRef, useCallback, useContext, createContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const DropdownContext = createContext({
  size: "md",
  onItemHover: () => {},
  registerItem: () => {}
});
// ─── Container sizes ────────────────────────────────────
const containerVariants = cva(["relative flex flex-col w-full max-w-[320px] overflow-hidden", "bg-[var(--backgrounds-neutral-primary-default)]", "border border-[var(--borders-default)]", "shadow-[0_20px_24px_-6px_rgba(0,0,0,0.32)]"], {
  variants: {
    size: {
      sm: "rounded-2xl gap-0.5 p-1",
      md: "rounded-[18px] gap-0.5 p-1",
      lg: "rounded-[18px] gap-0.5 p-1.5"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
// ─── Item sizes ─────────────────────────────────────────
const itemVariants = cva("relative z-10 flex items-center gap-3 px-2 w-full cursor-pointer transition-colors duration-100", {
  variants: {
    size: {
      sm: "h-8 rounded-xl",
      md: "h-10 rounded-2xl",
      lg: "h-12 rounded-2xl"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
export function Dropdown({
  checkedIndex,
  size = "md",
  children,
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef(new Map());
  const [hoveredRect, setHoveredRect] = useState(null);
  const [isInside, setIsInside] = useState(false);
  const registerItem = useCallback((index, el) => {
    if (el) itemRefs.current.set(index, el);else itemRefs.current.delete(index);
  }, []);
  const getItemRect = useCallback(index => {
    const el = itemRefs.current.get(index);
    const parent = containerRef.current;
    if (!el || !parent) return null;
    const parentRect = parent.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    return {
      top: itemRect.top - parentRect.top,
      height: itemRect.height
    };
  }, []);
  const onItemHover = useCallback(rect => {
    setHoveredRect(rect);
    setIsInside(true);
  }, []);
  const handleMouseLeave = () => {
    setIsInside(false);
    // Slide back to checked item
    if (checkedIndex !== undefined) {
      const rect = getItemRect(checkedIndex);
      if (rect) {
        setHoveredRect(rect);
        return;
      }
    }
    setHoveredRect(null);
  };
  // Update highlight when checkedIndex changes (click transition)
  useEffect(() => {
    if (checkedIndex !== undefined && !isInside) {
      const rect = getItemRect(checkedIndex);
      if (rect) setHoveredRect(rect);
    }
  }, [checkedIndex, isInside, getItemRect]);
  const highlightRadius = size === "sm" ? "12px" : "16px";
  const showHighlight = hoveredRect && (isInside || checkedIndex !== undefined);
  return <DropdownContext.Provider value={{
    checkedIndex,
    size,
    onItemHover,
    registerItem
  }}>{<div ref={containerRef} className={cn(containerVariants({
      size
    }), className)} role="menu" onMouseLeave={handleMouseLeave} onTouchEnd={() => setTimeout(handleMouseLeave, 300)} {...props}>{<div className="absolute left-1 right-1 z-0 bg-[var(--backgrounds-neutral-secondary-default)] pointer-events-none" style={{
        top: hoveredRect ? hoveredRect.top : 0,
        height: hoveredRect ? hoveredRect.height : 0,
        borderRadius: highlightRadius,
        opacity: showHighlight ? 1 : 0,
        transition: "top 150ms ease, height 150ms ease, opacity 100ms ease"
      }} />}{children}</div>}</DropdownContext.Provider>;
}
Dropdown.displayName = "Dropdown";
export function MenuItem({
  icon: Icon,
  label,
  index,
  checked: checkedProp,
  onSelect,
  className,
  ...props
}) {
  const {
    checkedIndex,
    size,
    onItemHover,
    registerItem
  } = useContext(DropdownContext);
  const isChecked = checkedProp ?? (index !== undefined && checkedIndex === index);
  const itemRef = useRef(null);
  // Register item ref for checked tracking
  useEffect(() => {
    if (index !== undefined) {
      registerItem(index, itemRef.current);
      return () => registerItem(index, null);
    }
  }, [index, registerItem]);
  const handleMouseEnter = () => {
    if (!itemRef.current) return;
    const parent = itemRef.current.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const itemRect = itemRef.current.getBoundingClientRect();
    onItemHover({
      top: itemRect.top - parentRect.top,
      height: itemRect.height
    });
  };
  return <motion.div ref={itemRef} className={cn(itemVariants({
    size
  }), "group", className)} role="menuitem" tabIndex={0} onClick={onSelect} onKeyDown={e => e.key === "Enter" && onSelect?.()} onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter} whileTap={{
    scale: 0.97
  }} transition={{
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
  }} {...props}>{<div className="flex flex-1 items-center gap-2 min-w-0">{Icon && <Icon size={16} className={cn("shrink-0 transition-colors duration-100", isChecked ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)] group-hover:text-[var(--text-base-primary)] group-active:text-[var(--text-base-primary)]")} />}{<span className={cn("text-sm font-normal leading-5 truncate transition-colors duration-100", isChecked ? "text-[var(--text-base-primary)]" : "text-[var(--text-base-secondary)] group-hover:text-[var(--text-base-primary)] group-active:text-[var(--text-base-primary)]")}>{label}</span>}</div>}{<AnimatePresence>{isChecked && <motion.span initial={{
        scale: 0,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0,
        opacity: 0
      }} transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.8
      }} className="shrink-0">{<Check size={16} className="text-[var(--backgrounds-brand-strong-default)]" />}</motion.span>}</AnimatePresence>}</motion.div>;
}
MenuItem.displayName = "MenuItem";