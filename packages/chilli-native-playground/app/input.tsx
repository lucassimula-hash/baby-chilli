import { useState } from 'react';
import { ChevronRight, Mail, MapPin, Search } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input, Text, tokens } from 'chilli-native';

export default function InputPlayground() {
  const [email, setEmail] = useState('lucas@chilli.app');
  const [query, setQuery] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <Input
          label="Label"
          placeholder="placeholder"
          helperText="helper text"
          leftIcon={<MapPin size={20} color={tokens.textColors.baseSecondary} />}
          rightIcon={<ChevronRight size={20} color={tokens.textColors.baseSecondary} />}
          accessibilityLabel="Default input"
        />
      </Section>

      <Section title="Clearable">
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          helperText="We'll never share your email."
          leftIcon={<Mail size={20} color={tokens.textColors.baseSecondary} />}
          clearable
          onClear={() => setEmail('')}
          accessibilityLabel="Email input"
        />
      </Section>

      <Section title="Leading text + action">
        <Input
          label="Website"
          leadingText="https://"
          placeholder="your-site.com"
          actionButton={{ label: 'Open', onPress: () => {} }}
          helperText="Enter your website URL"
          accessibilityLabel="Website input"
        />
      </Section>

      <Section title="Error">
        <Input
          label="Username"
          value="ab"
          error="Username must be at least 3 characters."
          leftIcon={<Search size={20} color={tokens.textColors.baseSecondary} />}
          accessibilityLabel="Username input"
        />
      </Section>

      <Section title="Disabled">
        <Input
          label="Disabled field"
          placeholder="Can't edit this"
          disabled
          accessibilityLabel="Disabled input"
        />
      </Section>

      <Section title="Search style">
        <Input
          label="Search"
          value={query}
          onChangeText={setQuery}
          placeholder="Search supporters"
          leftIcon={<Search size={20} color={tokens.textColors.baseSecondary} />}
          clearable
          onClear={() => setQuery('')}
          accessibilityLabel="Search input"
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
