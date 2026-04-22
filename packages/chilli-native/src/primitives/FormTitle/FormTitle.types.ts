import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type FormTitleProps = Omit<TextInputProps, 'style'> & {
  /** Error message shown below the input. When set, the input gets the danger border / placeholder color. */
  error?: string;
  /** Helper text shown below the input only when an error is present. */
  helperText?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};
