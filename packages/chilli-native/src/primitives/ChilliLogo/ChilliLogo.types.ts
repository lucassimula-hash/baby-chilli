import type { StyleProp, ViewStyle } from 'react-native';
import type { ChilliLogoColor, ChilliLogoType } from './paths';

export type { ChilliLogoColor, ChilliLogoType };

export type ChilliLogoProps = {
  /** Logo variant. `symbol` (round mark, default), `favicon` (simplified mark), or `logo` (full mark with wordmark). */
  type?: ChilliLogoType;
  /** Fill color. Default `brand`. */
  color?: ChilliLogoColor;
  /** Pixel size of the longest dimension. Aspect ratio preserved. Default 32. */
  size?: number;
  /** Override the fill with an arbitrary color (takes precedence over `color`). */
  fill?: string;
  style?: StyleProp<ViewStyle>;
};
