import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type SocialProvider = 'apple' | 'google' | 'facebook' | 'apple-pay';
export type SocialButtonVariant = 'primary' | 'secondary';

export type SocialButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  provider: SocialProvider;
  /** Defaults: apple / apple-pay → 'primary'; google / facebook → 'secondary'. */
  variant?: SocialButtonVariant;
  /** Override default label. */
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
