import { useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import { Menu } from '../Menu';
import type { SelectProps, SelectSize, SelectVariant } from './Select.types';

type SizeConfig = {
  height: number;
  paddingHorizontal: number;
  gap: number;
  fontSize: number;
  lineHeight: number;
  chevronSize: number;
  avatarSize: number;
  avatarMarginLeft: number;
  labelPaddingHorizontal: number;
};

const SIZES: Record<SelectSize, SizeConfig> = {
  sm: {
    height: 32,
    paddingHorizontal: tokens.spacing[4],
    gap: tokens.spacing[1],
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.sm,
    chevronSize: 16,
    avatarSize: 20,
    avatarMarginLeft: 1,
    labelPaddingHorizontal: 1,
  },
  md: {
    height: 40,
    paddingHorizontal: tokens.spacing[5],
    gap: tokens.spacing[2],
    fontSize: tokens.fontSize.md,
    lineHeight: tokens.lineHeight.md,
    chevronSize: 20,
    avatarSize: 24,
    avatarMarginLeft: tokens.spacing[1],
    labelPaddingHorizontal: tokens.spacing[2],
  },
};

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  size = 'md',
  variant = 'default',
  avatarSrc,
  disabled = false,
  style,
  accessibilityLabel,
}: SelectProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const selected = options.find((o) => o.value === value);
  const isFilled = !!selected;
  const displayLabel = selected?.label ?? placeholder;
  const sizeCfg = SIZES[size];

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();
  };

  return (
    <Menu
      items={options}
      selectedValue={value}
      onSelect={(v) => onChange?.(v)}
      size={size}
      style={style}
      trigger={({ open, onPress }) => {
        const triggerStyles = getTriggerStyles(variant, isFilled, open);
        const labelColor = disabled
          ? tokens.textColors.baseDisabled
          : tokens.textColors.basePrimary;
        const chevronColor = disabled
          ? tokens.textColors.baseDisabled
          : isFilled || open
            ? tokens.textColors.basePrimary
            : tokens.textColors.baseSecondary;

        return (
          <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
              onPress={onPress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={accessibilityLabel ?? displayLabel}
              accessibilityState={{ disabled, expanded: open }}
              style={[
                styles.trigger,
                {
                  height: sizeCfg.height,
                  paddingHorizontal: sizeCfg.paddingHorizontal,
                  gap: sizeCfg.gap,
                },
                triggerStyles,
                disabled ? styles.triggerDisabled : null,
              ]}
            >
              {variant === 'avatar' && isFilled && avatarSrc ? (
                <Image
                  source={avatarSrc}
                  style={[
                    styles.avatar,
                    {
                      width: sizeCfg.avatarSize,
                      height: sizeCfg.avatarSize,
                      marginLeft: sizeCfg.avatarMarginLeft,
                    },
                  ]}
                  accessibilityIgnoresInvertColors
                />
              ) : null}
              <Text
                variant={size === 'sm' ? 'bodySm' : 'bodyMd'}
                color={labelColor}
                numberOfLines={1}
                style={{ paddingHorizontal: sizeCfg.labelPaddingHorizontal }}
              >
                {variant === 'avatar' && isFilled ? `@${displayLabel}` : displayLabel}
              </Text>
              <ChevronDown size={sizeCfg.chevronSize} color={chevronColor} />
            </Pressable>
          </Animated.View>
        );
      }}
    />
  );
}

function getTriggerStyles(variant: SelectVariant, isFilled: boolean, open: boolean) {
  if (variant === 'borderless') {
    return {
      backgroundColor: open ? tokens.backgrounds.neutral.primary.pressed : 'transparent',
      borderWidth: 0,
    };
  }

  const bg = open
    ? tokens.backgrounds.neutral.primary.pressed
    : isFilled
      ? tokens.backgrounds.neutral.secondary.default
      : tokens.backgrounds.neutral.primary.default;

  return {
    backgroundColor: bg,
    borderWidth: 1,
    borderColor: tokens.borders.default,
  };
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: tokens.radius.full,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  avatar: {
    borderRadius: tokens.radius.full,
  },
});
