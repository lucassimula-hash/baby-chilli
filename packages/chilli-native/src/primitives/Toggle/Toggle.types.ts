import type { StyleProp, ViewStyle } from 'react-native';

export type ToggleSize = 'sm' | 'md';

export type ToggleProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: ToggleSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};
