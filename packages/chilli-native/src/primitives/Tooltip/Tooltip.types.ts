import type { ReactNode } from 'react';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: ReactNode;
  /** Trigger node. Wrapped in a transparent positioning container — your existing onPress/onLongPress still fire. */
  children: ReactNode;
  side?: TooltipSide;
  sideOffset?: number;
  /** Delay (ms) before showing on hover (web) / long-press threshold (mobile). Default 200. */
  delayDuration?: number;
};
