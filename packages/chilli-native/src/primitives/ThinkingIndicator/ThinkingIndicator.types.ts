import type { StyleProp, ViewStyle } from 'react-native';

export type ThinkingIndicatorProps = {
  /** Words cycled through. Default: ["Thinking", "Moonwalking", "Planning", "Refining"]. */
  words?: string[];
  /** Time per word in ms. Default 4000. */
  interval?: number;
  style?: StyleProp<ViewStyle>;
};
