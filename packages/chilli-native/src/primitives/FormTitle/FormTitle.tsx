import { forwardRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  type TextInput as TextInputType,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { FormTitleProps } from './FormTitle.types';

type State = 'default' | 'filled' | 'focused' | 'error' | 'disabled';

function resolveState(disabled: boolean, error: boolean, focused: boolean, filled: boolean): State {
  if (disabled) return 'disabled';
  if (error) return 'error';
  if (focused) return 'focused';
  if (filled) return 'filled';
  return 'default';
}

function getContainerStyle(state: State) {
  // Common: rounded 24, p-12, border 1, glass-ish bg.
  switch (state) {
    case 'disabled':
      return {
        backgroundColor: tokens.backgrounds.neutral.opacity.faint,
        borderColor: tokens.borders.disabled,
      };
    case 'focused':
      return [
        shadow(tokens.shadows.brandModerate),
        {
          backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
          borderColor: tokens.borders.brand.default,
        },
      ];
    case 'filled':
      return {
        backgroundColor: tokens.backgrounds.neutral.opacity.medium,
        borderColor: tokens.borders.default,
      };
    case 'error':
      return {
        backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
        borderColor: tokens.borders.danger.default,
      };
    case 'default':
    default:
      return {
        backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
        borderColor: tokens.borders.default,
      };
  }
}

function getTextColor(state: State): string {
  switch (state) {
    case 'disabled':
      return tokens.textColors.disabled;
    case 'error':
      return tokens.textColors.dangerPrimary;
    case 'focused':
    case 'filled':
      return tokens.textColors.fixed;
    case 'default':
    default:
      return tokens.textColors.glassSubtle;
  }
}

export const FormTitle = forwardRef<TextInputType, FormTitleProps>(function FormTitle(
  {
    error,
    helperText = 'add a title for your action',
    disabled = false,
    onFocus,
    onBlur,
    style,
    inputStyle,
    placeholderTextColor,
    value,
    defaultValue,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const effectiveValue = value !== undefined ? value : internalValue;
  const filled = !!effectiveValue && effectiveValue.length > 0;

  const state = resolveState(disabled, !!error, focused, filled);

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const inputColor = getTextColor(state);
  const placeholderColor =
    placeholderTextColor ??
    (state === 'error'
      ? tokens.textColors.dangerPrimary
      : tokens.textColors.glassSubtle);

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.container, getContainerStyle(state)]}>
        <TextInput
          ref={ref}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderColor}
          selectionColor={tokens.borders.brand.default}
          value={value}
          defaultValue={defaultValue}
          onChangeText={(text) => {
            if (value === undefined) setInternalValue(text);
            rest.onChangeText?.(text);
          }}
          style={[styles.input, { color: inputColor }, inputStyle]}
          {...rest}
        />
      </View>
      {error ? (
        <Text variant="bodySm" color={tokens.textColors.dangerPrimary}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
});

const TITLE_FONT_FAMILY = Platform.select({
  ios: tokens.fontFamily.primary,
  default: 'Inter-SemiBold',
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: tokens.spacing[4],
  },
  container: {
    width: '100%',
    minWidth: 343,
    padding: tokens.spacing[5],
    borderRadius: tokens.radius[7],
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -1,
    fontFamily: TITLE_FONT_FAMILY,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    margin: 0,
  },
});
