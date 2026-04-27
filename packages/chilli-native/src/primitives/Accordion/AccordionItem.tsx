import { isValidElement, useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import { AccordionGroupContext } from './AccordionGroupContext';
import type { AccordionItemProps } from './Accordion.types';

const DURATION = 200;

export function AccordionItem({
  value,
  title,
  children,
  defaultOpen = false,
  style,
}: AccordionItemProps) {
  const group = useContext(AccordionGroupContext);

  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isOpen = group && value !== undefined ? group.openValue === value : localOpen;

  const [measured, setMeasured] = useState(0);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const hasInit = useRef(false);

  // Initialize height from measurement once the inner content has reported its size.
  useEffect(() => {
    if (measured <= 0 || hasInit.current) return;
    hasInit.current = true;
    heightAnim.setValue(isOpen ? measured : 0);
  }, [measured, isOpen, heightAnim]);

  // Animate height on open/close.
  useEffect(() => {
    if (!hasInit.current) return;
    Animated.timing(heightAnim, {
      toValue: isOpen ? measured : 0,
      duration: DURATION,
      useNativeDriver: false,
    }).start();
  }, [isOpen, measured, heightAnim]);

  // Chevron rotation.
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const handleToggle = () => {
    if (group && value !== undefined) {
      group.toggle(value);
    } else {
      setLocalOpen((prev) => !prev);
    }
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const h = event.nativeEvent.layout.height;
    if (h !== measured) setMeasured(h);
  };

  const titleColor = isOpen ? tokens.textColors.basePrimary : tokens.textColors.baseSecondary;
  const chevronColor = isOpen ? tokens.textColors.basePrimary : tokens.textColors.baseSecondary;

  const headerStyle = isOpen
    ? [
        styles.header,
        {
          backgroundColor: tokens.backgrounds.neutral.primary.default,
          borderTopLeftRadius: tokens.radius[6],
          borderTopRightRadius: tokens.radius[6],
        },
      ]
    : [styles.header, { borderRadius: tokens.radius[6] }];

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={[styles.root, style]}>
      <Pressable onPress={handleToggle} accessibilityRole="button" style={headerStyle}>
        <Text variant="bodySm" color={titleColor} style={styles.title}>
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <ChevronRight size={20} color={chevronColor} />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[
          styles.contentClip,
          {
            height: heightAnim,
            backgroundColor: tokens.backgrounds.neutral.primary.default,
            borderBottomLeftRadius: tokens.radius[6],
            borderBottomRightRadius: tokens.radius[6],
          },
        ]}
      >
        <View onLayout={handleContentLayout} style={styles.content}>
          {typeof children === 'string' || typeof children === 'number' ? (
            <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
              {String(children)}
            </Text>
          ) : isValidElement(children) ? (
            children
          ) : (
            <>{children}</>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[2],
    paddingHorizontal: tokens.spacing[5],
    paddingVertical: tokens.spacing[4],
  },
  title: {
    flex: 1,
  },
  contentClip: {
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: tokens.spacing[5],
    paddingTop: tokens.spacing[1],
    paddingBottom: tokens.spacing[5],
  },
});
