import type { ImageSourcePropType, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';

export type ActionInputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: IconComponent;
  /** `null` disables the right-side icon entirely. Omit to get the default ChevronRight. */
  rightIcon?: IconComponent | null;
  showAvatar?: boolean;
  avatarSrc?: ImageSourcePropType;
  showToggle?: boolean;
  toggleChecked?: boolean;
  onToggleChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};
