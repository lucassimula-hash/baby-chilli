"use client";

import { Star, X, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BadgeDefault() {
  return <div className="flex items-center gap-3">{<Badge label="Label" type="fill" />}{<Badge label="Label" type="ghost" />}</div>;
}
export function BadgeSizes() {
  return <div className="flex items-center gap-3">{<Badge label="Small" size="sm" />}{<Badge label="Medium" size="md" />}{<Badge label="Large" size="lg" />}</div>;
}
export function BadgeWithDot() {
  return <div className="flex items-center gap-3">{<Badge label="Active" dot />}{<Badge label="Success" dot dotColor="var(--root-color-success-600)" />}{<Badge label="Warning" dot dotColor="var(--root-color-warning-500)" />}{<Badge label="Error" dot dotColor="var(--root-color-danger-600)" />}</div>;
}
export function BadgeWithIcons() {
  return <div className="flex items-center gap-3">{<Badge label="Featured" leftIcon={<Star size={12} />} />}{<Badge label="Removable" rightIcon={<X size={12} />} />}{<Badge label="+12%" leftIcon={<ArrowUp size={12} />} type="ghost" />}</div>;
}