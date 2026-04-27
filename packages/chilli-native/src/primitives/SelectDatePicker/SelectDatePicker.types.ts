import type { StyleProp, ViewStyle } from 'react-native';

export type SelectDatePickerProps = {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  helperText?: string;
  showHelperText?: boolean;
  focused?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};
