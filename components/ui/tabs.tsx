"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

const tabItemBase =
  "relative z-10 inline-flex items-center justify-center font-medium transition-colors duration-100 cursor-pointer select-none whitespace-nowrap";

const sizeClasses = {
  sm: "text-sm h-7",
  md: "text-sm h-8",
  lg: "text-base h-10",
};

const iconSizeMap = {
  sm: 16,
  md: 16,
  lg: 20,
};

const inactiveClasses =
  "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)]";

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function TabButton({
  item,
  isActive,
  iconSize,
  sizeClass,
  extraClass,
  onClick,
  buttonRef,
  onMouseEnter,
}: {
  item: TabItem;
  isActive: boolean;
  iconSize: number;
  sizeClass: string;
  extraClass?: string;
  onClick: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
  onMouseEnter?: () => void;
}) {
  return (
    <button
      ref={buttonRef}
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(tabItemBase, sizeClass, extraClass)}
    >
      {item.icon && (
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {item.icon}
        </span>
      )}
      <span className="px-1">{item.label}</span>
      {item.rightIcon && (
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {item.rightIcon}
        </span>
      )}
    </button>
  );
}

export function Tabs({
  items,
  value,
  onValueChange,
  type = "pill",
  size = "md",
  className,
  ...props
}: {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  type?: "underline" | "pill" | "segmented";
  size?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: unknown;
}) {
  const iconSize = iconSizeMap[size];
  const sizeClass = sizeClasses[size];
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [highlight, setHighlight] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const getItemRect = useCallback((val: string) => {
    const el = itemRefs.current.get(val);
    const parent = containerRef.current;
    if (!el || !parent) return null;
    const parentRect = parent.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    return {
      left: itemRect.left - parentRect.left,
      width: itemRect.width,
    };
  }, []);

  // Position on active item
  useEffect(() => {
    if (!isHovering && value) {
      const rect = getItemRect(value);
      if (rect) setHighlight({ left: rect.left, width: rect.width, opacity: 1 });
    }
  }, [value, isHovering, getItemRect]);

  // Init
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        const rect = getItemRect(value);
        if (rect) setHighlight({ left: rect.left, width: rect.width, opacity: 1 });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [value, getItemRect]);

  const handleHover = (val: string) => {
    setIsHovering(true);
    const rect = getItemRect(val);
    if (rect) setHighlight({ left: rect.left, width: rect.width, opacity: 1 });
  };

  const handleLeave = () => {
    setIsHovering(false);
    if (value) {
      const rect = getItemRect(value);
      if (rect) setHighlight({ left: rect.left, width: rect.width, opacity: 1 });
    }
  };

  const handleClick = (val: string) => {
    setIsHovering(false);
    const rect = getItemRect(val);
    if (rect) setHighlight({ left: rect.left, width: rect.width, opacity: 1 });
    onValueChange(val);
  };

  const registerRef = (val: string, el: HTMLButtonElement | null) => {
    if (el) itemRefs.current.set(val, el);
    else itemRefs.current.delete(val);
  };

  if (type === "underline") {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex items-center gap-1 border-b border-[var(--borders-default)]",
          className
        )}
        role="tablist"
        onMouseLeave={handleLeave}
        {...props}
      >
        {/* Sliding underline */}
        <div
          className="absolute bottom-0 h-0.5 bg-[var(--text-base-primary)] pointer-events-none z-0"
          style={{
            left: highlight.left,
            width: highlight.width,
            opacity: highlight.opacity,
            transition: "left 200ms ease, width 200ms ease, opacity 100ms ease",
          }}
        />
        {items.map((item) => {
          const isActive = item.value === value;
          return (
            <TabButton
              key={item.value}
              item={item}
              isActive={isActive}
              iconSize={iconSize}
              sizeClass={sizeClass}
              extraClass={cn(
                "pb-2 -mb-px",
                isActive
                  ? "text-[var(--text-base-primary)]"
                  : inactiveClasses
              )}
              onClick={() => handleClick(item.value)}
              buttonRef={(el) => registerRef(item.value, el)}
              onMouseEnter={() => handleHover(item.value)}
            />
          );
        })}
      </div>
    );
  }

  if (type === "segmented") {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative inline-flex items-center gap-0.5 p-0.5 rounded-full",
          "bg-[var(--backgrounds-neutral-secondary-default)] border border-[var(--borders-default)]",
          className
        )}
        role="tablist"
        onMouseLeave={handleLeave}
        {...props}
      >
        {/* Sliding pill */}
        <div
          className="absolute z-0 rounded-full bg-[var(--backgrounds-neutral-tertiary-default)] border border-[var(--borders-default)] shadow-[0_0_1px_rgba(0,0,0,0.02),0_2px_2px_rgba(0,0,0,0.02)] pointer-events-none"
          style={{
            left: highlight.left,
            width: highlight.width,
            top: 2,
            bottom: 2,
            opacity: highlight.opacity,
            transition: "left 200ms ease, width 200ms ease, opacity 100ms ease",
          }}
        />
        {items.map((item) => {
          const isActive = item.value === value;
          return (
            <TabButton
              key={item.value}
              item={item}
              isActive={isActive}
              iconSize={iconSize}
              sizeClass={sizeClass}
              extraClass={cn(
                "rounded-full px-2",
                isActive
                  ? "text-[var(--text-base-primary)]"
                  : inactiveClasses
              )}
              onClick={() => handleClick(item.value)}
              buttonRef={(el) => registerRef(item.value, el)}
              onMouseEnter={() => handleHover(item.value)}
            />
          );
        })}
      </div>
    );
  }

  // pill (default)
  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center gap-1", className)}
      role="tablist"
      onMouseLeave={handleLeave}
      {...props}
    >
      {/* Sliding pill */}
      <div
        className="absolute z-0 rounded-full bg-[var(--backgrounds-neutral-secondary-default)] border border-[var(--borders-default)] shadow-[0_0_1px_rgba(0,0,0,0.02),0_2px_2px_rgba(0,0,0,0.02)] pointer-events-none"
        style={{
          left: highlight.left,
          width: highlight.width,
          top: 0,
          bottom: 0,
          opacity: highlight.opacity,
          transition: "left 200ms ease, width 200ms ease, opacity 100ms ease",
        }}
      />
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <TabButton
            key={item.value}
            item={item}
            isActive={isActive}
            iconSize={iconSize}
            sizeClass={sizeClass}
            extraClass={cn(
              "rounded-full px-2",
              isActive
                ? "text-[var(--text-base-primary)]"
                : inactiveClasses
            )}
            onClick={() => handleClick(item.value)}
            buttonRef={(el) => registerRef(item.value, el)}
            onMouseEnter={() => handleHover(item.value)}
          />
        );
      })}
    </div>
  );
}

Tabs.displayName = "Tabs";
