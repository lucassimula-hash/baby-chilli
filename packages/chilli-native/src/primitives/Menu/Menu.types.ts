import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';
import type { DropdownSize } from '../Dropdown';

export type MenuOption = {
  value: string;
  label: string;
  icon?: IconComponent;
};

export type MenuTriggerProps = {
  open: boolean;
  onPress: () => void;
};

export type MenuProps = {
  items: MenuOption[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  /** Render-prop trigger. Receives `open` state and an `onPress` to open the menu. */
  trigger: (props: MenuTriggerProps) => ReactNode;
  size?: DropdownSize;
  /** Optional menu width override on web (default: max(triggerWidth, 240)). */
  menuWidth?: number;
  style?: StyleProp<ViewStyle>;
};
