import { ScrollView, StyleSheet, View } from 'react-native';
import { ChilliLogo, Text, tokens, type ChilliLogoColor, type ChilliLogoType } from 'chilli-native';

const TYPES: ChilliLogoType[] = ['symbol', 'favicon', 'logo'];
const COLORS: ChilliLogoColor[] = ['brand', 'black', 'white'];

export default function ChilliLogoPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>ChilliLogo</Text>

      {TYPES.map((type) => (
        <Section key={type} title={type}>
          <View style={styles.row}>
            {COLORS.map((color) => (
              <View key={color} style={styles.cell}>
                <ChilliLogo type={type} color={color} size={type === 'logo' ? 160 : 64} />
                <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
                  {color}
                </Text>
              </View>
            ))}
          </View>
        </Section>
      ))}

      <Section title="Symbol — sizes">
        <View style={styles.row}>
          {[16, 24, 32, 48, 64, 96].map((size) => (
            <ChilliLogo key={size} type="symbol" size={size} />
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
  content: { padding: tokens.spacing[7], gap: tokens.spacing[7] },
  heading: { color: tokens.textColors.basePrimary, fontSize: tokens.fontSize.xl, marginBottom: tokens.spacing[4] },
  section: { gap: tokens.spacing[4] },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: tokens.spacing[7],
  },
  cell: { gap: tokens.spacing[3], alignItems: 'center' },
});
