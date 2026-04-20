import { colors } from './colors';

export const buttons = {
  primary: {
    bg: colors.neutral[50],
    bgHover: colors.neutral[300],
    bgPressed: colors.neutral[300],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[950],
  },
  secondary: {
    bg: colors.neutral[850],
    bgHover: colors.neutral[800],
    bgPressed: colors.neutral[800],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[50],
  },
  brand: {
    bg: colors.brand[800],
    bgHover: colors.brand[900],
    bgPressed: colors.brand[900],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[50],
  },
  destructive: {
    bg: colors.danger[600],
    bgHover: colors.danger[600],
    bgPressed: colors.danger[600],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.white,
  },
  destructiveSecondary: {
    bg: 'rgba(240, 68, 56, 0.12)',
    bgHover: 'rgba(240, 68, 56, 0.2)',
    bgPressed: 'rgba(240, 68, 56, 0.2)',
    text: colors.danger[500],
  },
  glass: {
    primary: {
      bg: 'rgba(255, 75, 235, 0.89)',
      bgHover: 'rgba(255, 75, 235, 0.89)',
      bgPressed: 'rgba(255, 75, 235, 0.89)',
    },
    secondary: {
      bg: 'rgba(245, 245, 245, 0.06)',
      bgHover: 'rgba(245, 245, 245, 0.12)',
      bgPressed: 'rgba(245, 245, 245, 0.12)',
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'rgba(245, 245, 245, 0.06)',
      text: colors.neutral[50],
    },
  },
  disabled: {
    bg: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[600],
  },
} as const;

export type Buttons = typeof buttons;
