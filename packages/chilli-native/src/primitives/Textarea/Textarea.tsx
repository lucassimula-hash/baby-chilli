import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInput as TextInputType,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { Wand2 } from 'lucide-react-native';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { TextareaProps } from './Textarea.types';

type TextareaState = 'default' | 'focused' | 'error' | 'disabled';

function getState(disabled: boolean, error?: string, focused?: boolean): TextareaState {
  if (disabled) return 'disabled';
  if (error) return 'error';
  if (focused) return 'focused';
  return 'default';
}

function getContainerStyle(state: TextareaState) {
  if (state === 'disabled') {
    return {
      backgroundColor: tokens.backgrounds.disabled,
      borderColor: tokens.borders.disabled,
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

export const Textarea = forwardRef<TextInputType, TextareaProps>(function Textarea(
  {
    label,
    helperText,
    error,
    actionButton,
    disabled = false,
    style,
    inputStyle,
    onFocus,
    onBlur,
    placeholderTextColor = tokens.textColors.baseSecondary,
    multiline = true,
    textAlignVertical = 'top',
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const state = getState(disabled, error, focused);
  const supportingText = error || helperText;

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text
          variant="bodySm"
          color={disabled ? tokens.textColors.baseDisabled : tokens.textColors.basePrimary}
        >
          {label}
        </Text>
      ) : null}

      <View style={[styles.container, getContainerStyle(state)]}>
        <TextInput
          ref={ref}
          editable={!disabled}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={
            disabled ? tokens.textColors.baseDisabled : placeholderTextColor
          }
          selectionColor={tokens.borders.brand.default}
          style={[styles.input, disabled ? styles.inputDisabled : null, inputStyle]}
          {...rest}
        />

        {actionButton ? (
          <Pressable
            onPress={actionButton.onPress}
            accessibilityRole="button"
            accessibilityLabel={actionButton.accessibilityLabel ?? actionButton.label}
            disabled={disabled}
            hitSlop={8}
            style={({ pressed }) => [
              styles.actionButton,
              disabled ? styles.actionButtonDisabled : null,
              pressed && !disabled ? styles.actionButtonPressed : null,
            ]}
          >
            <Wand2 size={12} color={disabled ? tokens.textColors.baseDisabled : tokens.textColors.basePrimary} />
            <Text
              variant="bodySm"
              color={disabled ? tokens.textColors.baseDisabled : tokens.textColors.basePrimary}
              numberOfLines={1}
            >
              {actionButton.label}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {supportingText ? (
        <Text
          variant="bodySm"
          color={
            disabled
              ? tokens.textColors.baseDisabled
              : error
                ? tokens.textColors.dangerPrimary
                : tokens.textColors.baseSecondary
          }
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
  container: {
    minHeight: 120,
    padding: tokens.spacing[5],
    borderRadius: tokens.radius[6],
    borderWidth: 1,
    gap: tokens.spacing[4],
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    minHeight: 80,
    flexGrow: 1,
    color: tokens.textColors.basePrimary,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.sm,
    fontFamily: tokens.textStyles.bodySm.fontFamily,
    paddingTop: 0,
    paddingBottom: 0,
    padding: 0,
    margin: 0,
  },
  inputDisabled: {
    color: tokens.textColors.baseDisabled,
  },
  actionButton: {
    minHeight: 28,
    minWidth: 56,
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[2],
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[1],
    alignSelf: 'flex-end',
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonDisabled: {
    backgroundColor: tokens.backgrounds.disabled,
  },
});
