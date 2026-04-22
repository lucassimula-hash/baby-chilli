import { createContext } from 'react';

export type DropdownSize = 'sm' | 'md' | 'lg';

export type DropdownContextValue = {
  size: DropdownSize;
  checkedIndex?: number;
  registerItem: (index: number, y: number, height: number) => void;
  unregisterItem: (index: number) => void;
  onItemPress: (index: number) => void;
  hoveredIndex?: number;
};

export const DropdownContext = createContext<DropdownContextValue>({
  size: 'md',
  registerItem: () => {},
  unregisterItem: () => {},
  onItemPress: () => {},
});
