import { colors } from './colors';

export const textColors = {
  basePrimary: colors.neutral[50],
  baseSecondary: colors.neutral[400],
  baseAlternate: colors.neutral[950],
  baseDisabled: colors.neutral[500],
  baseLink: colors.link[500],
  baseLinkFocus: colors.link[400],
  selected: colors.brand[800],
  disabled: 'rgba(245, 245, 245, 0.08)',
  fixed: colors.white,
  inverse: colors.neutral[950],
  brandPrimary: colors.brand[800],
  brandSecondary: colors.brand[600],
  dangerPrimary: colors.danger[600],
  dangerSecondary: colors.danger[400],
  warningPrimary: colors.warning[500],
  warningSecondary: colors.warning[400],
  successPrimary: colors.success[500],
  successSecondary: colors.success[400],
  glassPrimary: 'rgba(245, 245, 245, 0.78)',
  glassSubtle: 'rgba(245, 245, 245, 0.34)',
} as const;

export type TextColors = typeof textColors;
