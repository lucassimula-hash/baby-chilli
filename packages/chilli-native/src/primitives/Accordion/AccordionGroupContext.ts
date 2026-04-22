import { createContext } from 'react';

export type AccordionGroupContextValue = {
  openValue: string | null;
  toggle: (value: string) => void;
};

export const AccordionGroupContext = createContext<AccordionGroupContextValue | null>(null);
