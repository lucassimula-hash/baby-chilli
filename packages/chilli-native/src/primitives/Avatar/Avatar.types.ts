import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type AvatarSize = 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | number;

export type AvatarProps = {
  /** Image source. If absent or fails to load, initials are shown. */
  source?: ImageSourcePropType;
  /** Fallback when source is missing or fails. Truncated to first 2 chars. */
  initials?: string;
  /** Pixel diameter. Default: 32. */
  size?: AvatarSize;
  /** Adds a 2px white ring (useful for AvatarGroup overlap). */
  ring?: boolean;
  /** Background color used behind initials. Default: tokens.backgrounds.neutral.tertiary.default. */
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};
