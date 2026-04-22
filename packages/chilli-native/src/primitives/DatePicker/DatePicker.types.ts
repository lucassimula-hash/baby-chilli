import type { StyleProp, ViewStyle } from 'react-native';

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  style?: StyleProp<ViewStyle>;
};
