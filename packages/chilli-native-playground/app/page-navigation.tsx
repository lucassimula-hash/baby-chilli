import { ScrollView, StyleSheet, View } from 'react-native';
import { PageNavigation, Text, tokens } from 'chilli-native';

export default function PageNavigationPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Mobile (default)">
        <PageNavigation title="Default" />
        <PageNavigation title="With border" border />
        <PageNavigation title="Scrolled (elevated bg)" scrolled />
      </Section>

      <Section title="Desktop">
        <PageNavigation variant="desktop" title="Default" />
        <PageNavigation variant="desktop" title="With border" border />
        <PageNavigation variant="desktop" title="Scrolled" scrolled />
      </Section>

      <Section title="Without back">
        <PageNavigation title="Read-only" showBack={false} />
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
      <View style={styles.stack}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[4] },
  stack: { gap: tokens.spacing[5] },
});
