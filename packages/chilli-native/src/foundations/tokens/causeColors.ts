export const causeColors = {
  'neon-pink': { lighter: 'rgba(224, 32, 85, 0.2)', strong: '#ffd6e1' },
  'bright-pink': { lighter: 'rgba(208, 33, 133, 0.2)', strong: '#ffdbf0' },
  'electric-magenta': { lighter: 'rgba(192, 16, 232, 0.2)', strong: '#f4c4ff' },
  purple: { lighter: 'rgba(123, 31, 255, 0.2)', strong: '#d5b8ff' },
  'ultra-blue': { lighter: 'rgba(63, 48, 255, 0.2)', strong: '#63a7ff' },
  blue: { lighter: 'rgba(1, 96, 204, 0.2)', strong: '#33b4ff' },
  'cyan-blue': { lighter: 'rgba(0, 134, 196, 0.2)', strong: '#33beff' },
  'liquid-blue': { lighter: 'rgba(0, 150, 224, 0.2)', strong: '#4dc4ff' },
  'bright-cyan': { lighter: 'rgba(4, 144, 163, 0.2)', strong: '#06e1ff' },
  'caribbean-green': { lighter: 'rgba(1, 153, 102, 0.2)', strong: '#02ffaa' },
  'lime-green': { lighter: 'rgba(0, 167, 56, 0.2)', strong: '#00ff56' },
  lime: { lighter: 'rgba(83, 164, 0, 0.2)', strong: '#81ff00' },
  yellow: { lighter: 'rgba(196, 138, 0, 0.2)', strong: '#ffc333' },
  'amber-orange': { lighter: 'rgba(204, 118, 0, 0.2)', strong: '#ffa933' },
  orange: { lighter: 'rgba(204, 78, 0, 0.2)', strong: '#ff8133' },
  red: { lighter: 'rgba(208, 32, 46, 0.2)', strong: '#ff6672' },
  'antique-gold': { lighter: 'rgba(163, 130, 56, 0.2)', strong: '#ffc033' },
  'desert-orange': { lighter: 'rgba(160, 102, 54, 0.2)', strong: '#ff8f33' },
  'midnight-blue': { lighter: 'rgba(4, 81, 154, 0.2)', strong: '#54acff' },
  grey: { lighter: 'rgba(245, 245, 245, 0.02)', strong: '#ffffff' },
} as const;

export type CauseColor = keyof typeof causeColors;
export type CauseColors = typeof causeColors;
