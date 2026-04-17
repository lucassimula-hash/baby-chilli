import { colors } from './colors';

export const borders = {
  base: colors.black,
  default: 'rgba(245, 245, 245, 0.08)',
  selected: colors.brand[800],
  divider: 'rgba(20, 15, 20, 0.08)',
  disabled: 'rgba(20, 15, 20, 0.03)',
  neutral: {
    default: colors.neutral[800],
    moderate: colors.neutral[700],
    bolder: colors.neutral[600],
  },
  brand: {
    default: colors.brand[800],
    lighter: colors.brand[600],
  },
  danger: {
    default: colors.danger[500],
    lighter: colors.danger[400],
  },
  warning: {
    default: colors.warning[500],
    lighter: colors.warning[400],
  },
  success: {
    default: colors.success[500],
    lighter: colors.success[400],
  },
  glass: {
    lighter: 'rgba(245, 245, 245, 0.06)',
    medium: 'rgba(245, 245, 245, 0.13)',
    strong: 'rgba(245, 245, 245, 0.78)',
  },
} as const;

export type Borders = typeof borders;
