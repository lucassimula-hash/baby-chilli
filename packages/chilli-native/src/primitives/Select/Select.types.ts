import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';

export type SelectSize = 'sm' | 'md';
export type SelectVariant = 'default' | 'avatar' | 'borderless';

export type SelectOption = {
  value: string;
  label: string;
  icon?: IconComponent;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  avatarSrc?: ImageSourcePropType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};
