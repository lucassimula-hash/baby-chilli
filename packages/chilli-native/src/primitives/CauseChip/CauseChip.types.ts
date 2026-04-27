import type { StyleProp, ViewStyle } from 'react-native';
import type { CauseColor } from '../../foundations/tokens';

export type CauseChipSize = 'xs' | 'md' | 'lg';
export type CauseChipType = 'default' | 'glass';

export type CauseChipProps = {
  label: string;
  color: CauseColor;
  size?: CauseChipSize;
  type?: CauseChipType;
  style?: StyleProp<ViewStyle>;
};

export type { CauseColor };
