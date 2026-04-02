"use client";

import { useState, Fragment } from "react";
import { Heart, Share2, MoreHorizontal } from "lucide-react";
import { PageNavigation } from "@/components/ui/page-navigation";
import { BreakpointSwitch } from "@/components/ui/breakpoint-switch";
import { IconButton } from "@/components/ui/icon-button";

export function PageNavigationDemo() {
  const [view, setView] = useState("mobile");
  return <div className="flex flex-col gap-4 w-full">{<BreakpointSwitch value={view} onChange={setView} />}{<div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)] transition-all duration-300 ease-in-out" style={{
      width: view === "mobile" ? 375 : "100%",
      maxWidth: "100%"
    }}>{<PageNavigation variant={view} title="Profile" />}{<PageNavigation variant={view} title="Settings" border />}{<PageNavigation variant={view} title="Activity" scrolled />}</div>}</div>;
}
export function PageNavigationStates() {
  const [view, setView] = useState("desktop");
  return <div className="flex flex-col gap-4 w-full">{<BreakpointSwitch value={view} onChange={setView} />}{<div className="flex flex-col gap-4 transition-all duration-300" style={{
      maxWidth: view === "mobile" ? 375 : "100%"
    }}>{<div>{<p className="text-xs text-[var(--text-base-secondary)] mb-1">Default (transparent)</p>}{<div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">{<PageNavigation variant={view} title="Default" />}</div>}</div>}{<div>{<p className="text-xs text-[var(--text-base-secondary)] mb-1">With border</p>}{<div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">{<PageNavigation variant={view} title="With Border" border />}</div>}</div>}{<div>{<p className="text-xs text-[var(--text-base-secondary)] mb-1">Scrolled (opaque background)</p>}{<div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">{<PageNavigation variant={view} title="Scrolled" scrolled />}</div>}</div>}</div>}</div>;
}
export function PageNavigationCustomActions() {
  return <div className="flex flex-col gap-4 w-full max-w-[600px]">{<div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">{<PageNavigation title="Custom Actions" actions={<Fragment>{<IconButton icon={Heart} variant="transparent" size="sm" />}{<IconButton icon={Share2} variant="transparent" size="sm" />}{<IconButton icon={MoreHorizontal} variant="transparent" size="sm" />}</Fragment>} />}</div>}{<div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">{<PageNavigation title="No Back" showBack={false} />}</div>}</div>;
}