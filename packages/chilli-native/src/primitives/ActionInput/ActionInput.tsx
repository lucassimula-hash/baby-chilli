import { forwardRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  type TextInput as TextInputType,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Text } from '../Text';
import { Toggle } from '../Toggle';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { ActionInputProps } from './ActionInput.types';

type State = 'default' | 'focused' | 'error' | 'disabled';

function getState(disabled: boolean, error: boolean, focused: boolean): State {
  if (disabled) return 'disabled';
  if (error) return 'error';
  if (focused) return 'focused';
  return 'default';
}

function getContainerStyle(state: State) {
  switch (state) {
    case 'disabled':
      return { borderColor: tokens.borders.disabled, opacity: 0.5 };
    case 'focused':
      return [shadow(tokens.shadows.brandModerate), { borderColor: tokens.borders.brand.default }];
    case 'error':
      return [shadow(tokens.shadows.dangerModerate), { borderColor: tokens.borders.danger.default }];
    case 'default':
    default:
      return { borderColor: tokens.borders.default };
  }
}

export const ActionInput = forwardRef<TextInputType, ActionInputProps>(function ActionInput(
  {
    label,
    helperText,
    error,
    leftIcon: LeftIcon,
    rightIcon,
    showAvatar,
    avatarSrc,
    showToggle,
    toggleChecked,
    onToggleChange,
    disabled = false,
    style,
    inputStyle,
    placeholderTextColor,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const state = getState(disabled, !!error, focused);
  const supportingText = error || helperText;

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const iconColor = tokens.textColors.baseSecondary;
  const placeholderColor = placeholderTextColor ?? tokens.textColors.glassSubtle;
  const inputColor = disabled ? tokens.textColors.baseDisabled : tokens.textColors.basePrimary;

  // Right-side render: toggle > explicit rightIcon > null = nothing > default ChevronRight.
  const renderRightSide = () => {
    if (showToggle) {
      return (
        <Toggle size="sm" checked={!!toggleChecked} onCheckedChange={onToggleChange} disabled={disabled} />
      );
    }
    if (rightIcon === null) return null;
    const RightIcon = rightIcon ?? ChevronRight;
    return <RightIcon size={20} color={iconColor} />;
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.container, getContainerStyle(state)]}>
        {label ? (
          <Text
            variant="bodySm"
            color={tokens.textColors.glassPrimary}
            style={styles.label}
          >
            {label}
          </Text>
        ) : null}

        <View style={styles.row}>
          {LeftIcon ? <LeftIcon size={20} color={iconColor} /> : null}
          {showAvatar && avatarSrc ? (
            <Image source={avatarSrc} style={styles.avatar} accessibilityIgnoresInvertColors />
          ) : null}
          <TextInput
            ref={ref}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={placeholderColor}
            selectionColor={tokens.borders.brand.default}
            style={[styles.input, { color: inputColor }, inputStyle]}
            {...rest}
          />
          {renderRightSide()}
        </View>
      </View>

      {supportingText ? (
        <Text
          variant="bodySm"
          color={error ? tokens.textColors.dangerPrimary : tokens.textColors.basePrimary}
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
    width: '100%',
    padding: tokens.spacing[5],
    borderRadius: tokens.radius[7],
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: tokens.backgrounds.neutral.opacity.faint,
    gap: tokens.spacing[4],
  },
  label: {
    fontFamily: 'Inter-Medium',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
    width: '100%',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.sm,
    fontFamily: tokens.textStyles.bodySm.fontFamily,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    margin: 0,
  },
});
