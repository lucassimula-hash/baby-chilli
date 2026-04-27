import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type PageNavigationVariant = 'mobile' | 'desktop';

export type PageNavigationProps = {
  title?: string;
  /** Adds a 1px bottom border (only when not scrolled). */
  border?: boolean;
  /** Switches the bg from transparent to elevated. */
  scrolled?: boolean;
  onBack?: () => void;
  /** Hide the leading back button. Default true. */
  showBack?: boolean;
  /** Override the default trailing actions (Upload + Settings IconButtons). */
  actions?: ReactNode;
  variant?: PageNavigationVariant;
  style?: StyleProp<ViewStyle>;
};
