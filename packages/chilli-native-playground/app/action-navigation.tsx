import { ScrollView, StyleSheet, View } from 'react-native';
import { ActionNavigation, Text, tokens } from 'chilli-native';

export default function ActionNavigationPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Mobile (default)">
        <ActionNavigation title="Default" />
        <ActionNavigation title="With border" border />
        <ActionNavigation title="Scrolled" scrolled border />
      </Section>

      <Section title="Desktop">
        <ActionNavigation variant="desktop" title="Default" />
        <ActionNavigation variant="desktop" title="With border" border />
        <ActionNavigation variant="desktop" title="Scrolled" scrolled border />
      </Section>

      <Section title="With primary button">
        <ActionNavigation title="New Action" showButton buttonLabel="next" />
        <ActionNavigation variant="desktop" title="New Action" showButton buttonLabel="publish" />
      </Section>

      <Section title="Without close / custom actions">
        <ActionNavigation title="Read-only" showClose={false} />
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
