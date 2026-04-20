import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInput as TextInputType,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { InputProps } from './Input.types';

type InputState = 'default' | 'focused' | 'error' | 'disabled';

function getState(disabled: boolean, error?: string, focused?: boolean): InputState {
  if (disabled) return 'disabled';
  if (error) return 'error';
  if (focused) return 'focused';
  return 'default';
}

function getContainerStyle(state: InputState): StyleProp<ViewStyle> {
  if (state === 'disabled') {
    return {
      backgroundColor: tokens.backgrounds.disabled,
      borderColor: tokens.borders.disabled,
      opacity: 0.5,
    };
  }

  if (state === 'focused') {
    return [
      shadow(tokens.shadows.brandModerate),
      {
        backgroundColor: tokens.backgrounds.neutral.secondary.default,
        borderColor: tokens.borders.brand.default,
      },
    ];
  }

  if (state === 'error') {
    return [
      shadow(tokens.shadows.dangerModerate),
      {
        backgroundColor: tokens.backgrounds.neutral.secondary.default,
        borderColor: tokens.borders.danger.default,
      },
    ];
  }

  return {
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
    borderColor: tokens.borders.neutral.moderate,
  };
}

export const Input = forwardRef<TextInputType, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    actionButton,
    leadingText,
    disabled = false,
    style,
    inputStyle,
    value,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
    placeholderTextColor = tokens.textColors.baseSecondary,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(
    typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : '',
  );
  const state = getState(disabled, error, focused);
  const supportingText = error || helperText;
  const currentValue = typeof value === 'string' ? value : internalValue;
  const clearVisible =
    clearable && !disabled && typeof onClear === 'function' && currentValue.length > 0;

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  const handleChangeText: NonNullable<RNTextInputProps['onChangeText']> = (nextValue) => {
    if (typeof value !== 'string') {
      setInternalValue(nextValue);
    }
    onChangeText?.(nextValue);
  };

  const handleClear = () => {
    if (typeof value !== 'string') {
      setInternalValue('');
    }
    onClear?.();
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text variant="bodySm" style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View style={[styles.container, getContainerStyle(state)]}>
        {leadingText ? (
          <Text
            variant="bodyMd"
            color={tokens.textColors.baseSecondary}
            style={styles.leadingText}
            numberOfLines={1}
          >
            {leadingText}
          </Text>
        ) : null}

        {leftIcon ? (
          <View style={[styles.iconSlot, disabled ? styles.slotDisabled : null]}>{leftIcon}</View>
        ) : null}

        <TextInput
          ref={ref}
          editable={!disabled}
          value={currentValue}
          defaultValue={defaultValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor}
          selectionColor={tokens.borders.brand.default}
          style={[styles.input, disabled ? styles.inputDisabled : null, inputStyle]}
          {...rest}
        />

        {rightIcon ? (
          <View style={[styles.iconSlot, disabled ? styles.slotDisabled : null]}>{rightIcon}</View>
        ) : null}

        {clearVisible ? (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel={rest.accessibilityLabel ? `Clear ${rest.accessibilityLabel}` : 'Clear input'}
            hitSlop={8}
            style={({ pressed }) => [
              styles.trailingButton,
              pressed ? styles.trailingButtonPressed : null,
            ]}
          >
            <X size={16} color={tokens.textColors.basePrimary} />
          </Pressable>
        ) : null}

        {actionButton ? (
          <Pressable
            onPress={actionButton.onPress}
            accessibilityRole="button"
            accessibilityLabel={actionButton.accessibilityLabel ?? actionButton.label}
            hitSlop={8}
            style={({ pressed }) => [
              styles.actionButton,
              pressed ? styles.actionButtonPressed : null,
            ]}
          >
            <Text variant="bodySm" numberOfLines={1}>
              {actionButton.label}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {supportingText ? (
        <Text
          variant="bodySm"
          color={error ? tokens.textColors.dangerPrimary : tokens.textColors.baseSecondary}
        >
          {supportingText}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: tokens.spacing[4],
  },
  label: {
    color: tokens.textColors.basePrimary,
  },
  leadingText: {
    flexShrink: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
    minHeight: 48,
    paddingHorizontal: tokens.spacing[5],
    borderRadius: tokens.radius[6],
    borderWidth: 1,
  },
  iconSlot: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  slotDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: tokens.textColors.basePrimary,
    fontSize: tokens.fontSize.md,
    lineHeight: tokens.lineHeight.md,
    fontFamily: tokens.textStyles.bodyMd.fontFamily,
    paddingVertical: 0,
  },
  inputDisabled: {
    color: tokens.textColors.baseSecondary,
  },
  trailingButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
  },
  trailingButtonPressed: {
    opacity: 0.8,
  },
  actionButton: {
    minWidth: 56,
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[2],
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
});
