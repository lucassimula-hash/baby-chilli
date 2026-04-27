import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Check, Minus } from 'lucide-react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { CheckboxProps, CheckboxSize } from './Checkbox.types';

type SizeConfig = {
  box: number;
  borderRadius: number;
  iconSize: number;
  numberFontSize: number;
};

const SIZE_CONFIG: Record<CheckboxSize, SizeConfig> = {
  sm: { box: 16, borderRadius: tokens.radius[2], iconSize: 12, numberFontSize: 9 },
  md: { box: 20, borderRadius: tokens.radius[3], iconSize: 16, numberFontSize: 11 },
};

export function Checkbox({
  checked = false,
  indeterminate = false,
  number,
  onCheckedChange,
  size = 'md',
  label,
  description,
  disabled = false,
  style,
  accessibilityLabel,
}: CheckboxProps) {
  const cfg = SIZE_CONFIG[size];
  const scale = useRef(new Animated.Value(1)).current;

  const isFilled = checked || indeterminate || number !== undefined;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 40 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();
  };

  const handlePress = () => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  };

  const boxBg = disabled
    ? tokens.backgrounds.disabled
    : isFilled
      ? tokens.backgrounds.brand.strong.default
      : tokens.backgrounds.neutral.primary.default;
  const boxBorder = disabled
    ? tokens.borders.disabled
    : isFilled
      ? tokens.borders.brand.default
      : tokens.borders.default;

  const checkbox = (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View
        accessibilityRole="checkbox"
        accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
        style={[
          styles.box,
          {
            width: cfg.box,
            height: cfg.box,
            borderRadius: cfg.borderRadius,
            backgroundColor: boxBg,
            borderColor: boxBorder,
          },
        ]}
      >
        {number !== undefined ? (
          <Text
            variant="bodyXs"
            color={tokens.textColors.fixed}
            style={{ fontSize: cfg.numberFontSize, lineHeight: cfg.numberFontSize + 2 }}
          >
            {number}
          </Text>
        ) : indeterminate ? (
          <Minus size={cfg.iconSize} color={tokens.textColors.fixed} strokeWidth={2.5} />
        ) : checked ? (
          <Check size={cfg.iconSize} color={tokens.textColors.fixed} strokeWidth={2.5} />
        ) : null}
      </View>
    </Animated.View>
  );

  if (!label && !description) {
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        hitSlop={6}
        style={[disabled ? styles.disabled : null, style]}
      >
        {checkbox}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.row, disabled ? styles.disabled : null, style]}
    >
      <View style={styles.boxWrapper}>{checkbox}</View>
      <View style={styles.labels}>
        {label ? (
          <Text variant="bodySm" color={tokens.textColors.basePrimary}>
            {label}
          </Text>
        ) : null}
        {description ? (
          <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing[4],
    alignSelf: 'flex-start',
  },
  boxWrapper: {
    paddingTop: 1,
  },
  labels: {
    flex: 1,
    flexDirection: 'column',
  },
});
