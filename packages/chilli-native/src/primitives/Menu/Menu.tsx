import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { tokens } from '../../foundations/theme';
import { Dropdown, MenuItem, type DropdownSize } from '../Dropdown';
import type { MenuOption, MenuProps } from './Menu.types';

export function Menu({
  items,
  selectedValue,
  onSelect,
  trigger,
  size = 'md',
  menuWidth: menuWidthProp,
  style,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const handleOpen = useCallback(() => {
    if (Platform.OS === 'web' && triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setAnchor({ x, y, width, height });
        setOpen(true);
      });
    } else {
      setOpen(true);
    }
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleSelect = useCallback(
    (index: number) => {
      const opt = items[index];
      if (!opt) return;
      onSelect?.(opt.value);
      setOpen(false);
    },
    [items, onSelect],
  );

  const checkedIndex =
    selectedValue !== undefined
      ? items.findIndex((o) => o.value === selectedValue)
      : undefined;

  const computedMenuWidth =
    menuWidthProp ??
    (Platform.OS === 'web'
      ? Math.max(anchor.width, 240)
      : Math.min(screenWidth - tokens.spacing[7] * 2, 360));

  return (
    <>
      <View ref={triggerRef} collapsable={false} style={style}>
        {trigger({ open, onPress: handleOpen })}
      </View>

      {open ? (
        <MenuPresentation
          platform={Platform.OS}
          anchor={anchor}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
          menuWidth={computedMenuWidth}
          dropdownSize={size}
          checkedIndex={checkedIndex !== undefined && checkedIndex >= 0 ? checkedIndex : undefined}
          items={items}
          onRequestClose={handleClose}
          onSelectIndex={handleSelect}
        />
      ) : null}
    </>
  );
}

type PresentationProps = {
  platform: typeof Platform.OS;
  anchor: { x: number; y: number; width: number; height: number };
  screenHeight: number;
  screenWidth: number;
  menuWidth: number;
  dropdownSize: DropdownSize;
  checkedIndex?: number;
  items: MenuOption[];
  onRequestClose: () => void;
  onSelectIndex: (index: number) => void;
};

function MenuPresentation({
  platform,
  anchor,
  screenHeight,
  screenWidth,
  menuWidth,
  dropdownSize,
  checkedIndex,
  items,
  onRequestClose,
  onSelectIndex,
}: PresentationProps) {
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
    <Modal transparent visible animationType="none" onRequestClose={runClose} statusBarTranslucent>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} pointerEvents="auto">
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={runClose}
          accessibilityLabel="Close menu"
        />
      </Animated.View>

      {isWeb ? (
        <View
          pointerEvents="box-none"
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
        >
          <Dropdown
            size={dropdownSize}
            variant="floating"
            checkedIndex={checkedIndex}
            onItemPress={onSelectIndex}
          >
            {items.map((opt, i) => (
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
            onItemPress={onSelectIndex}
          >
            {items.map((opt, i) => (
              <MenuItem key={opt.value} index={i} icon={opt.icon} label={opt.label} />
            ))}
          </Dropdown>
        </Animated.View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
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
