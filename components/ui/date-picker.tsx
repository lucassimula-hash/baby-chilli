"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
export function DatePicker({
  value,
  onChange,
  type = "default",
  minDate,
  maxDate,
  className
}) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value || today);
  const viewMonth = viewDate.getMonth();
  const viewYear = viewDate.getFullYear();
  const prevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
  const calendarDays = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    calendarDays.push({
      day: d,
      inMonth: false,
      date: new Date(viewYear, viewMonth - 1, d)
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({
      day: d,
      inMonth: true,
      date: new Date(viewYear, viewMonth, d)
    });
  }
  const remaining = 42 - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({
      day: d,
      inMonth: false,
      date: new Date(viewYear, viewMonth + 1, d)
    });
  }
  const rows = calendarDays.length > 35 ? 6 : 5;
  const visibleDays = calendarDays.slice(0, rows * 7);
  const isSameDay = (a, b) => a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const isToday = date => isSameDay(date, today);
  const isSelected = date => value ? isSameDay(date, value) : false;
  const isDisabled = date => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };
  return <div className={cn("w-[310px] p-4 rounded-3xl", type === "default" && ["bg-[var(--backgrounds-neutral-primary-default)]", "border border-[var(--borders-default)]"], type === "glass" && ["bg-[rgba(20,15,20,0.8)]", "border border-[rgba(245,245,245,0.08)]", "backdrop-blur-[14px]", "shadow-[0_0_1px_0_rgba(0,0,0,0.1),inset_0_0_0_0.5px_rgba(166,166,166,1)]"], className)}>{<div className="flex items-center justify-between mb-4">{<span className="text-base font-medium text-[var(--text-base-primary)] leading-6">{MONTHS[viewMonth]}</span>}{<div className="flex items-center gap-1">{<button onClick={prevMonth} className="size-8 flex items-center justify-center rounded-lg text-[var(--text-base-primary)] hover:bg-[var(--backgrounds-neutral-secondary-default)] active:bg-[var(--backgrounds-neutral-secondary-default)] transition-colors">{<ChevronLeft size={20} />}</button>}{<button onClick={nextMonth} className="size-8 flex items-center justify-center rounded-lg text-[var(--text-base-primary)] hover:bg-[var(--backgrounds-neutral-secondary-default)] active:bg-[var(--backgrounds-neutral-secondary-default)] transition-colors">{<ChevronRight size={20} />}</button>}</div>}</div>}{<div className="grid grid-cols-7 mb-1">{DAYS.map(day => <div className="text-center text-xs font-normal text-[var(--text-base-secondary)] leading-4 py-1">{day}</div>)}</div>}{<div className="grid grid-cols-7 gap-y-1">{visibleDays.map(({
        day,
        inMonth,
        date
      }, i) => {
        const todayFlag = isToday(date);
        const selected = isSelected(date);
        const disabled = !inMonth || isDisabled(date);
        return <button disabled={disabled} onClick={() => !disabled && onChange?.(date)} className={cn("relative size-10 flex items-center justify-center rounded-full text-base font-normal leading-6 transition-colors duration-100", disabled && "text-[var(--text-disabled)] cursor-default", !disabled && !selected && !todayFlag && "text-[var(--text-base-primary)] hover:bg-[var(--backgrounds-neutral-secondary-default)] active:bg-[var(--backgrounds-neutral-secondary-default)]", todayFlag && !selected && "text-[var(--text-brand-primary)]", selected && "bg-[var(--backgrounds-neutral-secondary-hover)] text-[var(--text-base-primary)]")}>{day}</button>;
      })}</div>}</div>;
}
DatePicker.displayName = "DatePicker";