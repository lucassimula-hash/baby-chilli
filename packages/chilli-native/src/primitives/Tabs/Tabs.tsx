import { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import { shadow } from '../../foundations/platform';
import type { TabItem, TabsProps, TabsSize, TabsType } from './Tabs.types';

type SizeConfig = {
  height: number;
  iconSize: number;
  textVariant: 'bodySm' | 'bodyMd';
};

const SIZES: Record<TabsSize, SizeConfig> = {
  sm: { height: 28, iconSize: 16, textVariant: 'bodySm' },
  md: { height: 32, iconSize: 16, textVariant: 'bodySm' },
  lg: { height: 40, iconSize: 20, textVariant: 'bodyMd' },
};

const ANIMATION_DURATION = 200;

export function Tabs({
  items,
  value,
  onValueChange,
  type = 'pill',
  size = 'md',
  style,
}: TabsProps) {
  const cfg = SIZES[size];
  const tabLayouts = useRef<Map<string, { x: number; width: number }>>(new Map()).current;
  const animX = useRef(new Animated.Value(0)).current;
  const animW = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const isInit = useRef(false);

  const animateTo = useCallback(
    (val: string, animated: boolean) => {
      const layout = tabLayouts.get(val);
      if (!layout) return;
      if (animated) {
        Animated.parallel([
          Animated.timing(animX, {
            toValue: layout.x,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
          Animated.timing(animW, {
            toValue: layout.width,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        animX.setValue(layout.x);
        animW.setValue(layout.width);
        opacity.setValue(1);
      }
    },
    [tabLayouts, animX, animW, opacity],
  );

  useEffect(() => {
    if (isInit.current) {
      animateTo(value, true);
    }
  }, [value, animateTo]);

  const handleTabLayout = (val: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    tabLayouts.set(val, { x, width });
    if (!isInit.current && val === value) {
      isInit.current = true;
      animateTo(val, false);
    }
  };

  const renderTab = (item: TabItem, isActive: boolean) => {
    const Icon = item.icon;
    const RightIcon = item.rightIcon;
    const labelColor = isActive ? tokens.textColors.basePrimary : tokens.textColors.baseSecondary;
    const iconColor = isActive ? tokens.textColors.basePrimary : tokens.textColors.baseSecondary;

    return (
      <Pressable
        key={item.value}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        onPress={() => onValueChange(item.value)}
        onLayout={(e) => handleTabLayout(item.value, e)}
        style={[
          styles.tabBase,
          { height: cfg.height },
          type !== 'underline' ? styles.tabPillPadding : styles.tabUnderlinePadding,
        ]}
      >
        {Icon ? <Icon size={cfg.iconSize} color={iconColor} /> : null}
        <Text variant={cfg.textVariant} color={labelColor} style={styles.tabLabel} numberOfLines={1}>
          {item.label}
        </Text>
        {RightIcon ? <RightIcon size={cfg.iconSize} color={iconColor} /> : null}
      </Pressable>
    );
  };

  const containerStyle = getContainerStyle(type);

  return (
    <View style={[containerStyle, style]} accessibilityRole="tablist">
      {/* Sliding highlight (rendered before tabs so it sits behind) */}
      <Animated.View
        pointerEvents="none"
        style={[
          getHighlightStyle(type, cfg.height),
          {
            transform: [{ translateX: animX }],
            width: animW,
            opacity,
          },
        ]}
      />
      {items.map((item) => renderTab(item, item.value === value))}
    </View>
  );
}

function getContainerStyle(type: TabsType) {
  if (type === 'underline') {
    return [
      styles.containerBase,
      {
        borderBottomWidth: 1,
        borderBottomColor: tokens.borders.default,
      },
    ];
  }
  if (type === 'segmented') {
    return [
      styles.containerBase,
      {
        gap: tokens.spacing[1],
        padding: tokens.spacing[1],
        borderRadius: tokens.radius.full,
        backgroundColor: tokens.backgrounds.neutral.secondary.default,
        borderWidth: 1,
        borderColor: tokens.borders.default,
        alignSelf: 'flex-start' as const,
      },
    ];
  }
  // pill
  return [styles.containerBase, { gap: tokens.spacing[2] }];
}

function getHighlightStyle(type: TabsType, height: number) {
  if (type === 'underline') {
    return [
      styles.highlightBase,
      {
        bottom: 0,
        height: 2,
        backgroundColor: tokens.textColors.basePrimary,
      },
    ];
  }
  if (type === 'segmented') {
    return [
      styles.highlightBase,
      shadow({ color: 'rgba(0, 0, 0, 0.05)', offsetX: 0, offsetY: 2, blur: 4 }),
      {
        top: tokens.spacing[1],
        bottom: tokens.spacing[1],
        backgroundColor: tokens.backgrounds.neutral.tertiary.default,
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: tokens.borders.default,
      },
    ];
  }
  // pill
  return [
    styles.highlightBase,
    shadow({ color: 'rgba(0, 0, 0, 0.05)', offsetX: 0, offsetY: 2, blur: 4 }),
    {
      top: 0,
      height,
      backgroundColor: tokens.backgrounds.neutral.secondary.default,
      borderRadius: tokens.radius.full,
      borderWidth: 1,
      borderColor: tokens.borders.default,
    },
  ];
}

const styles = StyleSheet.create({
  containerBase: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightBase: {
    position: 'absolute',
    left: 0,
  },
  tabBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPillPadding: {
    paddingHorizontal: tokens.spacing[4],
    borderRadius: tokens.radius.full,
  },
  tabUnderlinePadding: {
    paddingBottom: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[2],
  },
  tabLabel: {
    paddingHorizontal: tokens.spacing[2],
  },
});
