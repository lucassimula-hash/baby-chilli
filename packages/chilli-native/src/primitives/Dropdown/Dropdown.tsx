import { Children, useCallback, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import { DropdownContext, type DropdownSize } from './DropdownContext';

type DropdownVariant = 'floating' | 'flat';

type DropdownProps = {
  checkedIndex?: number;
  size?: DropdownSize;
  variant?: DropdownVariant;
  onItemPress?: (index: number) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CONTAINER_SIZE: Record<DropdownSize, { padding: number; borderRadius: number }> = {
  sm: { padding: tokens.spacing[2], borderRadius: tokens.radius[6] },
  md: { padding: tokens.spacing[2], borderRadius: tokens.radius[6] + 2 },
  lg: { padding: tokens.spacing[3], borderRadius: tokens.radius[6] + 2 },
};

export function Dropdown({
  checkedIndex,
  size = 'md',
  variant = 'floating',
  onItemPress,
  children,
  style,
}: DropdownProps) {
  const itemRects = useRef(new Map<number, { y: number; height: number }>()).current;
  const [highlight, setHighlight] = useState<{ top: number; height: number } | null>(null);
  const highlightOpacity = useRef(new Animated.Value(checkedIndex !== undefined ? 1 : 0)).current;

  const registerItem = useCallback(
    (index: number, y: number, height: number) => {
      itemRects.set(index, { y, height });
      if (checkedIndex === index) {
        setHighlight({ top: y, height });
      }
    },
    [checkedIndex, itemRects],
  );

  const unregisterItem = useCallback(
    (index: number) => {
      itemRects.delete(index);
    },
    [itemRects],
  );

  const handleItemPress = useCallback(
    (index: number) => {
      const rect = itemRects.get(index);
      if (rect) {
        setHighlight({ top: rect.y, height: rect.height });
        Animated.timing(highlightOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
      onItemPress?.(index);
    },
    [highlightOpacity, itemRects, onItemPress],
  );

  const ctxValue = useMemo(
    () => ({
      size,
      checkedIndex,
      registerItem,
      unregisterItem,
      onItemPress: handleItemPress,
    }),
    [size, checkedIndex, registerItem, unregisterItem, handleItemPress],
  );

  const { padding, borderRadius } = CONTAINER_SIZE[size];
  const highlightRadius = size === 'sm' ? tokens.radius[5] : tokens.radius[6];

  const containerBaseStyle =
    variant === 'floating'
      ? [
          styles.floatingContainer,
          shadow(tokens.shadows.lighter),
          { padding, borderRadius },
        ]
      : [styles.flatContainer, { padding }];

  return (
    <DropdownContext.Provider value={ctxValue}>
      <View style={[containerBaseStyle, style]}>
        {highlight ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.highlight,
              {
                top: highlight.top + padding,
                height: highlight.height,
                left: padding,
                right: padding,
                borderRadius: highlightRadius,
                opacity: highlightOpacity,
              },
            ]}
          />
        ) : null}
        <View style={styles.items}>{children}</View>
      </View>
    </DropdownContext.Provider>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    backgroundColor: tokens.backgrounds.neutral.primary.default,
    borderWidth: 1,
    borderColor: tokens.borders.default,
    overflow: 'hidden',
  },
  flatContainer: {
    backgroundColor: 'transparent',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
  },
  items: {
    gap: tokens.spacing[1],
  },
});

// Ensure we can still iterate children if/when consumers need counts later.
Dropdown.childCount = (children: React.ReactNode) => Children.count(children);
