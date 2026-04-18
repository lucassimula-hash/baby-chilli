import { colors } from './colors';

export const links = {
  primary: colors.link[500],
  hover: colors.link[600],
  pressed: colors.link[600],
  visited: colors.link[600],
} as const;

export type Links = typeof links;
