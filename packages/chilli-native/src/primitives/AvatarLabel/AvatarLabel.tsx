import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, type AvatarProps } from '../Avatar';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';

export type AvatarLabelSize = 'sm' | 'md' | 'lg';

export type AvatarLabelProps = {
  avatar: AvatarProps;
  title: string;
  subtitle?: string;
  size?: AvatarLabelSize;
  style?: StyleProp<ViewStyle>;
};

const SIZE_AVATAR: Record<AvatarLabelSize, number> = { sm: 24, md: 32, lg: 40 };
const SIZE_TITLE: Record<AvatarLabelSize, 'bodyXs' | 'bodySm' | 'bodyMd'> = {
  sm: 'bodyXs',
  md: 'bodySm',
  lg: 'bodySm',
};
const SIZE_SUBTITLE: Record<AvatarLabelSize, 'bodyXs' | 'bodySm'> = {
  sm: 'bodyXs',
  md: 'bodyXs',
  lg: 'bodySm',
};
const SIZE_GAP: Record<AvatarLabelSize, number> = {
  sm: tokens.spacing[2],
  md: tokens.spacing[2],
  lg: tokens.spacing[4],
};

export function AvatarLabel({
  avatar,
  title,
  subtitle,
  size = 'md',
  style,
}: AvatarLabelProps) {
  return (
    <View style={[styles.row, { gap: SIZE_GAP[size] }, style]}>
      <Avatar {...avatar} size={SIZE_AVATAR[size]} />
      <View style={styles.text}>
        <Text variant={SIZE_TITLE[size]} color={tokens.textColors.basePrimary}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant={SIZE_SUBTITLE[size]} color={tokens.textColors.baseSecondary}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexShrink: 1,
    gap: tokens.spacing[1],
  },
});
