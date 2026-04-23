import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft, Settings, Upload } from 'lucide-react-native';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { PageNavigationProps, PageNavigationVariant } from './PageNavigation.types';

type SizeConfig = {
  height: number;
  paddingHorizontal: number;
};

const SIZES: Record<PageNavigationVariant, SizeConfig> = {
  mobile: { height: 56, paddingHorizontal: tokens.spacing[6] },
  desktop: { height: 72, paddingHorizontal: tokens.spacing[8] },
};

export function PageNavigation({
  title = 'title',
  border = false,
  scrolled = false,
  onBack,
  showBack = true,
  actions,
  variant = 'mobile',
  style,
}: PageNavigationProps) {
  const cfg = SIZES[variant];
  const showBorder = border && !scrolled;

  return (
    <View
      accessibilityRole="header"
      style={[
        styles.header,
        {
          height: cfg.height,
          paddingHorizontal: cfg.paddingHorizontal,
        },
        showBorder ? styles.border : null,
        style,
      ]}
    >
      {scrolled ? (
        <BlurView
          intensity={20}
          tint="dark"
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View style={styles.leading}>
        {showBack ? (
          <IconButton
            icon={ChevronLeft}
            variant="ghost"
            size="sm"
            onPress={onBack}
            accessibilityLabel="Go back"
          />
        ) : null}
      </View>

      <View style={styles.center}>
        <Text variant="bodyMd" color={tokens.textColors.basePrimary} numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>

      <View style={styles.trailing}>
        {actions ?? (
          <>
            <IconButton icon={Upload} variant="ghost" size="sm" accessibilityLabel="Share" />
            <IconButton icon={Settings} variant="ghost" size="sm" accessibilityLabel="Settings" />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: tokens.borders.default,
  },
  leading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flexShrink: 0,
  },
  title: {
    fontFamily: 'Inter-Medium',
  },
  trailing: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: tokens.spacing[2],
  },
});
