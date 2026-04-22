import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { ToggleProps, ToggleSize } from './Toggle.types';

type SizeConfig = {
  trackW: number;
  trackH: number;
  thumb: number;
  offset: number;
};

const SIZE_CONFIG: Record<ToggleSize, SizeConfig> = {
  sm: { trackW: 34, trackH: 20, thumb: 16, offset: 2 },
  md: { trackW: 48, trackH: 28, thumb: 22, offset: 3 },
};

const PRESS_EXTEND = 4;
const PRESS_SHRINK = 4;
const DRAG_DEAD_ZONE = 2;

export function Toggle({
  checked = false,
  onCheckedChange,
  size = 'md',
  label,
  description,
  disabled = false,
  style,
  accessibilityLabel,
}: ToggleProps) {
  const cfg = SIZE_CONFIG[size];
  const travel = cfg.trackW - cfg.thumb - cfg.offset * 2;

  const [pressed, setPressed] = useState(false);
  const translateX = useRef(new Animated.Value(checked ? cfg.offset + travel : cfg.offset)).current;
  const trackOnOpacity = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;

  // Drag tracking refs
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);

  // Sync to checked changes when not dragging
  useEffect(() => {
    if (dragging.current) return;
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: checked ? cfg.offset + travel : cfg.offset,
        useNativeDriver: true,
        damping: 20,
        stiffness: 220,
      }),
      Animated.timing(trackOnOpacity, {
        toValue: checked ? 1 : 0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked, cfg.offset, travel, translateX, trackOnOpacity]);

  // Press-extend animation (scaleX, scaleY)
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleX, {
        toValue: pressed ? (cfg.thumb + PRESS_EXTEND) / cfg.thumb : 1,
        useNativeDriver: true,
        damping: 18,
        stiffness: 260,
      }),
      Animated.spring(scaleY, {
        toValue: pressed ? (cfg.thumb - PRESS_SHRINK) / cfg.thumb : 1,
        useNativeDriver: true,
        damping: 18,
        stiffness: 260,
      }),
    ]).start();
  }, [pressed, cfg.thumb, scaleX, scaleY]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: (_evt, gesture) =>
          !disabled && Math.abs(gesture.dx) > DRAG_DEAD_ZONE,
        onPanResponderGrant: () => {
          if (disabled) return;
          setPressed(true);
          dragStartX.current = checked ? cfg.offset + travel : cfg.offset;
          dragging.current = false;
          didDrag.current = false;
        },
        onPanResponderMove: (_evt, gesture: PanResponderGestureState) => {
          if (disabled) return;
          if (!dragging.current) {
            if (Math.abs(gesture.dx) < DRAG_DEAD_ZONE) return;
            dragging.current = true;
          }
          const dragMin = cfg.offset;
          // Account for press-extended thumb width when computing max
          const pressedThumbW = cfg.thumb + PRESS_EXTEND;
          const dragMax = cfg.trackW - cfg.offset - pressedThumbW;
          const next = Math.max(dragMin, Math.min(dragMax, dragStartX.current + gesture.dx));
          translateX.setValue(next);
        },
        onPanResponderRelease: (_evt, gesture) => {
          if (disabled) return;
          setPressed(false);
          if (dragging.current) {
            didDrag.current = true;
            dragging.current = false;
            const currentX = dragStartX.current + gesture.dx;
            const dragMin = cfg.offset;
            const pressedThumbW = cfg.thumb + PRESS_EXTEND;
            const dragMax = cfg.trackW - cfg.offset - pressedThumbW;
            const midpoint = (dragMin + dragMax) / 2;
            const shouldBeOn = currentX > midpoint;
            if (shouldBeOn !== checked) {
              onCheckedChange?.(!checked);
            } else {
              const snapTarget = checked ? cfg.offset + travel : cfg.offset;
              Animated.spring(translateX, {
                toValue: snapTarget,
                useNativeDriver: true,
                damping: 20,
                stiffness: 220,
              }).start();
            }
            requestAnimationFrame(() => {
              didDrag.current = false;
            });
          }
        },
        onPanResponderTerminate: () => {
          setPressed(false);
          dragging.current = false;
        },
      }),
    [cfg.offset, cfg.thumb, cfg.trackW, checked, disabled, onCheckedChange, travel, translateX],
  );

  const handlePress = (_e: GestureResponderEvent) => {
    if (disabled || didDrag.current) return;
    onCheckedChange?.(!checked);
  };

  const labelColor = checked ? tokens.textColors.basePrimary : tokens.textColors.baseSecondary;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.row, disabled ? styles.disabled : null, style]}
    >
      <View
        {...panResponder.panHandlers}
        style={[
          styles.track,
          {
            width: cfg.trackW,
            height: cfg.trackH,
            borderRadius: cfg.trackH / 2,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: tokens.backgrounds.neutral.secondary.default },
          ]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: tokens.backgrounds.brand.strong.default,
              opacity: trackOnOpacity,
            },
          ]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              top: cfg.offset,
              left: 0,
              width: cfg.thumb,
              height: cfg.thumb,
              borderRadius: cfg.thumb / 2,
              transform: [
                { translateX },
                { scaleX },
                { scaleY },
              ],
            },
          ]}
        />
      </View>

      {label || description ? (
        <View style={styles.labels}>
          {label ? (
            <Text variant="bodySm" color={labelColor}>
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[5],
    alignSelf: 'flex-start',
  },
  disabled: {
    opacity: 0.5,
  },
  track: {
    overflow: 'hidden',
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    backgroundColor: tokens.backgrounds.neutral.inverse.default,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  labels: {
    flexDirection: 'column',
  },
});
