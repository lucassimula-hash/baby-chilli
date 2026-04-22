import type { StyleProp, ViewStyle } from 'react-native';

export type RadioSize = 'sm' | 'md';
export type RadioOrientation = 'vertical' | 'horizontal';

export type RadioProps = {
  value?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: RadioSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export type RadioGroupProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: RadioOrientation;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
