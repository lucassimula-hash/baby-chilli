import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ChevronDown, Plus } from 'lucide-react-native';
import { Tabs, Text, tokens, type TabItem } from 'chilli-native';

const items: TabItem[] = [
  { label: 'label', value: 'tab1', icon: Plus, rightIcon: ChevronDown },
  { label: 'label', value: 'tab2', icon: Plus, rightIcon: ChevronDown },
  { label: 'label', value: 'tab3', icon: Plus, rightIcon: ChevronDown },
  { label: 'label', value: 'tab4', icon: Plus, rightIcon: ChevronDown },
];

const twoItems = items.slice(0, 2);

export default function TabsPlayground() {
  const [pillVal, setPillVal] = useState('tab1');
  const [underlineVal, setUnderlineVal] = useState('tab1');
  const [segmentedVal, setSegmentedVal] = useState('tab1');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Pill (default)">
        <Stack>
          <Tabs items={items} value={pillVal} onValueChange={setPillVal} type="pill" size="sm" />
          <Tabs items={items} value={pillVal} onValueChange={setPillVal} type="pill" size="md" />
          <Tabs items={items} value={pillVal} onValueChange={setPillVal} type="pill" size="lg" />
        </Stack>
      </Section>

      <Section title="Underline">
        <Stack>
          <Tabs
            items={items}
            value={underlineVal}
            onValueChange={setUnderlineVal}
            type="underline"
            size="sm"
          />
          <Tabs
            items={items}
            value={underlineVal}
            onValueChange={setUnderlineVal}
            type="underline"
            size="md"
          />
          <Tabs
            items={items}
            value={underlineVal}
            onValueChange={setUnderlineVal}
            type="underline"
            size="lg"
          />
        </Stack>
      </Section>

      <Section title="Segmented">
        <Stack>
          <Tabs
            items={twoItems}
            value={segmentedVal}
            onValueChange={setSegmentedVal}
            type="segmented"
            size="sm"
          />
          <Tabs
            items={twoItems}
            value={segmentedVal}
            onValueChange={setSegmentedVal}
            type="segmented"
            size="md"
          />
          <Tabs
            items={twoItems}
            value={segmentedVal}
            onValueChange={setSegmentedVal}
            type="segmented"
            size="lg"
          />
        </Stack>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Stack({ children }: { children: React.ReactNode }) {
  return <View style={styles.stack}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  stack: { gap: tokens.spacing[6], alignItems: 'flex-start' },
});
