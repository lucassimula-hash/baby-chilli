export const spacing = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 20,
  8: 24,
  9: 32,
  10: 40,
  11: 48,
  12: 64,
  13: 80,
  14: 96,
  15: 160,
  16: 260,
} as const;

export type Spacing = typeof spacing;
