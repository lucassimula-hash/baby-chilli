// Foundations
export { tokens } from './foundations/theme';
export type { Tokens } from './foundations/theme';

// Re-export individual token groups for convenience
export {
  colors,
  spacing,
  radius,
  borderWidth,
  size,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
  backgrounds,
  textColors,
  borders,
  iconColors,
  buttons,
  links,
  shadows,
} from './foundations/tokens';

export type {
  Colors,
  Spacing,
  Radius,
  BorderWidth,
  Size,
  FontSize,
  LineHeight,
  LetterSpacing,
  FontFamily,
  TextStyles,
  TextStyleVariant,
  Backgrounds,
  TextColors,
  Borders,
  IconColors,
  Buttons,
  Links,
  Shadows,
  ShadowToken,
} from './foundations/tokens';

// Platform helpers
export { resolveStateSlot, pickStateful, shadow } from './foundations/platform';
export type { InteractionState, StateSlot } from './foundations/platform';

// Fonts
export { useLoadChilliFonts, fontAssets } from './foundations/fonts';

// Primitives — added phase by phase as they land:
// export { Text } from './primitives/Text';
// export { Button } from './primitives/Button';
// ... etc.
