import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { CauseChip, tokens, causeColors, type CauseColor } from 'chilli-native';

const COLORS = Object.keys(causeColors) as CauseColor[];

export default function CauseChipScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>CauseChip</Text>

      <Text style={styles.section}>Sizes</Text>
      <View style={styles.row}>
        <CauseChip label="xs chip" color="purple" size="xs" />
        <CauseChip label="md chip" color="purple" size="md" />
        <CauseChip label="lg chip" color="purple" size="lg" />
      </View>

      <Text style={styles.section}>Types</Text>
      <View style={styles.row}>
        <CauseChip label="default" color="caribbean-green" type="default" />
        <CauseChip label="glass" color="caribbean-green" type="glass" />
      </View>

      <Text style={styles.section}>All colors (default)</Text>
      <View style={styles.grid}>
        {COLORS.map((c) => (
          <CauseChip key={c} label={c} color={c} />
        ))}
      </View>

      <Text style={styles.section}>All colors (glass)</Text>
      <View style={styles.grid}>
        {COLORS.map((c) => (
          <CauseChip key={c} label={c} color={c} type="glass" />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[5] },
  heading: { color: tokens.textColors.basePrimary, fontSize: tokens.fontSize.xl, marginBottom: tokens.spacing[4] },
  section: { color: tokens.textColors.baseSecondary, fontSize: tokens.fontSize.sm, marginTop: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing[3] },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[3] },
});
