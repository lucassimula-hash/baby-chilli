import { Bell, ChevronRight, Heart, Mail, Star, X } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Text, tokens } from 'chilli-native';

const SIZES = [16, 20, 24, 32] as const;

const COLORS = [
  { label: 'neutralPrimary', value: tokens.iconColors.neutralPrimary },
  { label: 'neutralSecondary', value: tokens.iconColors.neutralSecondary },
  { label: 'brandPrimary', value: tokens.iconColors.brandPrimary },
  { label: 'dangerPrimary', value: tokens.iconColors.dangerPrimary },
  { label: 'successPrimary', value: tokens.iconColors.successPrimary },
] as const;

const SOURCES = [Bell, Mail, ChevronRight, X] as const;

export default function IconPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes (Heart)">
        <View style={styles.row}>
          {SIZES.map((size) => (
            <View key={size} style={styles.cell}>
              <Icon source={Heart} size={size} />
              <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
                {size}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Colors (Star, size 24)">
        <View style={styles.row}>
          {COLORS.map((color) => (
            <View key={color.label} style={styles.cell}>
              <Icon source={Star} size={24} color={color.value} />
              <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
                {color.label}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Different sources">
        <View style={styles.row}>
          {SOURCES.map((SourceCmp, index) => (
            <Icon key={index} source={SourceCmp} size={24} />
          ))}
        </View>
      </Section>

      <Section title="Stroke width">
        <View style={styles.row}>
          {[1, 2, 3].map((strokeWidth) => (
            <View key={strokeWidth} style={styles.cell}>
              <Icon source={Heart} size={32} strokeWidth={strokeWidth} />
              <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
                {`strokeWidth ${strokeWidth}`}
              </Text>
            </View>
          ))}
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
  section: { gap: tokens.spacing[5] },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing[7],
    alignItems: 'center',
  },
  cell: { alignItems: 'center', gap: tokens.spacing[3] },
});
