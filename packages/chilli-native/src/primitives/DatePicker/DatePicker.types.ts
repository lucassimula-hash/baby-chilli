import type { StyleProp, ViewStyle } from 'react-native';

export type DatePickerType = 'default' | 'glass';

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  type?: DatePickerType;
  minDate?: Date;
  maxDate?: Date;
  style?: StyleProp<ViewStyle>;
};
