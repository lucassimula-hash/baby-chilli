import type { ComponentType } from 'react';

/**
 * Shape that any icon component (typically from `lucide-react-native`) must satisfy
 * to be passable as `leftIcon` / `rightIcon` / `icon` in this DS.
 * Compatible with all Lucide icons.
 */
export type IconComponent = ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;
