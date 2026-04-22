import { ScrollView, StyleSheet, View } from 'react-native';
import { Save } from 'lucide-react-native';
import { Button, Text, Tooltip, tokens } from 'chilli-native';

export default function TooltipPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Basic (top, default)">
        <Tooltip content="This is a tooltip">
          <Button variant="secondary">Hover / long-press me</Button>
        </Tooltip>
      </Section>

      <Section title="Placements">
        <View style={styles.row}>
          <Tooltip content="Top tooltip" side="top">
            <Button variant="secondary" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <Button variant="secondary" size="sm">Right</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="secondary" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" side="left">
            <Button variant="secondary" size="sm">Left</Button>
          </Tooltip>
        </View>
      </Section>

      <Section title="Rich content">
        <Tooltip
          content={
            <View style={{ gap: tokens.spacing[2] }}>
              <Text variant="bodySm" color={tokens.textColors.baseAlternate}>
                Save document
              </Text>
              <Text variant="bodyXs" color={tokens.textColors.baseAlternate}>
                Long-press to keep open
              </Text>
            </View>
          }
        >
          <Button variant="brand" leftIcon={Save}>Save</Button>
        </Tooltip>
      </Section>

      <Section title="Delay">
        <View style={styles.row}>
          <Tooltip content="No delay" delayDuration={0}>
            <Button variant="secondary" size="sm">No delay</Button>
          </Tooltip>
          <Tooltip content="500ms delay" delayDuration={500}>
            <Button variant="secondary" size="sm">500ms</Button>
          </Tooltip>
        </View>
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
  row: { flexDirection: 'row', gap: tokens.spacing[5], flexWrap: 'wrap' },
});
