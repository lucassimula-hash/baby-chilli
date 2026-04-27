import type { StyleProp, ViewStyle } from 'react-native';

export type NumberInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  /** Number of digit cells. Default 6. */
  length?: number;
  error?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};
