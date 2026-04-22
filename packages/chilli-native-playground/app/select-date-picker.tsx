import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SelectDatePicker, Text, tokens } from 'chilli-native';

export default function SelectDatePickerPlayground() {
  const [focused, setFocused] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <SelectDatePicker onPress={() => {}} />
      </Section>

      <Section title="Toggle focused (tap to flip)">
        <SelectDatePicker focused={focused} onPress={() => setFocused((v) => !v)} />
      </Section>

      <Section title="With end time">
        <SelectDatePicker
          startDate="nov 12, 2025"
          startTime="5:30PM"
          endDate="nov 17, 2025"
          endTime="9:00PM"
        />
      </Section>

      <Section title="With helper text">
        <SelectDatePicker
          startDate="nov 12, 2025"
          startTime="5:30PM"
          endDate="nov 17, 2025"
          showHelperText
          helperText="event runs over 5 days"
        />
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
