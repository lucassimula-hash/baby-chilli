import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import { Dropdown, MenuItem } from '../_internal/Dropdown';
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
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef<View>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const selected = options.find((o) => o.value === value);
  const isFilled = !!selected;
  const displayLabel = selected?.label ?? placeholder;
  const sizeCfg = SIZES[size];

  const handleOpen = useCallback(() => {
    if (disabled) return;
    if (Platform.OS === 'web' && triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setAnchor({ x, y, width, height });
        setOpen(true);
      });
    } else {
      setOpen(true);
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      const opt = options[index];
      if (!opt) return;
      onChange?.(opt.value);
      setOpen(false);
    },
    [options, onChange],
  );

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();
  };

  const triggerStyles = getTriggerStyles(variant, isFilled, open);
  const labelColor = disabled
    ? tokens.textColors.baseDisabled
    : tokens.textColors.basePrimary;
  const chevronColor = disabled
    ? tokens.textColors.baseDisabled
    : isFilled || open
      ? tokens.textColors.basePrimary
      : tokens.textColors.baseSecondary;

  const checkedIndex = selected ? options.indexOf(selected) : undefined;

  const menuWidth =
    Platform.OS === 'web'
      ? Math.max(anchor.width, 240)
      : Math.min(screenWidth - tokens.spacing[7] * 2, 360);

  return (
    <>
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        <Pressable
          ref={triggerRef}
          onPress={handleOpen}
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

      {open ? (
        <SelectMenu
          platform={Platform.OS}
          anchor={anchor}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
          menuWidth={menuWidth}
          onRequestClose={handleClose}
          dropdownSize={size}
          checkedIndex={checkedIndex}
          options={options}
          onSelect={handleSelect}
        />
      ) : null}
    </>
  );
}

type SelectMenuProps = {
  platform: typeof Platform.OS;
  anchor: { x: number; y: number; width: number; height: number };
  screenHeight: number;
  screenWidth: number;
  menuWidth: number;
  onRequestClose: () => void;
  dropdownSize: SelectSize;
  checkedIndex?: number;
  options: SelectProps['options'];
  onSelect: (index: number) => void;
};

function SelectMenu({
  platform,
  anchor,
  screenHeight,
  screenWidth,
  menuWidth,
  onRequestClose,
  dropdownSize,
  checkedIndex,
  options,
  onSelect,
}: SelectMenuProps) {
  const translateY = useRef(new Animated.Value(platform === 'web' ? 0 : screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [sheetHeight, setSheetHeight] = useState(0);

  const runOpen = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      platform === 'web'
        ? Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true })
        : Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 22,
            stiffness: 180,
            mass: 1,
          }),
    ]).start();
  }, [backdropOpacity, platform, translateY]);

  const runClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      platform === 'web'
        ? Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true })
        : Animated.timing(translateY, {
            toValue: sheetHeight || screenHeight,
            duration: 180,
            useNativeDriver: true,
          }),
    ]).start(() => {
      onRequestClose();
    });
  }, [backdropOpacity, onRequestClose, platform, screenHeight, sheetHeight, translateY]);

  useEffect(() => {
    runOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (platform !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      runClose();
      return true;
    });
    return () => sub.remove();
  }, [platform, runClose]);

  const handleSheetLayout = (event: LayoutChangeEvent) => {
    const h = event.nativeEvent.layout.height;
    if (h > 0 && sheetHeight === 0) {
      setSheetHeight(h);
      translateY.setValue(0);
    }
  };

  const isWeb = platform === 'web';

  return (
    <Modal
      transparent
      visible
      animationType="none"
      onRequestClose={runClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} pointerEvents="auto">
        <Pressable style={StyleSheet.absoluteFill} onPress={runClose} accessibilityLabel="Close menu" />
      </Animated.View>

      {isWeb ? (
        <View
          style={[
            styles.webMenuAnchor,
            {
              top: anchor.y + anchor.height + 8,
              left: Math.max(
                tokens.spacing[5],
                Math.min(anchor.x, screenWidth - menuWidth - tokens.spacing[5]),
              ),
              width: menuWidth,
            },
          ]}
          pointerEvents="box-none"
        >
          <Dropdown
            size={dropdownSize}
            variant="floating"
            checkedIndex={checkedIndex}
            onItemPress={onSelect}
          >
            {options.map((opt, i) => (
              <MenuItem key={opt.value} index={i} icon={opt.icon} label={opt.label} />
            ))}
          </Dropdown>
        </View>
      ) : (
        <Animated.View
          onLayout={handleSheetLayout}
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.sheetHandle} />
          <Dropdown
            size={dropdownSize}
            variant="flat"
            checkedIndex={checkedIndex}
            onItemPress={onSelect}
          >
            {options.map((opt, i) => (
              <MenuItem key={opt.value} index={i} icon={opt.icon} label={opt.label} />
            ))}
          </Dropdown>
        </Animated.View>
      )}
    </Modal>
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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  webMenuAnchor: {
    position: 'absolute',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[5],
    paddingBottom: tokens.spacing[8],
    backgroundColor: tokens.backgrounds.neutral.primary.default,
    borderTopLeftRadius: tokens.radius[7],
    borderTopRightRadius: tokens.radius[7],
    borderTopWidth: 1,
    borderColor: tokens.borders.default,
    gap: tokens.spacing[4],
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: tokens.borders.neutral.moderate,
    alignSelf: 'center',
  },
});
