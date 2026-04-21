import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInput as TextInputType,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar = forwardRef<TextInputType, SearchBarProps>(function SearchBar(
  {
    value,
    onClear,
    onFocus,
    onBlur,
    style,
    inputStyle,
    placeholderTextColor = tokens.textColors.baseSecondary,
    returnKeyType = 'search',
    autoCorrect = false,
    autoCapitalize = 'none',
    clearButtonMode = 'never',
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  const containerStyle = focused
    ? [
        shadow(tokens.shadows.brandModerate),
        {
          backgroundColor: tokens.backgrounds.neutral.secondary.default,
          borderColor: tokens.borders.brand.default,
        },
      ]
    : {
        backgroundColor: tokens.backgrounds.neutral.secondary.default,
        borderColor: tokens.borders.default,
      };

  return (
    <View
      accessibilityRole="search"
      style={[styles.container, containerStyle, style]}
    >
      <View style={[styles.leading, hasValue ? styles.leadingFilled : styles.leadingEmpty]}>
        <Search size={20} color={tokens.textColors.baseSecondary} />
        <TextInput
          ref={ref}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor}
          selectionColor={tokens.borders.brand.default}
          returnKeyType={returnKeyType}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          clearButtonMode={clearButtonMode}
          style={[styles.input, inputStyle]}
          {...rest}
        />
      </View>

      {hasValue ? (
        <Pressable
          onPress={onClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
          style={({ pressed }) => [styles.clearButton, pressed ? styles.clearButtonPressed : null]}
        >
          <X size={16} color={tokens.textColors.baseSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: tokens.radius[6],
    borderWidth: 1,
    overflow: 'hidden',
    paddingLeft: tokens.spacing[4],
    paddingRight: tokens.spacing[5],
    paddingVertical: tokens.spacing[4],
    gap: tokens.spacing[4],
  },
  leading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
  },
  leadingEmpty: {
    flexShrink: 0,
  },
  leadingFilled: {
    flex: 1,
    minWidth: 0,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: tokens.textColors.basePrimary,
    fontSize: tokens.fontSize.md,
    lineHeight: tokens.lineHeight.md,
    fontFamily: tokens.textStyles.bodyMd.fontFamily,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    margin: 0,
  },
  clearButton: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonPressed: {
    opacity: 0.6,
  },
});
