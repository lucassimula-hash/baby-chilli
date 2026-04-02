"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [{
  value: "system",
  label: "System",
  icon: Monitor
}, {
  value: "light",
  label: "Light",
  icon: Sun
}, {
  value: "dark",
  label: "Dark",
  icon: Moon
}];
export function ThemeToggle() {
  const {
    theme,
    setTheme
  } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  if (!mounted) {
    return <div className="h-8 w-8" />;
  }
  const ActiveIcon = themes.find(t => t.value === theme)?.icon ?? Monitor;
  return <div className="relative" ref={ref}>{<button onClick={() => setOpen(!open)} className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface hover:text-text-primary" aria-label="Toggle theme">{<ActiveIcon size={16} />}</button>}{open && <div className="absolute right-0 top-full mt-2 z-50 w-36 rounded-lg border border-border bg-surface p-1 shadow-lg">{themes.map(({
        value,
        label,
        icon: Icon
      }) => <button onClick={() => {
        setTheme(value);
        setOpen(false);
      }} className={cn("flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors", theme === value ? "text-accent" : "text-text-secondary hover:text-text-primary hover:bg-background")}>{<Icon size={14} />}{label}</button>)}</div>}</div>;
}