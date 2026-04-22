// Foundations
export { tokens } from './foundations/theme';
export type { Tokens } from './foundations/theme';

// Re-export individual token groups for convenience
export {
  colors,
  spacing,
  radius,
  borderWidth,
  size,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
  backgrounds,
  textColors,
  borders,
  iconColors,
  buttons,
  links,
  shadows,
} from './foundations/tokens';

export type {
  Colors,
  Spacing,
  Radius,
  BorderWidth,
  Size,
  FontSize,
  LineHeight,
  LetterSpacing,
  FontFamily,
  TextStyles,
  TextStyleVariant,
  Backgrounds,
  TextColors,
  Borders,
  IconColors,
  Buttons,
  Links,
  Shadows,
  ShadowToken,
} from './foundations/tokens';

// Platform helpers
export { resolveStateSlot, pickStateful, shadow } from './foundations/platform';
export type { InteractionState, StateSlot } from './foundations/platform';

// Fonts
export { useLoadChilliFonts, fontAssets } from './foundations/fonts';

// Primitives
export { Text } from './primitives/Text';
export type { TextProps } from './primitives/Text';
export { Button } from './primitives/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './primitives/Button';
export { Icon } from './primitives/Icon';
export type { IconProps, IconComponent } from './primitives/Icon';
export { IconButton } from './primitives/IconButton';
export type { IconButtonProps, IconButtonSize } from './primitives/IconButton';
export { Input } from './primitives/Input';
export type { InputActionButton, InputProps } from './primitives/Input';
export { Textarea } from './primitives/Textarea';
export type { TextareaProps } from './primitives/Textarea';
export { SearchBar } from './primitives/SearchBar';
export type { SearchBarProps } from './primitives/SearchBar';
export { Select } from './primitives/Select';
export type {
  SelectOption,
  SelectProps,
  SelectSize,
  SelectVariant,
} from './primitives/Select';
export { Toggle } from './primitives/Toggle';
export type { ToggleProps, ToggleSize } from './primitives/Toggle';
export { Radio, RadioGroup } from './primitives/Radio';
export type {
  RadioProps,
  RadioGroupProps,
  RadioSize,
  RadioOrientation,
} from './primitives/Radio';
export { Checkbox } from './primitives/Checkbox';
export type { CheckboxProps, CheckboxSize } from './primitives/Checkbox';
export { AccordionGroup, AccordionItem } from './primitives/Accordion';
export type {
  AccordionGroupProps,
  AccordionItemProps,
} from './primitives/Accordion';
export { Tabs } from './primitives/Tabs';
export type { TabsProps, TabsType, TabsSize, TabItem } from './primitives/Tabs';
export { Dropdown, MenuItem } from './primitives/Dropdown';
export type { DropdownSize, DropdownContextValue } from './primitives/Dropdown';
export { Menu } from './primitives/Menu';
export type { MenuOption, MenuProps, MenuTriggerProps } from './primitives/Menu';
export { ProgressBar } from './primitives/ProgressBar';
export type {
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarLabelPosition,
} from './primitives/ProgressBar';
export { Tooltip } from './primitives/Tooltip';
export type { TooltipProps, TooltipSide } from './primitives/Tooltip';
export { NumberInput } from './primitives/NumberInput';
export type { NumberInputProps } from './primitives/NumberInput';
export { DatePicker } from './primitives/DatePicker';
export type { DatePickerProps } from './primitives/DatePicker';
export { FormTitle } from './primitives/FormTitle';
export type { FormTitleProps } from './primitives/FormTitle';
export { FlagIcon, FLAG_URLS, FLAG_OPTIONS } from './primitives/FlagIcon';
export type { FlagIconProps, FlagCode } from './primitives/FlagIcon';
export { SocialButton } from './primitives/SocialButton';
export type {
  SocialButtonProps,
  SocialButtonVariant,
  SocialProvider,
} from './primitives/SocialButton';
export { SelectDatePicker } from './primitives/SelectDatePicker';
export type { SelectDatePickerProps } from './primitives/SelectDatePicker';
export { ActionInput } from './primitives/ActionInput';
export type { ActionInputProps } from './primitives/ActionInput';
export { Badge } from './primitives/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './primitives/Badge';
export { Chip } from './primitives/Chip';
export type { ChipProps, ChipType, ChipSize, ChipVariant } from './primitives/Chip';
export { Avatar } from './primitives/Avatar';
export type { AvatarProps, AvatarSize } from './primitives/Avatar';
export { AvatarGroup } from './primitives/AvatarGroup';
export type { AvatarGroupProps } from './primitives/AvatarGroup';
export { AvatarDuo } from './primitives/AvatarDuo';
export type { AvatarDuoProps } from './primitives/AvatarDuo';
export { AvatarLabel } from './primitives/AvatarLabel';
export type { AvatarLabelProps, AvatarLabelSize } from './primitives/AvatarLabel';

// Remaining primitives — added phase by phase as they land:
