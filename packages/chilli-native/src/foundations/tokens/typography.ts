import type { TextStyle } from 'react-native';

export const fontSize = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
} as const;

export const lineHeight = {
  '2xs': 14,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 46,
  '5xl': 54,
  '6xl': 66,
  '7xl': 78,
  '8xl': 106,
  '9xl': 136,
} as const;

export const letterSpacing = {
  xs: -2,
  sm: -1,
  md: 0,
  lg: 1,
  xl: 2,
} as const;

export const fontFamily = {
  primary: 'SF Pro Display',
  secondary: 'Inter',
} as const;

/**
 * Pre-baked text styles. Derived/interpreted from observed usage in `chilli-docs/components/`.
 * NOT a 1:1 mirror of source CSS variables — see CHANGELOG and spec section 6.5.
 *
 * Two-layer convention for fonts:
 * - `fontFamily.secondary = 'Inter'` is a DESIGN TOKEN (mirror of source `--font-family-secondary`).
 *   Preserved as-is for source fidelity but not consumed directly here.
 * - `textStyles.fontFamily` values below are RUNTIME family names registered by `expo-font`
 *   (per-weight keys: `'Inter-Medium'`, etc.) — matching the main chilli app's registration in
 *   `hub/src/components/custom_text/inter.tsx`. The runtime layer is necessarily weight-explicit
 *   because `expo-font` resolves family names by exact key, with no automatic weight mapping.
 *
 * Initial set covers body sizes used by the phase 1 primitives. Headings are added when a
 * primitive (or playground assembly) requires them.
 */
export const textStyles = {
  bodyXs: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontFamily: 'Inter-Regular',
    letterSpacing: letterSpacing.md,
  },
  bodySm: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontFamily: 'Inter-Regular',
    letterSpacing: letterSpacing.md,
  },
  bodyMd: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontFamily: 'Inter-Regular',
    letterSpacing: letterSpacing.md,
  },
} as const satisfies Record<string, TextStyle>;

export type FontSize = typeof fontSize;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
export type FontFamily = typeof fontFamily;
export type TextStyles = typeof textStyles;
export type TextStyleVariant = keyof typeof textStyles;
