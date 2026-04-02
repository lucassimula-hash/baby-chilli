"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function ResizableContainer({
  children,
  defaultWidth = 800,
  minWidth = 320,
  maxWidth = 1200,
  className
}) {
  const [width, setWidth] = useState(defaultWidth);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const handleMouseDown = e => {
    isDragging.current = true;
    e.preventDefault();
    const handleMouseMove = e => {
      if (!isDragging.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX - containerRect.left));
      setWidth(newWidth);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return <div className={cn("relative", className)}>{<div className="flex items-center justify-between mb-2">{<span className="text-xs text-[var(--text-base-secondary)]">{width}px {width <= 440 ? "(mobile)" : width <= 768 ? "(tablet)" : "(desktop)"}</span>}{<div className="flex gap-2">{[375, 768, 1024].map(w => <button onClick={() => setWidth(w)} className="text-xs text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] active:text-[var(--text-base-primary)] px-2 py-1 rounded-md hover:bg-[var(--backgrounds-neutral-secondary-default)] active:bg-[var(--backgrounds-neutral-secondary-default)] transition-colors">{w}</button>)}</div>}</div>}{<div ref={containerRef} className="relative border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]" style={{
      width,
      maxWidth: "100%"
    }}>{children}{<div onMouseDown={handleMouseDown} className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-[var(--backgrounds-brand-strong-default)]/20 active:bg-[var(--backgrounds-brand-strong-default)]/30 transition-colors flex items-center justify-center">{<div className="w-0.5 h-8 rounded-full bg-[var(--text-base-secondary)]" />}</div>}</div>}</div>;
}
ResizableContainer.displayName = "ResizableContainer";