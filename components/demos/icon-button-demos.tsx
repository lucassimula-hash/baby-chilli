"use client";

import { X, Plus, Settings, Search, ChevronLeft, Heart } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

export function IconButtonVariants() {
  return <div className="flex flex-wrap items-center gap-3">{<IconButton variant="primary" icon={Plus} />}{<IconButton variant="secondary" icon={Settings} />}{<IconButton variant="transparent" icon={Search} />}</div>;
}
export function IconButtonSizes() {
  return <div className="flex flex-wrap items-center gap-3">{<IconButton size="xsm" icon={X} />}{<IconButton size="sm" icon={X} />}{<IconButton size="md" icon={X} />}{<IconButton size="lg" icon={X} />}</div>;
}
export function IconButtonGlass() {
  return <div className="flex flex-wrap items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-6">{<IconButton variant="primary" glass icon={ChevronLeft} />}{<IconButton variant="secondary" glass icon={Heart} />}</div>;
}
export function IconButtonStates() {
  return <div className="flex flex-wrap items-center gap-3">{<IconButton icon={Plus} />}{<IconButton icon={Plus} disabled />}{<IconButton icon={Plus} loading />}{<IconButton variant="secondary" icon={Settings} />}{<IconButton variant="secondary" icon={Settings} disabled />}{<IconButton variant="secondary" icon={Settings} loading />}{<IconButton variant="transparent" icon={Search} />}{<IconButton variant="transparent" icon={Search} disabled />}{<IconButton variant="transparent" icon={Search} loading />}</div>;
}