import { Bell, Heart, Settings, X } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, tokens } from 'chilli-native';

const VARIANTS = [
  'primary',
  'secondary',
  'brand',
  'ghost',
  'danger',
  'danger-soft',
] as const;

const SIZES = ['sm', 'md', 'lg'] as const;

export default function IconButtonPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants × Sizes">
        {VARIANTS.map((variant) => (
          <View key={variant} style={styles.row}>
            {SIZES.map((size) => (
              <View key={`${variant}-${size}`} style={styles.cell}>
                <IconButton
                  variant={variant}
                  size={size}
                  icon={Heart}
                  accessibilityLabel={`${variant} ${size}`}
                  onPress={() => {}}
                />
                <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
                  {`${variant} ${size}`}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </Section>

      <Section title="Different icons">
        <View style={styles.row}>
          <IconButton icon={Heart} accessibilityLabel="Like" onPress={() => {}} />
          <IconButton icon={Bell} accessibilityLabel="Notifications" onPress={() => {}} />
          <IconButton icon={Settings} accessibilityLabel="Settings" onPress={() => {}} />
          <IconButton icon={X} accessibilityLabel="Close" onPress={() => {}} />
        </View>
      </Section>

      <Section title="States">
        <View style={styles.row}>
          <IconButton icon={Heart} accessibilityLabel="Default" onPress={() => {}} />
          <IconButton icon={Heart} accessibilityLabel="Disabled" disabled />
          <IconButton icon={Heart} accessibilityLabel="Loading" loading />
        </View>
      </Section>

      <Section title="Glass">
        <View style={[styles.row, styles.glassBg]}>
          <View style={[styles.glassBlob, styles.glassBlobBrand]} />
          <View style={[styles.glassBlob, styles.glassBlobNeutral]} />
          <IconButton
            variant="primary"
            glass
            icon={Heart}
            accessibilityLabel="Primary glass"
            onPress={() => {}}
          />
          <IconButton
            variant="secondary"
            glass
            icon={Settings}
            accessibilityLabel="Secondary glass"
            onPress={() => {}}
          />
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {
            'danger + glass logs a single dev warning and renders as non-glass.'
          }
        </Text>
        <View style={[styles.row, styles.glassBg]}>
          <IconButton
            variant="danger"
            glass
            icon={Heart}
            accessibilityLabel="Danger glass"
            onPress={() => {}}
          />
        </View>
      </Section>

      <Section title="Accessibility">
        <IconButton
          variant="primary"
          icon={Heart}
          accessibilityLabel="Add to favorites"
          onPress={() => {}}
        />
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {'accessibilityRole=button (default), accessibilityLabel="Add to favorites".'}
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
  cell: { alignItems: 'center', gap: tokens.spacing[3] },
  glassBg: {
    position: 'relative',
    overflow: 'hidden',
    padding: tokens.spacing[6],
    borderRadius: tokens.radius[6],
    backgroundColor: tokens.backgrounds.neutral.primary.default,
  },
  glassBlob: {
    position: 'absolute',
    borderRadius: tokens.radius.full,
  },
  glassBlobBrand: {
    width: 96,
    height: 96,
    top: -24,
    left: -12,
    backgroundColor: tokens.backgrounds.brand.strong.default,
  },
  glassBlobNeutral: {
    width: 80,
    height: 80,
    right: -8,
    bottom: -12,
    backgroundColor: tokens.backgrounds.neutral.inverse.default,
  },
});
