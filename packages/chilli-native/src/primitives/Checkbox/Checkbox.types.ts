import type { StyleProp, ViewStyle } from 'react-native';

export type CheckboxSize = 'sm' | 'md';

export type CheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  /** When provided, renders as a numbered badge (1-9) instead of a checkmark. */
  number?: number;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};
