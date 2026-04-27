import type { StyleProp, ViewStyle } from 'react-native';
import type { FlagCode } from './flags.generated';

export type { FlagCode } from './flags.generated';

export type FlagIconProps = {
  code: FlagCode;
  /** Pixel size (square). Default: 24. */
  size?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};
