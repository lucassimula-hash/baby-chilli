import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SearchBar, Text, tokens } from 'chilli-native';

export default function SearchBarPlayground() {
  const [value, setValue] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <SearchBar
          placeholder="search"
          value={value}
          onChangeText={setValue}
          onClear={() => setValue('')}
        />
      </Section>

      <Section title="States">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Placeholder
        </Text>
        <SearchBar placeholder="search" value="" onChangeText={() => {}} />

        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Filled
        </Text>
        <SearchBar
          placeholder="search"
          value="search"
          onChangeText={() => {}}
          onClear={() => {}}
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
  section: { gap: tokens.spacing[5] },
});
