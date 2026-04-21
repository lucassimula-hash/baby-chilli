import { useContext, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';
import type { IconComponent } from '../../Icon/Icon.types';
import { Text } from '../../Text';
import { tokens } from '../../../foundations/theme';
import { DropdownContext, type DropdownSize } from './DropdownContext';

type MenuItemProps = {
  icon?: IconComponent;
  label: string;
  index: number;
  onSelect?: () => void;
};

const SIZE_CONFIG: Record<DropdownSize, { height: number; borderRadius: number }> = {
  sm: { height: 32, borderRadius: tokens.radius[5] },
  md: { height: 40, borderRadius: tokens.radius[6] },
  lg: { height: 48, borderRadius: tokens.radius[6] },
};

export function MenuItem({ icon: Icon, label, index, onSelect }: MenuItemProps) {
  const { size, checkedIndex, registerItem, unregisterItem, onItemPress } =
    useContext(DropdownContext);
  const containerRef = useRef<View>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const { height, borderRadius } = SIZE_CONFIG[size];

  const isChecked = checkedIndex === index;

  useEffect(() => {
    return () => {
      unregisterItem(index);
    };
  }, [index, unregisterItem]);

  const handleLayout = (event: { nativeEvent: { layout: { y: number; height: number } } }) => {
    const { y, height: h } = event.nativeEvent.layout;
    registerItem(index, y, h);
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
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
    onItemPress(index);
    onSelect?.();
  };

  const textColor = isChecked ? tokens.textColors.basePrimary : tokens.textColors.baseSecondary;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        ref={containerRef}
        onLayout={handleLayout}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="menuitem"
        accessibilityState={{ selected: isChecked }}
        style={[styles.item, { height, borderRadius }]}
      >
        <View style={styles.leading}>
          {Icon ? <Icon size={16} color={textColor} /> : null}
          <Text variant="bodySm" color={textColor} numberOfLines={1}>
            {label}
          </Text>
        </View>
        {isChecked ? <Check size={16} color={tokens.backgrounds.brand.strong.default} /> : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing[4],
    gap: tokens.spacing[5],
  },
  leading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
    minWidth: 0,
  },
});
