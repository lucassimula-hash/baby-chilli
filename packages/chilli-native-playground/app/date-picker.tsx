import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DatePicker, Text, tokens } from 'chilli-native';

export default function DatePickerPlayground() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bounded, setBounded] = useState<Date | undefined>(undefined);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (no selection)">
        <DatePicker value={date} onChange={setDate} />
        <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
          {date ? date.toDateString() : 'Pick a date above'}
        </Text>
      </Section>

      <Section title="With min / max bounds (today -5 / +14)">
        <DatePicker
          value={bounded}
          onChange={setBounded}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
          {bounded ? bounded.toDateString() : 'Out-of-bound days are dimmed'}
        </Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5], alignItems: 'flex-start' },
});
