import { iconColors } from '../../foundations/tokens';
import type { IconComponent } from './Icon.types';

export type IconProps = {
  /** The Lucide (or compatible) icon component to render. */
  source: IconComponent;
  /** Pixel size. Default: 20 (matches Button md icon). */
  size?: number;
  /** Stroke color. Default: tokens.iconColors.neutralPrimary. */
  color?: string;
  /** Stroke thickness. Default left to the underlying icon. */
  strokeWidth?: number;
};

/**
 * Standardized wrapper around any IconComponent (typically a Lucide icon).
 * Use directly: `<Icon source={Heart} />` — no registry layer.
 */
export function Icon({
  source: Component,
  size = 20,
  color = iconColors.neutralPrimary,
  strokeWidth,
}: IconProps) {
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
}
