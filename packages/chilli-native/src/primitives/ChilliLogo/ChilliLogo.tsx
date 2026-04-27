import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { CHILLI_FILL, CHILLI_LOGO_SPECS } from './paths';
import type { ChilliLogoProps } from './ChilliLogo.types';

export function ChilliLogo({
  type = 'symbol',
  color = 'brand',
  size = 32,
  fill,
  style,
}: ChilliLogoProps) {
  const spec = CHILLI_LOGO_SPECS[type];
  const ratio = spec.viewBoxHeight / spec.viewBoxWidth;
  const width = size;
  const height = size * ratio;
  const fillColor = fill ?? CHILLI_FILL[color];

  return (
    <View style={[{ width, height }, style]} accessibilityRole="image" accessibilityLabel="Chilli">
      <Svg width={width} height={height} viewBox={`0 0 ${spec.viewBoxWidth} ${spec.viewBoxHeight}`}>
        <Path d={spec.d} fill={fillColor} fillRule={spec.fillRule ?? 'nonzero'} />
      </Svg>
    </View>
  );
}
