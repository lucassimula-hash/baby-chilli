import { useContext, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import { RadioGroupContext } from './RadioGroupContext';
import type { RadioProps, RadioSize } from './Radio.types';

type SizeConfig = {
  outer: number;
  inner: number;
};

const SIZE_CONFIG: Record<RadioSize, SizeConfig> = {
  sm: { outer: 16, inner: 8 },
  md: { outer: 20, inner: 10 },
};

export function Radio({
  value,
  checked: checkedProp,
  onCheckedChange,
  size = 'md',
  label,
  description,
  disabled = false,
  style,
  accessibilityLabel,
}: RadioProps) {
  const group = useContext(RadioGroupContext);
  const isChecked = group?.value !== undefined ? group.value === value : checkedProp ?? false;
  const cfg = SIZE_CONFIG[size];

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
    }).start();
  };

  const handlePress = () => {
    if (disabled) return;
    if (group?.onValueChange && value !== undefined) {
      group.onValueChange(value);
    } else {
      onCheckedChange?.(!isChecked);
    }
  };

  const radioCircle = (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View
        accessibilityRole="radio"
        accessibilityState={{ selected: isChecked, disabled }}
        style={[
          styles.outer,
          {
            width: cfg.outer,
            height: cfg.outer,
            borderRadius: cfg.outer / 2,
            backgroundColor: disabled
              ? tokens.backgrounds.disabled
              : isChecked
                ? tokens.backgrounds.brand.strong.default
                : tokens.backgrounds.neutral.primary.default,
            borderColor: disabled
              ? tokens.borders.disabled
              : isChecked
                ? tokens.borders.brand.default
                : tokens.borders.default,
          },
        ]}
      >
        {isChecked ? (
          <View
            style={{
              width: cfg.inner,
              height: cfg.inner,
              borderRadius: cfg.inner / 2,
              backgroundColor: tokens.backgrounds.neutral.inverse.default,
            }}
          />
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
        {radioCircle}
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
      <View style={styles.radioWrapper}>{radioCircle}</View>
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
  outer: {
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
  radioWrapper: {
    paddingTop: 1,
  },
  labels: {
    flex: 1,
    flexDirection: 'column',
  },
});
