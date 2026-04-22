import { ScrollView, StyleSheet, View } from 'react-native';
import { SocialButton, Text, tokens } from 'chilli-native';

export default function SocialButtonPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default per provider">
        <SocialButton provider="apple" onPress={() => {}} />
        <SocialButton provider="google" onPress={() => {}} />
        <SocialButton provider="facebook" onPress={() => {}} />
        <SocialButton provider="apple-pay" onPress={() => {}} />
      </Section>

      <Section title="Variant override">
        <SocialButton provider="apple" variant="secondary" onPress={() => {}} />
        <SocialButton provider="google" variant="primary" onPress={() => {}} />
      </Section>

      <Section title="Custom label">
        <SocialButton provider="apple" label="Continue with Apple" onPress={() => {}} />
        <SocialButton provider="google" label="Continue with Google" onPress={() => {}} />
      </Section>

      <Section title="Disabled">
        <SocialButton provider="apple" disabled />
        <SocialButton provider="google" disabled />
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
  section: { gap: tokens.spacing[4] },
});
