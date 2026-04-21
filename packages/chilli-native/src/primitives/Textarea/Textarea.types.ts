import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { InputActionButton } from '../Input/Input.types';

export type TextareaProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  helperText?: string;
  error?: string;
  actionButton?: InputActionButton;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};
