import type { StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';

export type TabsType = 'underline' | 'pill' | 'segmented';
export type TabsSize = 'sm' | 'md' | 'lg';

export type TabItem = {
  label: string;
  value: string;
  icon?: IconComponent;
  rightIcon?: IconComponent;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  type?: TabsType;
  size?: TabsSize;
  style?: StyleProp<ViewStyle>;
};
