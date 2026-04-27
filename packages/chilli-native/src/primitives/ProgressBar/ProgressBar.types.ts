import type { StyleProp, ViewStyle } from 'react-native';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarLabelPosition = 'none' | 'right' | 'bottom';

export type ProgressBarProps = {
  /** Progress value, clamped to [0, 100]. */
  value?: number;
  /** Number of discrete segments. Default 5. */
  segments?: number;
  size?: ProgressBarSize;
  labelPosition?: ProgressBarLabelPosition;
  /** Custom label formatter. Defaults to `${value}%`. */
  formatLabel?: (value: number) => string;
  style?: StyleProp<ViewStyle>;
};
