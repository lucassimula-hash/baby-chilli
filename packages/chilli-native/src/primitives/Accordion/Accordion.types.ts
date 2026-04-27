import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type AccordionGroupProps = {
  /** Initial open item value. Only one item is open at a time within a group. */
  defaultValue?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type AccordionItemProps = {
  /** Required when nested in an AccordionGroup. Identifier for open-state tracking. */
  value?: string;
  title: string;
  children: ReactNode;
  /** Initial open state when used standalone (no parent group). */
  defaultOpen?: boolean;
  style?: StyleProp<ViewStyle>;
};
