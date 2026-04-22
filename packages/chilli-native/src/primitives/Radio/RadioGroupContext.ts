import { createContext } from 'react';

export type RadioGroupContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);
