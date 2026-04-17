export const radius = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 24,
  8: 32,
  full: 9999,
} as const;

export type Radius = typeof radius;
