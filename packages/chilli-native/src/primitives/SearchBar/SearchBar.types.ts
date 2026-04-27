import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type SearchBarProps = Omit<TextInputProps, 'style'> & {
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};
