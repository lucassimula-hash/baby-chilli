import type { ReactNode } from 'react';
import type {
  ImageSourcePropType,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type ChipType = 'fill' | 'light';
export type ChipSize = 'sm' | 'md' | 'lg' | 'xl';
export type ChipVariant = 'default' | 'avatar' | 'social';

export type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  type?: ChipType;
  size?: ChipSize;
  variant?: ChipVariant;
  /** Used when variant === 'avatar'. */
  avatarSrc?: ImageSourcePropType;
  /** Used when variant === 'social'. Any node — typically an Icon. */
  socialIcon?: ReactNode;
  /** When provided, renders a trailing close button. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
};
