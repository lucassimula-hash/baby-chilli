"use client";

import { useState } from "react";
import { ActionNavigation } from "@/components/ui/action-navigation";
import { BreakpointSwitch } from "@/components/ui/breakpoint-switch";

export function ActionNavigationDemo() {
  const [view, setView] = useState<string>("mobile");
  return (
    <div className="flex flex-col gap-4 w-full">
      <BreakpointSwitch value={view} onChange={setView} />
      <div
        className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)] transition-all duration-300 ease-in-out"
        style={{
          width: view === "mobile" ? 375 : "100%",
          maxWidth: "100%",
        }}
      >
        <ActionNavigation variant={view as "mobile" | "desktop"} title="Create" />
        <ActionNavigation variant={view as "mobile" | "desktop"} title="Edit" border />
        <ActionNavigation variant={view as "mobile" | "desktop"} title="Preview" scrolled border />
      </div>
    </div>
  );
}

export function ActionNavigationStates() {
  const [view, setView] = useState<string>("desktop");
  return (
    <div className="flex flex-col gap-4 w-full">
      <BreakpointSwitch value={view} onChange={setView} />
      <div
        className="flex flex-col gap-4 transition-all duration-300"
        style={{ maxWidth: view === "mobile" ? 375 : "100%" }}
      >
        <div>
          <p className="text-xs text-[var(--text-base-secondary)] mb-1">Default</p>
          <div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">
            <ActionNavigation variant={view as "mobile" | "desktop"} title="Default" />
          </div>
        </div>
        <div>
          <p className="text-xs text-[var(--text-base-secondary)] mb-1">With border</p>
          <div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">
            <ActionNavigation variant={view as "mobile" | "desktop"} title="With Border" border />
          </div>
        </div>
        <div>
          <p className="text-xs text-[var(--text-base-secondary)] mb-1">Scrolled</p>
          <div className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)]">
            <ActionNavigation variant={view as "mobile" | "desktop"} title="Scrolled" scrolled border />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionNavigationWithButton() {
  const [view, setView] = useState<string>("mobile");
  return (
    <div className="flex flex-col gap-4 w-full">
      <BreakpointSwitch value={view} onChange={setView} />
      <div
        className="border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)] transition-all duration-300 ease-in-out"
        style={{
          width: view === "mobile" ? 375 : "100%",
          maxWidth: "100%",
        }}
      >
        <ActionNavigation
          variant={view as "mobile" | "desktop"}
          title="New Action"
          showButton
          buttonLabel="next"
        />
      </div>
    </div>
  );
}
