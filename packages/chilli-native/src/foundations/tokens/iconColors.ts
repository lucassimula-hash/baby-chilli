import { colors } from './colors';

export const iconColors = {
  neutralPrimary: colors.neutral[50],
  neutralSecondary: colors.neutral[400],
  neutralAlternate: colors.neutral[950],
  neutralDisabled: colors.neutral[600],
  brandPrimary: colors.brand[800],
  brandSecondary: colors.brand[600],
  dangerPrimary: colors.danger[600],
  dangerSecondary: colors.danger[400],
  warningPrimary: colors.warning[500],
  warningSecondary: colors.warning[400],
  successPrimary: colors.success[500],
  successSecondary: colors.success[400],
  linkDefault: colors.link[500],
  linkHover: colors.link[600],
  glassPrimary: 'rgba(245, 245, 245, 0.78)',
  glassSubtle: 'rgba(245, 245, 245, 0.34)',
} as const;

export type IconColors = typeof iconColors;
