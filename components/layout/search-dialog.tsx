"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { components } from "@/lib/registry";

export function SearchDialog({
  open,
  onClose
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();
  const results = query.trim() ? components.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase())) : components;
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Small delay to ensure the dialog is rendered
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].slug);
    } else if (e.key === "Escape") {
      onClose();
    }
  }
  function navigate(slug) {
    router.push(`/docs/${slug}`);
    onClose();
  }
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">{<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />}{<div className="relative z-10 w-full max-w-lg mx-4 overflow-hidden rounded-xl border border-border bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">{<div className="flex items-center gap-3 border-b border-border px-4 py-3">{<Search size={16} className="shrink-0 text-text-secondary" />}{<input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search components..." className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary" />}{<kbd className="shrink-0 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">ESC</kbd>}</div>}{<div className="max-h-[320px] overflow-y-auto p-2">{results.length === 0 ? <div className="px-3 py-8 text-center text-sm text-text-secondary">No components found for “{query}”</div> : <ul>{results.map((component, index) => <li>{<button onClick={() => navigate(component.slug)} onMouseEnter={() => setSelectedIndex(index)} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors", selectedIndex === index ? "bg-accent-soft" : "hover:bg-surface")}>{<div>{<p className={cn("text-sm font-medium", selectedIndex === index ? "text-accent" : "text-text-primary")}>{component.name}</p>}{<p className="mt-0.5 text-xs text-text-secondary line-clamp-1">{component.description}</p>}</div>}{selectedIndex === index && <ArrowRight size={14} className="shrink-0 text-accent" />}</button>}</li>)}</ul>}</div>}</div>}</div>;
}