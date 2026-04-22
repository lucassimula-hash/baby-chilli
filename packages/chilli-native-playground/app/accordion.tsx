import { ScrollView, StyleSheet, View } from 'react-native';
import { AccordionGroup, AccordionItem, Text, tokens } from 'chilli-native';

const faqContent =
  'Install the component and import it into your project. The accordion supports both single and multiple expand modes.';

export default function AccordionPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (standalone, defaultOpen)">
        <AccordionItem title="Question title" defaultOpen>
          {faqContent}
        </AccordionItem>
      </Section>

      <Section title="Group (only one open at a time)">
        <AccordionGroup defaultValue="q1">
          <AccordionItem value="q1" title="What is Chilli?">
            Chilli is a design system built for modern apps with a focus on consistency and developer experience.
          </AccordionItem>
          <AccordionItem value="q2" title="How do I install it?">
            {faqContent}
          </AccordionItem>
          <AccordionItem value="q3" title="Can I customize the theme?">
            Yes, all colors and tokens are defined in foundations and can be overridden.
          </AccordionItem>
        </AccordionGroup>
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
