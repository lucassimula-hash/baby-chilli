"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerDefault() {
  const [date, setDate] = useState(new Date(2024, 10, 12));
  return <div className="flex gap-8 items-start flex-wrap">{<div className="flex flex-col gap-2">{<p className="text-xs text-[var(--text-base-secondary)]">Default</p>}{<DatePicker value={date} onChange={setDate} />}</div>}{<div className="flex flex-col gap-2">{<p className="text-xs text-[var(--text-base-secondary)]">Glass</p>}{<DatePicker value={date} onChange={setDate} type="glass" />}</div>}</div>;
}
export function DatePickerInteractive() {
  const [date, setDate] = useState(undefined);
  return <div className="flex flex-col gap-4 items-start">{<DatePicker value={date} onChange={setDate} />}{<p className="text-sm text-[var(--text-base-secondary)]">Selected: {date ? date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }) : "None"}</p>}</div>;
}
export function DatePickerMinMax() {
  const [date, setDate] = useState(new Date());
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  return <div className="flex flex-col gap-4 items-start">{<p className="text-sm text-[var(--text-base-secondary)]">Only next 30 days selectable</p>}{<DatePicker value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />}</div>;
}