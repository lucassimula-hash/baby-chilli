"use client";

import { createContext, useContext } from "react";

const PreviewControlsSlotContext = createContext<string | null>(null);

export function PreviewControlsSlotProvider({
  slotId,
  children,
}: {
  slotId: string;
  children: React.ReactNode;
}) {
  return (
    <PreviewControlsSlotContext.Provider value={slotId}>
      {children}
    </PreviewControlsSlotContext.Provider>
  );
}

export function usePreviewControlsSlot() {
  return useContext(PreviewControlsSlotContext);
}

