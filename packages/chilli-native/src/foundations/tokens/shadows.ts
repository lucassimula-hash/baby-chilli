/**
 * Source CSS structure is asymmetric across light/dark blocks:
 * - `--shadow-color-lighter`: color-only in both blocks. Offset/blur derived.
 * - `--shadow-brand-moderate` and `--shadow-danger-moderate`: full CSS box-shadow
 *   shorthand in the `.dark` block (`0 4px 14px -2px rgba(...)`) — offset/blur/spread
 *   come from the source shorthand and are NOT derived. The light block stores these
 *   as color-only, but we're dark-only in phase 1.
 *
 * Any adjustment for Phase 10 (Button) will only affect `shadows.lighter` — the other
 * two are source-pinned and change only if the source CSS changes.
 */
export type ShadowToken = {
  color: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;
};

export const shadows = {
  lighter: {
    color: 'rgba(0, 0, 0, 0.56)',
    offsetX: 0,
    offsetY: 2,
    blur: 12,
  },
  brandModerate: {
    color: 'rgba(255, 75, 235, 0.2)',
    offsetX: 0,
    offsetY: 4,
    blur: 14,
    spread: -2,
  },
  dangerModerate: {
    color: 'rgba(244, 85, 85, 0.2)',
    offsetX: 0,
    offsetY: 4,
    blur: 14,
    spread: -2,
  },
} as const satisfies Record<string, ShadowToken>;

export type Shadows = typeof shadows;
