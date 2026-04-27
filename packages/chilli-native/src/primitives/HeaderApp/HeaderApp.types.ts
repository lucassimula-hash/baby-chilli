import type { ReactNode } from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type HeaderAppType = 'home' | 'notification' | 'search' | 'profile';

export type HeaderAppProps = {
  type?: HeaderAppType;

  /** Home: logo slot (32×32). Pass the brand mark as a React node. */
  logo?: ReactNode;
  /** Home: show the brand-colored dot on the bell icon. Default true. */
  hasNotificationDot?: boolean;
  /** Home: avatar image source. */
  avatarSource?: ImageSourcePropType;
  onBellPress?: () => void;
  onSearchIconPress?: () => void;
  onAvatarPress?: () => void;

  /** Notification / profile / search: back handler. */
  onBackPress?: () => void;
  /** Notification / profile: hide the back button. Default true. */
  showBack?: boolean;

  /** Notification / profile: centered title. */
  title?: string;

  /** Profile: show the trailing settings icon button. Default true. */
  showSettings?: boolean;
  onSettingsPress?: () => void;

  /** Search: placeholder text. Default "search". */
  searchPlaceholder?: string;
  /** Search: called when the search row is tapped (typically navigates to search screen). */
  onSearchPress?: () => void;

  style?: StyleProp<ViewStyle>;
};
