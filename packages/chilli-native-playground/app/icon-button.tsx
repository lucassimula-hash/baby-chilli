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
          <View style={[styles.glassBlob, styles.glassBlobAccent]} />
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
          <IconButton
            variant="brand"
            glass
            icon={Bell}
            accessibilityLabel="Brand glass"
            onPress={() => {}}
          />
          <IconButton
            variant="ghost"
            glass
            icon={X}
            accessibilityLabel="Ghost glass"
            onPress={() => {}}
          />
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {'primary, secondary, brand et ghost sont supportes en glass.'}
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
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {'danger + glass log un warning en dev et retombe sur le rendu standard.'}
        </Text>
      </Section>

      <Section title="Surface comparison">
        <View style={styles.surfaceStack}>
          <View style={[styles.row, styles.surfaceCard]}>
            <IconButton
              variant="primary"
              icon={Heart}
              accessibilityLabel="Primary standard on neutral surface"
              onPress={() => {}}
            />
            <IconButton
              variant="secondary"
              icon={Settings}
              accessibilityLabel="Secondary standard on neutral surface"
              onPress={() => {}}
            />
            <IconButton
              variant="brand"
              icon={Bell}
              accessibilityLabel="Brand standard on neutral surface"
              onPress={() => {}}
            />
          </View>
          <View style={[styles.row, styles.glassBg]}>
            <View style={[styles.glassBlob, styles.glassBlobBrand]} />
            <View style={[styles.glassBlob, styles.glassBlobNeutral]} />
            <View style={[styles.glassBlob, styles.glassBlobAccent]} />
            <IconButton
              variant="primary"
              glass
              icon={Heart}
              accessibilityLabel="Primary glass on expressive surface"
              onPress={() => {}}
            />
            <IconButton
              variant="secondary"
              glass
              icon={Settings}
              accessibilityLabel="Secondary glass on expressive surface"
              onPress={() => {}}
            />
            <IconButton
              variant="brand"
              glass
              icon={Bell}
              accessibilityLabel="Brand glass on expressive surface"
              onPress={() => {}}
            />
          </View>
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {'Cette comparaison aide a valider le contraste entre rendu standard et rendu glass.'}
        </Text>
      </Section>

      <Section title="Glass states">
        <View style={[styles.row, styles.glassBg]}>
          <View style={[styles.glassBlob, styles.glassBlobBrand]} />
          <View style={[styles.glassBlob, styles.glassBlobNeutral]} />
          <View style={[styles.glassBlob, styles.glassBlobAccent]} />
          <IconButton
            variant="primary"
            glass
            icon={Heart}
            accessibilityLabel="Primary glass default"
            onPress={() => {}}
          />
          <IconButton
            variant="primary"
            glass
            icon={Heart}
            accessibilityLabel="Primary glass disabled"
            disabled
          />
          <IconButton
            variant="primary"
            glass
            icon={Heart}
            accessibilityLabel="Primary glass loading"
            loading
          />
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {'Le mode disabled et loading reste volontairement sur le style de fallback non-glass.'}
        </Text>
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
  surfaceStack: { gap: tokens.spacing[4] },
  surfaceCard: {
    paddingHorizontal: tokens.spacing[7],
    paddingVertical: tokens.spacing[6],
    borderRadius: tokens.radius[6],
    backgroundColor: tokens.backgrounds.neutral.primary.default,
  },
  glassBg: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: tokens.spacing[7],
    paddingVertical: tokens.spacing[6],
    borderRadius: tokens.radius[6],
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
  },
  glassBlob: {
    position: 'absolute',
    borderRadius: tokens.radius.full,
  },
  glassBlobBrand: {
    width: 88,
    height: 88,
    top: -36,
    left: -28,
    backgroundColor: tokens.colors.opacity.brand[500],
  },
  glassBlobNeutral: {
    width: 72,
    height: 72,
    right: -20,
    top: -18,
    backgroundColor: tokens.colors.opacity.neutral[400],
  },
  glassBlobAccent: {
    width: 96,
    height: 96,
    right: 24,
    bottom: -54,
    backgroundColor: tokens.colors.opacity.brand[300],
  },
});
