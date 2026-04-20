import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'ghost'
  | 'danger'
  | 'danger-soft';

export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Activates the glass effect (real blur via expo-blur). Ignored on `danger` and `danger-soft`. */
  glass?: boolean;
  /** Replaces leftIcon with an ActivityIndicator. */
  loading?: boolean;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  children?: ReactNode;
  /** Merged last over computed styles. */
  style?: StyleProp<ViewStyle>;
};
