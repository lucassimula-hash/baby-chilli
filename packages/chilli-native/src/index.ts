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

// Primitives
export { Text } from './primitives/Text';
export type { TextProps } from './primitives/Text';
export { Button } from './primitives/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './primitives/Button';

// Remaining primitives — added phase by phase as they land:
// export { Icon } from './primitives/Icon';
// export { IconButton } from './primitives/IconButton';
// export { Badge } from './primitives/Badge';
// export { Chip } from './primitives/Chip';
// export { Avatar } from './primitives/Avatar';
// export { AvatarGroup } from './primitives/AvatarGroup';
// export { AvatarDuo } from './primitives/AvatarDuo';
// export { AvatarLabel } from './primitives/AvatarLabel';
