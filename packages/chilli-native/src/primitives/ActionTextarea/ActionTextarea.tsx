import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInput as TextInputType,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { ActionTextareaProps } from './ActionTextarea.types';

type State = 'default' | 'focused' | 'error' | 'disabled';

function getState(disabled: boolean, error: boolean, focused: boolean): State {
  if (disabled) return 'disabled';
  if (error) return 'error';
  if (focused) return 'focused';
  return 'default';
}

function getContainerStyle(state: State, glass: boolean) {
  if (glass) {
    switch (state) {
      case 'disabled':
        return {
          backgroundColor: tokens.backgrounds.disabled,
          borderColor: 'rgba(20, 15, 20, 0.03)',
        };
      case 'focused':
        return [
          shadow(tokens.shadows.brandModerate),
          {
            backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
            borderColor: tokens.borders.brand.lighter,
          },
        ];
      case 'error':
        return {
          backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
          borderColor: tokens.borders.danger.default,
        };
      case 'default':
      default:
        return {
          backgroundColor: tokens.backgrounds.neutral.opacity.faint,
          borderColor: tokens.borders.default,
        };
    }
  }

  // Non-glass
  switch (state) {
    case 'disabled':
      return {
        backgroundColor: tokens.backgrounds.disabled,
        borderColor: tokens.borders.disabled,
      };
    case 'focused':
      return [
        shadow(tokens.shadows.brandModerate),
        {
          backgroundColor: tokens.backgrounds.neutral.primary.default,
          borderColor: tokens.borders.brand.default,
        },
      ];
    case 'error':
      return [
        shadow(tokens.shadows.dangerModerate),
        {
          backgroundColor: tokens.backgrounds.neutral.primary.default,
          borderColor: tokens.borders.danger.default,
        },
      ];
    case 'default':
    default:
      return {
        backgroundColor: tokens.backgrounds.neutral.primary.default,
        borderColor: tokens.borders.default,
      };
  }
}

function getPromptColor(state: State, glass: boolean): string {
  if (state === 'disabled') return tokens.textColors.disabled;
  if (glass) return tokens.textColors.glassPrimary;
  if (state === 'default') return tokens.textColors.basePrimary;
  return tokens.textColors.baseSecondary;
}

const DEFAULT_PROMPT =
  "what's your strategy? how will you turn challenges into opportunities?";

export const ActionTextarea = forwardRef<TextInputType, ActionTextareaProps>(function ActionTextarea(
  {
    prompt = DEFAULT_PROMPT,
    error = false,
    glass = false,
    disabled = false,
    style,
    inputStyle,
    onFocus,
    onBlur,
    placeholderTextColor,
    multiline = true,
    textAlignVertical = 'top',
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const state = getState(disabled, error, focused);

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const promptColor = getPromptColor(state, glass);
  const inputColor = disabled ? tokens.textColors.disabled : tokens.textColors.basePrimary;
  const placeholderColor =
    placeholderTextColor ?? (glass ? tokens.textColors.glassSubtle : tokens.textColors.baseSecondary);

  return (
    <View style={[styles.container, getContainerStyle(state, glass), style]}>
      <Text variant="bodySm" color={promptColor} style={styles.prompt}>
        {prompt}
      </Text>
      <TextInput
        ref={ref}
        editable={!disabled}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={placeholderColor}
        selectionColor={tokens.borders.brand.default}
        style={[styles.input, { color: inputColor }, inputStyle]}
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: tokens.spacing[5],
    borderRadius: tokens.radius[7],
    borderWidth: 1,
    overflow: 'hidden',
    gap: tokens.spacing[4],
  },
  prompt: {
    fontFamily: 'Inter-Medium',
  },
  input: {
    width: '100%',
    minHeight: 99,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.sm,
    fontFamily: tokens.textStyles.bodySm.fontFamily,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    margin: 0,
  },
});
