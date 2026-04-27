import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ActionNavigationVariant = 'mobile' | 'desktop';

export type ActionNavigationProps = {
  title?: string;
  /** Adds a 1px bottom border. */
  border?: boolean;
  /** Visual hint for "page has been scrolled" — currently a slight bg overlay since real backdrop-blur is unreliable cross-platform. */
  scrolled?: boolean;
  onClose?: () => void;
  /** Hide the leading close button. Default true. */
  showClose?: boolean;
  /** Show the trailing primary pill button. Default false. */
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  /** Override the default trailing actions (Upload + MoreHorizontal IconButtons). */
  actions?: ReactNode;
  variant?: ActionNavigationVariant;
  style?: StyleProp<ViewStyle>;
};
