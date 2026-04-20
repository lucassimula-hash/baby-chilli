import { ArrowRight, Heart } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, tokens } from 'chilli-native';

const VARIANTS = [
  'primary',
  'secondary',
  'brand',
  'ghost',
  'danger',
  'danger-soft',
] as const;

const SIZES = ['xsm', 'sm', 'md', 'lg'] as const;

export default function ButtonPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants × Sizes">
        {VARIANTS.map((variant) => (
          <View key={variant} style={styles.row}>
            {SIZES.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size} onPress={() => {}}>
                {`${variant} ${size}`}
              </Button>
            ))}
          </View>
        ))}
      </Section>

      <Section title="With icons">
        <View style={styles.row}>
          <Button variant="primary" leftIcon={Heart} onPress={() => {}}>
            Like
          </Button>
          <Button variant="brand" rightIcon={ArrowRight} onPress={() => {}}>
            Continue
          </Button>
          <Button
            variant="secondary"
            leftIcon={Heart}
            rightIcon={ArrowRight}
            onPress={() => {}}
          >
            Both
          </Button>
        </View>
      </Section>

      <Section title="States">
        <View style={styles.row}>
          <Button variant="primary" onPress={() => {}}>
            default
          </Button>
          <Button variant="primary" disabled>
            disabled
          </Button>
          <Button variant="primary" loading>
            loading
          </Button>
        </View>
      </Section>

      <Section title="Glass (iOS native blur, web backdrop-filter)">
        <View style={[styles.row, styles.glassBg]}>
          <Button variant="primary" glass onPress={() => {}}>
            primary glass
          </Button>
          <Button variant="brand" glass onPress={() => {}}>
            brand glass
          </Button>
          <Button variant="secondary" glass onPress={() => {}}>
            secondary glass
          </Button>
          <Button variant="ghost" glass onPress={() => {}}>
            ghost glass
          </Button>
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          danger + glass logs a single dev warning and renders as non-glass:
        </Text>
        <View style={[styles.row, styles.glassBg]}>
          <Button variant="danger" glass onPress={() => {}}>
            danger glass
          </Button>
        </View>
      </Section>

      <Section title="Edge cases">
        <Button variant="primary" onPress={() => {}}>
          {'A very long label that might wrap inside the button'}
        </Button>
        <Button variant="ghost" onPress={() => {}}>
          ghost no icon
        </Button>
      </Section>

      <Section title="Accessibility">
        <Button
          variant="primary"
          accessibilityLabel="Submit the form"
          onPress={() => {}}
        >
          Submit
        </Button>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {'accessibilityRole=button (default), accessibilityLabel="Submit the form".'}
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
  section: { gap: tokens.spacing[5] },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing[5],
    alignItems: 'center',
  },
  glassBg: {
    padding: tokens.spacing[6],
    borderRadius: tokens.radius[6],
    backgroundColor: tokens.colors.brand[800],
  },
});
