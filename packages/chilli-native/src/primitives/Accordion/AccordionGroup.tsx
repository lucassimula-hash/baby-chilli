import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { AccordionGroupContext } from './AccordionGroupContext';
import type { AccordionGroupProps } from './Accordion.types';

export function AccordionGroup({ defaultValue, children, style }: AccordionGroupProps) {
  const [openValue, setOpenValue] = useState<string | null>(defaultValue ?? null);

  const toggle = useCallback((value: string) => {
    setOpenValue((prev) => (prev === value ? null : value));
  }, []);

  const ctxValue = useMemo(() => ({ openValue, toggle }), [openValue, toggle]);

  return (
    <AccordionGroupContext.Provider value={ctxValue}>
      <View style={style}>{children}</View>
    </AccordionGroupContext.Provider>
  );
}
