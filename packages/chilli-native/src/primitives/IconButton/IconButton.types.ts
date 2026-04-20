import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { ButtonVariant } from '../Button/Button.types';
import type { IconComponent } from '../Icon/Icon.types';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  variant?: ButtonVariant;
  size?: IconButtonSize;
  glass?: boolean;
  loading?: boolean;
  icon: IconComponent;
  /** Required: this primitive has no visible text, so a label is mandatory. */
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};
