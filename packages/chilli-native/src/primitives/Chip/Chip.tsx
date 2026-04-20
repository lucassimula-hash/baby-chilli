import { forwardRef } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  type View as ViewType,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '../Text';
import { pickStateful, type InteractionState } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { ChipProps, ChipSize, ChipType } from './Chip.types';

const SIZE_HEIGHT: Record<ChipSize, number> = { sm: 20, md: 24, lg: 28, xl: 32 };

const SIZE_PAD_DEFAULT: Record<
  ChipSize,
  { left: number; right: number; vertical: number }
> = {
  sm: { left: 8, right: 8, vertical: 2 },
  md: { left: 8, right: 8, vertical: 4 },
  lg: { left: 12, right: 12, vertical: 4 },
  xl: { left: 16, right: 16, vertical: 6 },
};

const SIZE_PAD_LEADING: Record<
  ChipSize,
  { left: number; right: number; vertical: number }
> = {
  sm: { left: 4, right: 8, vertical: 2 },
  md: { left: 4, right: 8, vertical: 4 },
  lg: { left: 4, right: 12, vertical: 4 },
  xl: { left: 6, right: 16, vertical: 6 },
};

const SIZE_AVATAR: Record<ChipSize, number> = { sm: 16, md: 20, lg: 20, xl: 24 };
const SIZE_ICON: Record<ChipSize, number> = { sm: 16, md: 16, lg: 20, xl: 20 };
const SIZE_REMOVE: Record<ChipSize, number> = { sm: 12, md: 12, lg: 14, xl: 14 };
const SIZE_TEXT: Record<ChipSize, 'bodyXs' | 'bodySm'> = {
  sm: 'bodyXs',
  md: 'bodyXs',
  lg: 'bodySm',
  xl: 'bodySm',
};

const TYPE_BG: Record<
  ChipType,
  { default: string; hover?: string; pressed?: string }
> = {
  fill: {
    default: tokens.backgrounds.neutral.secondary.default,
    hover: tokens.backgrounds.neutral.secondary.hover,
    pressed: tokens.backgrounds.neutral.secondary.pressed,
  },
  light: { default: 'transparent' },
};

export const Chip = forwardRef<ViewType, ChipProps>(function Chip(
  {
    label,
    type = 'fill',
    size = 'md',
    variant = 'default',
    avatarSrc,
    socialIcon,
    onRemove,
    onPress,
    style,
    ...rest
  },
  ref,
) {
  const hasLeading = variant === 'avatar' || variant === 'social';
  const padding = hasLeading ? SIZE_PAD_LEADING[size] : SIZE_PAD_DEFAULT[size];
  const isInteractive = !!onPress || !!onRemove;

  const renderContent = (state: InteractionState) => {
    const bg = isInteractive ? pickStateful(TYPE_BG[type], state) : TYPE_BG[type].default;

    return (
      <View
        style={[
          styles.base,
          {
            height: SIZE_HEIGHT[size],
            paddingLeft: padding.left,
            paddingRight: padding.right,
            paddingVertical: padding.vertical,
            backgroundColor: bg,
            borderColor: type === 'light' ? tokens.borders.default : 'transparent',
            borderWidth: type === 'light' ? 1 : 0,
          },
          style,
        ]}
      >
        {variant === 'avatar' && avatarSrc ? (
          <Image
            source={avatarSrc}
            style={{
              width: SIZE_AVATAR[size],
              height: SIZE_AVATAR[size],
              borderRadius: tokens.radius.full,
            }}
          />
        ) : null}
        {variant === 'social' && socialIcon ? (
          <View
            style={{
              width: SIZE_ICON[size],
              height: SIZE_ICON[size],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {socialIcon}
          </View>
        ) : null}
        <Text variant={SIZE_TEXT[size]}>{label}</Text>
        {onRemove ? (
          <Pressable
            onPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${label}`}
            hitSlop={8}
          >
            <X size={SIZE_REMOVE[size]} color={tokens.textColors.baseSecondary} />
          </Pressable>
        ) : null}
      </View>
    );
  };

  if (!isInteractive) {
    return <View ref={ref}>{renderContent({ pressed: false })}</View>;
  }

  return (
    <Pressable ref={ref} onPress={onPress} accessibilityRole="button" {...rest}>
      {(state) => renderContent(state)}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: tokens.radius.full,
  },
});
