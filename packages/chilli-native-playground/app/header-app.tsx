import { ScrollView, StyleSheet, View } from 'react-native';
import { ChilliLogo, HeaderApp, Text, tokens } from 'chilli-native';

const AVATAR = { uri: 'https://i.pravatar.cc/128?img=33' };

export default function HeaderAppPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Home">
        <HeaderApp type="home" logo={<ChilliLogo type="symbol" size={32} />} avatarSource={AVATAR} />
      </Section>

      <Section title="Home (no notification dot)">
        <HeaderApp
          type="home"
          logo={<ChilliLogo type="symbol" size={32} />}
          avatarSource={AVATAR}
          hasNotificationDot={false}
        />
      </Section>

      <Section title="Search">
        <HeaderApp type="search" />
      </Section>

      <Section title="Notification">
        <HeaderApp type="notification" title="notifications" />
      </Section>

      <Section title="Profile">
        <HeaderApp type="profile" title="@seaspiracy" />
      </Section>

      <Section title="Profile (no settings)">
        <HeaderApp type="profile" title="@seaspiracy" showSettings={false} />
      </Section>

      <Section title="ChilliLogo — all variants">
        <View style={styles.logoGrid}>
          <ChilliLogo type="symbol" color="brand" size={48} />
          <ChilliLogo type="symbol" color="black" size={48} />
          <ChilliLogo type="symbol" color="white" size={48} />
          <ChilliLogo type="favicon" color="brand" size={48} />
          <ChilliLogo type="favicon" color="black" size={48} />
          <ChilliLogo type="favicon" color="white" size={48} />
          <ChilliLogo type="logo" color="brand" size={120} />
          <ChilliLogo type="logo" color="black" size={120} />
          <ChilliLogo type="logo" color="white" size={120} />
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
      <View style={styles.frame}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[4] },
  frame: {
    width: 375,
    alignSelf: 'center',
    backgroundColor: tokens.backgrounds.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: tokens.borders.default,
    borderRadius: tokens.radius[5],
    overflow: 'hidden',
  },
  logoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacing[6],
    padding: tokens.spacing[6],
  },
});
