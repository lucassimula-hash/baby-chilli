export const borderWidth = {
  0: 0,
  1: 0.5,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 6,
  7: 8,
} as const;

export type BorderWidth = typeof borderWidth;
