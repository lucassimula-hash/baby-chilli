"use client";

import { useState, useRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const NumberInput = forwardRef(({
  length = 4,
  value = "",
  onChange,
  error = false,
  disabled = false,
  className
}, ref) => {
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const digits = value.split("").slice(0, length);
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = digits.slice();
      if (digits[index]) {
        newValue[index] = "";
      } else if (index > 0) {
        newValue[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      onChange?.(newValue.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleInput = (index, e) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;
    const newValue = digits.slice();
    while (newValue.length <= index) newValue.push("");
    newValue[index] = char;
    onChange?.(newValue.join(""));
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handlePaste = e => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange?.(pasted);
    const nextIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };
  return <div ref={ref} className={cn("flex items-center gap-2", className)}>{Array.from({
      length
    }).map((_, i) => {
      const digit = digits[i];
      const isFocused = focusedIndex === i;
      const state = disabled ? "disabled" : error && digit ? "error" : isFocused ? "focused" : digit ? "filled" : "default";
      return <div className="relative">{<input ref={el => {
          inputRefs.current[i] = el;
        }} type="text" inputMode="numeric" maxLength={1} value={digit || ""} disabled={disabled} className="absolute inset-0 opacity-0 cursor-pointer" onFocus={() => setFocusedIndex(i)} onBlur={() => setFocusedIndex(null)} onChange={e => handleInput(i, e)} onKeyDown={e => handleKeyDown(i, e)} onPaste={handlePaste} />}{<div className={cn("flex flex-col items-center justify-center w-[34px] h-[56px] rounded-xl p-2 border transition-all duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]", "text-2xl font-medium leading-8 tracking-[-1px] text-center", state === "default" && "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-default)]", state === "focused" && "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-brand-default)] shadow-[0_0_0_2px_var(--shadow-brand-moderate)]", state === "filled" && "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-default)] text-[var(--text-base-primary)]", state === "error" && "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-default)] text-[var(--text-danger-primary)]", state === "disabled" && "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)] opacity-50 cursor-not-allowed")}>{digit ? <span>{digit}</span> : <span className={cn("size-2 rounded-full", isFocused ? "bg-[var(--text-base-primary)] animate-pulse" : "bg-[var(--text-base-secondary)]")} />}</div>}</div>;
    })}</div>;
});
NumberInput.displayName = "NumberInput";