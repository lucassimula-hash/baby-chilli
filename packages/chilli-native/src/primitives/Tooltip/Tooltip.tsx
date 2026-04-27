import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { TooltipProps, TooltipSide } from './Tooltip.types';

const ARROW_SIZE = 8;
const MAX_WIDTH = 280;

export function Tooltip({
  content,
  children,
  side = 'top',
  sideOffset = 8,
  delayDuration = 200,
}: TooltipProps) {
  const wrapperRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const cancelShowTimer = useCallback(() => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
  }, []);

  const cancelHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const cancelLongPressTimer = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const measureAndOpen = useCallback(() => {
    const node = wrapperRef.current;
    if (!node) return;
    node.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  }, []);

  const showWithDelay = useCallback(() => {
    cancelHideTimer();
    cancelShowTimer();
    if (delayDuration <= 0) {
      measureAndOpen();
    } else {
      showTimer.current = setTimeout(measureAndOpen, delayDuration);
    }
  }, [cancelHideTimer, cancelShowTimer, delayDuration, measureAndOpen]);

  const hideWithDelay = useCallback(() => {
    cancelShowTimer();
    cancelHideTimer();
    hideTimer.current = setTimeout(() => setOpen(false), 80);
  }, [cancelHideTimer, cancelShowTimer]);

  const handleClose = useCallback(() => {
    cancelShowTimer();
    cancelHideTimer();
    cancelLongPressTimer();
    setOpen(false);
  }, [cancelShowTimer, cancelHideTimer, cancelLongPressTimer]);

  // Touch handlers for native long-press (do not interfere with inner Pressable taps).
  const handleTouchStart = useCallback(
    (_e: GestureResponderEvent) => {
      if (Platform.OS === 'web') return;
      cancelLongPressTimer();
      longPressTimer.current = setTimeout(measureAndOpen, delayDuration);
    },
    [cancelLongPressTimer, delayDuration, measureAndOpen],
  );

  const handleTouchEnd = useCallback(() => {
    if (Platform.OS === 'web') return;
    cancelLongPressTimer();
  }, [cancelLongPressTimer]);

  useEffect(() => () => {
    cancelShowTimer();
    cancelHideTimer();
    cancelLongPressTimer();
  }, [cancelShowTimer, cancelHideTimer, cancelLongPressTimer]);

  const webHandlers =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: showWithDelay,
          onMouseLeave: hideWithDelay,
        } as Record<string, () => void>)
      : null;

  const wrapper = (
    <View
      ref={wrapperRef}
      collapsable={false}
      style={styles.triggerWrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...(webHandlers ?? {})}
    >
      {children}
    </View>
  );

  if (Platform.OS === 'web' && open) {
    // Render the bubble via react-dom portal so it sits at document.body level,
    // avoiding parent stacking contexts and Modal-induced scroll lock.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const reactDom = require('react-dom') as { createPortal: (node: React.ReactNode, target: Element) => React.ReactElement };
    const { createPortal } = reactDom;
    const portalTarget = typeof document !== 'undefined' ? document.body : null;
    return (
      <>
        {wrapper}
        {portalTarget
          ? createPortal(
              <TooltipBubble
                anchor={anchor}
                side={side}
                sideOffset={sideOffset}
                screenWidth={screenWidth}
                screenHeight={screenHeight}
              >
                {content}
              </TooltipBubble>,
              portalTarget,
            )
          : null}
      </>
    );
  }

  return (
    <>
      {wrapper}
      {open && Platform.OS !== 'web' ? (
        <Modal
          transparent
          visible
          animationType="none"
          onRequestClose={handleClose}
          statusBarTranslucent
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
          <TooltipBubble
            anchor={anchor}
            side={side}
            sideOffset={sideOffset}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
          >
            {content}
          </TooltipBubble>
        </Modal>
      ) : null}
    </>
  );
}

type BubbleProps = {
  anchor: { x: number; y: number; width: number; height: number };
  side: TooltipSide;
  sideOffset: number;
  screenWidth: number;
  screenHeight: number;
  children: React.ReactNode;
};

function TooltipBubble({
  anchor,
  side,
  sideOffset,
  screenWidth,
  screenHeight,
  children,
}: BubbleProps) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (size && size.w === width && size.h === height) return;
    setSize({ w: width, h: height });
  };

  const position = computePosition(anchor, side, sideOffset, size, screenWidth, screenHeight);

  return (
    <View
      onLayout={handleLayout}
      pointerEvents="none"
      style={[
        styles.bubble,
        {
          top: position.top,
          left: position.left,
          opacity: size ? 1 : 0,
        },
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text variant="bodySm" color={tokens.textColors.baseAlternate}>
          {String(children)}
        </Text>
      ) : (
        children
      )}
      <View pointerEvents="none" style={[styles.arrowBase, getArrowPositionStyle(side)]} />
    </View>
  );
}

function computePosition(
  anchor: { x: number; y: number; width: number; height: number },
  side: TooltipSide,
  sideOffset: number,
  size: { w: number; h: number } | null,
  screenW: number,
  screenH: number,
) {
  const w = size?.w ?? 0;
  const h = size?.h ?? 0;

  let top = 0;
  let left = 0;

  switch (side) {
    case 'top':
      top = anchor.y - h - sideOffset;
      left = anchor.x + (anchor.width - w) / 2;
      break;
    case 'bottom':
      top = anchor.y + anchor.height + sideOffset;
      left = anchor.x + (anchor.width - w) / 2;
      break;
    case 'left':
      top = anchor.y + (anchor.height - h) / 2;
      left = anchor.x - w - sideOffset;
      break;
    case 'right':
      top = anchor.y + (anchor.height - h) / 2;
      left = anchor.x + anchor.width + sideOffset;
      break;
  }

  const margin = 8;
  if (w > 0) left = Math.max(margin, Math.min(left, screenW - w - margin));
  if (h > 0) top = Math.max(margin, Math.min(top, screenH - h - margin));

  return { top, left };
}

function getArrowPositionStyle(side: TooltipSide) {
  const halfArrow = ARROW_SIZE / 2;
  switch (side) {
    case 'top':
      return { bottom: -halfArrow, left: '50%' as const, marginLeft: -halfArrow };
    case 'bottom':
      return { top: -halfArrow, left: '50%' as const, marginLeft: -halfArrow };
    case 'left':
      return { right: -halfArrow, top: '50%' as const, marginTop: -halfArrow };
    case 'right':
      return { left: -halfArrow, top: '50%' as const, marginTop: -halfArrow };
  }
}

const styles = StyleSheet.create({
  triggerWrapper: {
    alignSelf: 'flex-start',
  },
  bubble: {
    position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
    paddingHorizontal: tokens.spacing[5],
    paddingVertical: tokens.spacing[4],
    borderRadius: tokens.radius[5],
    maxWidth: MAX_WIDTH,
    backgroundColor: tokens.backgrounds.neutral.inverse.default,
    borderWidth: 1,
    borderColor: tokens.borders.default,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 9999,
  },
  arrowBase: {
    position: 'absolute',
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    backgroundColor: tokens.backgrounds.neutral.inverse.default,
    borderWidth: 1,
    borderColor: tokens.borders.default,
    transform: [{ rotate: '45deg' }],
  },
});
