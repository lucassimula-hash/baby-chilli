"use client";

import { useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarDefault() {
  return <div className="flex flex-col gap-6 w-full max-w-[400px]">{<ProgressBar value={0} />}{<ProgressBar value={20} />}{<ProgressBar value={40} />}{<ProgressBar value={60} />}{<ProgressBar value={80} />}{<ProgressBar value={100} />}</div>;
}
export function ProgressBarSizes() {
  return <div className="flex flex-col gap-6 w-full max-w-[400px]">{<div>{<p className="text-sm text-[var(--text-base-secondary)] mb-2">Small (4px)</p>}{<ProgressBar value={60} size="sm" />}</div>}{<div>{<p className="text-sm text-[var(--text-base-secondary)] mb-2">Medium (8px)</p>}{<ProgressBar value={60} size="md" />}</div>}</div>;
}
export function ProgressBarWithLabel() {
  return <div className="flex flex-col gap-6 w-full max-w-[400px]">{<ProgressBar value={20} labelPosition="right" />}{<ProgressBar value={60} labelPosition="right" />}{<ProgressBar value={100} labelPosition="right" />}{<ProgressBar value={40} labelPosition="bottom" />}{<ProgressBar value={80} labelPosition="bottom" />}</div>;
}
export function ProgressBarInteractive() {
  const [value, setValue] = useState(40);
  return <div className="flex flex-col gap-4 w-full max-w-[400px]">{<ProgressBar value={value} labelPosition="right" />}{<input type="range" min={0} max={100} step={20} value={value} onChange={e => setValue(Number(e.target.value))} className="w-full accent-[var(--backgrounds-brand-strong-default)]" />}</div>;
}