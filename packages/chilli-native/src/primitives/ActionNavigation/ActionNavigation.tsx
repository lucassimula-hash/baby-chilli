import { Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { MoreHorizontal, Upload, X } from 'lucide-react-native';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { ActionNavigationProps, ActionNavigationVariant } from './ActionNavigation.types';

type SizeConfig = {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  trailingGap: number;
};

const SIZES: Record<ActionNavigationVariant, SizeConfig> = {
  mobile: {
    height: 56,
    paddingHorizontal: tokens.spacing[6],
    paddingVertical: tokens.spacing[4],
    trailingGap: tokens.spacing[4],
  },
  desktop: {
    height: 72,
    paddingHorizontal: tokens.spacing[9],
    paddingVertical: tokens.spacing[6],
    trailingGap: tokens.spacing[5],
  },
};

export function ActionNavigation({
  title = 'title',
  border = false,
  scrolled = false,
  onClose,
  showClose = true,
  showButton = false,
  buttonLabel = 'next',
  onButtonClick,
  actions,
  variant = 'mobile',
  style,
}: ActionNavigationProps) {
  const cfg = SIZES[variant];

  return (
    <View
      accessibilityRole="header"
      style={[
        styles.header,
        {
          height: cfg.height,
          paddingHorizontal: cfg.paddingHorizontal,
          paddingVertical: cfg.paddingVertical,
        },
        border ? styles.border : null,
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
        {showClose ? (
          <IconButton
            icon={X}
            variant="secondary"
            size="md"
            onPress={onClose}
            accessibilityLabel="Close"
          />
        ) : null}
      </View>

      <Text variant="bodyMd" color={tokens.textColors.basePrimary} style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.trailing, { gap: cfg.trailingGap }]}>
        {showButton ? (
          <Pressable
            onPress={onButtonClick}
            accessibilityRole="button"
            accessibilityLabel={buttonLabel}
            style={styles.primaryButton}
          >
            <Text variant="bodyMd" color={tokens.textColors.baseAlternate} style={styles.primaryButtonLabel}>
              {buttonLabel}
            </Text>
          </Pressable>
        ) : null}
        {actions ?? (
          <>
            <IconButton icon={Upload} variant="secondary" size="md" accessibilityLabel="Share" />
            <IconButton icon={MoreHorizontal} variant="secondary" size="md" accessibilityLabel="More" />
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
  title: {
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
    textAlign: 'center',
    flexShrink: 0,
  },
  trailing: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  primaryButton: {
    height: 40,
    minWidth: 64,
    paddingHorizontal: tokens.spacing[5],
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.backgrounds.neutral.inverse.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonLabel: {
    fontFamily: 'Inter-Medium',
  },
});
