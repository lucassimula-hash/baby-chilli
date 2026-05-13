"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { usePreviewControlsSlot } from "@/components/docs/preview-controls-context";

type BreakpointValue = "mobile" | "desktop";

export function BreakpointSwitch({
  value,
  onChange,
}: {
  value: BreakpointValue;
  onChange: (value: BreakpointValue) => void;
}) {
  const slotId = usePreviewControlsSlot();
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!slotId) {
      setTarget(null);
      return;
    }
    setTarget(document.getElementById(slotId));
  }, [slotId]);

  const switchNode = (
    <div className="ml-auto self-end" data-breakpoint-switch>
      <div className="relative inline-grid grid-cols-2 rounded-full border border-[var(--borders-default)] bg-[var(--backgrounds-base)] p-1 shadow-[0_2px_8px_rgba(20,15,20,0.08)]">
        <span
          className={cn(
            "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[var(--backgrounds-neutral-secondary-default)] transition-transform duration-200 ease-out",
            value === "desktop" && "translate-x-full"
          )}
        />

        <button
          onClick={() => onChange("mobile")}
          className={cn(
            "relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            value === "mobile"
              ? "text-[var(--text-base-primary)]"
              : "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)]"
          )}
        >
          Mobile
        </button>

        <button
          onClick={() => onChange("desktop")}
          className={cn(
            "relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            value === "desktop"
              ? "text-[var(--text-base-primary)]"
              : "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)]"
          )}
        >
          Desktop
        </button>
      </div>
    </div>
  );

  if (target) {
    return createPortal(switchNode, target);
  }

  return switchNode;
}

BreakpointSwitch.displayName = "BreakpointSwitch";
