import { colors } from './colors';

export const backgrounds = {
  base: colors.black,
  elevated: colors.black,
  selected: colors.brand[950],
  fixed: colors.neutral[900],
  disabled: 'rgba(245, 245, 245, 0.08)',

  neutral: {
    primary: {
      default: colors.neutral[900],
      hover: colors.neutral[800],
      pressed: colors.neutral[800],
    },
    secondary: {
      default: colors.neutral[850],
      hover: colors.neutral[800],
      pressed: colors.neutral[800],
    },
    tertiary: {
      default: colors.neutral[700],
      hover: colors.neutral[600],
      pressed: colors.neutral[600],
    },
    inverse: {
      default: colors.neutral[50],
      hover: colors.neutral[300],
      pressed: colors.neutral[300],
    },
    glass: {
      default: 'rgba(245, 245, 245, 0.78)',
      hover: 'rgba(245, 245, 245, 0.55)',
      pressed: 'rgba(245, 245, 245, 0.78)',
    },
    opacity: {
      faint: 'rgba(245, 245, 245, 0.06)',
      lighter: 'rgba(245, 245, 245, 0.08)',
      medium: 'rgba(245, 245, 245, 0.13)',
      moderate: 'rgba(245, 245, 245, 0.34)',
      bolder: 'rgba(245, 245, 245, 0.55)',
      strong: 'rgba(245, 245, 245, 0.78)',
    },
  },

  brand: {
    lighter: {
      default: 'rgba(255, 75, 235, 0.08)',
      hover: 'rgba(255, 75, 235, 0.13)',
      pressed: 'rgba(255, 75, 235, 0.13)',
    },
    strong: {
      default: colors.brand[800],
      hover: colors.brand[900],
      pressed: colors.brand[900],
    },
  },

  danger: {
    lighter: {
      default: colors.danger[900],
      hover: colors.danger[800],
      pressed: colors.danger[800],
    },
    strong: {
      default: colors.danger[600],
      hover: colors.danger[600],
      pressed: colors.danger[600],
    },
  },

  success: {
    lighter: {
      default: colors.success[900],
      hover: colors.success[800],
      pressed: colors.success[800],
    },
    strong: {
      default: colors.success[500],
      hover: colors.success[600],
      pressed: colors.success[600],
    },
  },

  warning: {
    lighter: {
      default: colors.warning[900],
      hover: colors.warning[800],
      pressed: colors.warning[800],
    },
    strong: {
      default: colors.warning[500],
      hover: colors.warning[600],
      pressed: colors.warning[600],
    },
  },

  other: {
    neonPink:        { lighter: 'rgba(224, 32, 85, 0.2)',   strong: '#ffd6e1' },
    brightPink:      { lighter: 'rgba(208, 33, 133, 0.2)',  strong: '#ffdbf0' },
    electricMagenta: { lighter: 'rgba(192, 16, 232, 0.2)',  strong: '#f4c4ff' },
    purple:          { lighter: 'rgba(123, 31, 255, 0.2)',  strong: '#d5b8ff' },
    ultraBlue:       { lighter: 'rgba(63, 48, 255, 0.2)',   strong: '#63a7ff' },
    blue:            { lighter: 'rgba(1, 96, 204, 0.2)',    strong: '#33b4ff' },
    cyanBlue:        { lighter: 'rgba(0, 134, 196, 0.2)',   strong: '#33beff' },
    liquidBlue:      { lighter: 'rgba(0, 150, 224, 0.2)',   strong: '#4dc4ff' },
    brightCyan:      { lighter: 'rgba(4, 144, 163, 0.2)',   strong: '#06e1ff' },
    caribbeanGreen:  { lighter: 'rgba(1, 153, 102, 0.2)',   strong: '#02ffaa' },
    limeGreen:       { lighter: 'rgba(0, 167, 56, 0.2)',    strong: '#00ff56' },
    lime:            { lighter: 'rgba(83, 164, 0, 0.2)',    strong: '#81ff00' },
    yellow:          { lighter: 'rgba(196, 138, 0, 0.2)',   strong: '#ffc333' },
    amberOrange:     { lighter: 'rgba(204, 118, 0, 0.2)',   strong: '#ffa933' },
    orange:          { lighter: 'rgba(204, 78, 0, 0.2)',    strong: '#ff8133' },
    red:             { lighter: 'rgba(208, 32, 46, 0.2)',   strong: '#ff6672' },
    antiqueGold:     { lighter: 'rgba(163, 130, 56, 0.2)',  strong: '#ffc033' },
    desertOrange:    { lighter: 'rgba(160, 102, 54, 0.2)',  strong: '#ff8f33' },
    grey:            { lighter: 'rgba(245, 245, 245, 0.02)', strong: '#ffffff' },
    midnightBlue:    { lighter: 'rgba(4, 81, 154, 0.2)',    strong: '#54acff' },
  },
} as const;

export type Backgrounds = typeof backgrounds;
