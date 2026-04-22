import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type ActionTextareaProps = Omit<TextInputProps, 'style'> & {
  /** Prompt label rendered above the input. Default: "what's your strategy? how will you turn challenges into opportunities?" */
  prompt?: string;
  error?: boolean;
  glass?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};
