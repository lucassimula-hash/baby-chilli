import { Pressable, StyleSheet, View } from 'react-native';
import { Bell, ChevronLeft, Search, Settings } from 'lucide-react-native';
import { Avatar } from '../Avatar';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { HeaderAppProps } from './HeaderApp.types';

const PADDING_V = tokens.spacing[4];
const PADDING_L = tokens.spacing[6];
const PADDING_R = tokens.spacing[5];
const LOGO_SIZE = 32;
const AVATAR_SIZE = 40;
const ICON_BTN_SIZE = 40;
const GAP = tokens.spacing[4];

export function HeaderApp({
  type = 'home',
  logo,
  hasNotificationDot = true,
  avatarSource,
  onBellPress,
  onSearchIconPress,
  onAvatarPress,
  onBackPress,
  showBack = true,
  title,
  showSettings,
  onSettingsPress,
  searchPlaceholder = 'search',
  onSearchPress,
  style,
}: HeaderAppProps) {
  if (type === 'home') {
    return (
      <View accessibilityRole="header" style={[styles.containerHome, style]}>
        <View style={styles.logoSlot}>{logo ?? null}</View>
        <View style={styles.homeActions}>
          <View style={styles.bellWrap}>
            <IconButton
              icon={Bell}
              variant="ghost"
              size="md"
              onPress={onBellPress}
              accessibilityLabel="Notifications"
            />
            {hasNotificationDot ? <View pointerEvents="none" style={styles.notificationDot} /> : null}
          </View>
          <IconButton
            icon={Search}
            variant="ghost"
            size="md"
            onPress={onSearchIconPress}
            accessibilityLabel="Search"
          />
          {avatarSource ? (
            <Pressable
              onPress={onAvatarPress}
              accessibilityRole="button"
              accessibilityLabel="Profile"
              style={styles.avatarPressable}
            >
              <Avatar source={avatarSource} size={AVATAR_SIZE} />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  if (type === 'search') {
    return (
      <View accessibilityRole="header" style={[styles.containerSearch, style]}>
        <Pressable
          onPress={onSearchPress}
          accessibilityRole="search"
          accessibilityLabel={searchPlaceholder}
          style={[styles.searchBar, shadow(tokens.shadows.brandModerate)]}
        >
          <ChevronLeft size={20} color={tokens.textColors.basePrimary} />
          <Text variant="bodyMd" color={tokens.textColors.baseSecondary}>
            {searchPlaceholder}
          </Text>
        </Pressable>
      </View>
    );
  }

  // notification or profile
  const isProfile = type === 'profile';
  const shouldShowSettings = showSettings ?? isProfile;

  return (
    <View accessibilityRole="header" style={[styles.containerBack, style]}>
      <View style={styles.backRow}>
        {showBack ? (
          <IconButton
            icon={ChevronLeft}
            variant="ghost"
            size="md"
            onPress={onBackPress}
            accessibilityLabel="Go back"
          />
        ) : (
          <View style={styles.iconSpacer} />
        )}
        <Text
          variant="bodyMd"
          color={tokens.textColors.basePrimary}
          numberOfLines={1}
          style={styles.title}
        >
          {title}
        </Text>
        {shouldShowSettings ? (
          <IconButton
            icon={Settings}
            variant="ghost"
            size="md"
            onPress={onSettingsPress}
            accessibilityLabel="Settings"
          />
        ) : (
          <View style={styles.iconSpacer} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    width: '100%',
    paddingVertical: PADDING_V,
    paddingLeft: PADDING_L,
    paddingRight: PADDING_R,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerBack: {
    width: '100%',
    paddingVertical: PADDING_V,
    paddingLeft: PADDING_L,
    paddingRight: PADDING_R,
  },
  containerSearch: {
    width: '100%',
    paddingVertical: PADDING_V,
    paddingHorizontal: PADDING_L,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSlot: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  homeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP,
  },
  bellWrap: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    left: 21,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: tokens.borders.default,
    backgroundColor: tokens.backgrounds.brand.strong.default,
  },
  avatarPressable: {
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: tokens.borders.default,
  },
  backRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
  },
  iconSpacer: {
    width: ICON_BTN_SIZE,
    height: ICON_BTN_SIZE,
  },
  searchBar: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
    paddingLeft: tokens.spacing[4],
    paddingRight: tokens.spacing[5],
    paddingVertical: tokens.spacing[4],
    borderRadius: tokens.radius[6],
    borderWidth: 1,
    borderColor: tokens.borders.brand.default,
    backgroundColor: tokens.backgrounds.neutral.primary.default,
  },
});
