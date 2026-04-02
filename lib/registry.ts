export const components = [
    {
        name: "Accordion",
        slug: "accordion",
        description: "Collapsible content sections with animated expand/collapse, supporting single and multiple expand modes.",
        installCmd: "npx chilli@latest add accordion",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "accordion-default",
                demoCode: `import { AccordionItem } from "@chilli-ui/react"

export function AccordionDefault() {
  return (
    <AccordionItem title="Question title" defaultOpen>
      Install the component and import it into your project.
    </AccordionItem>
  )
}`
            },
            {
                title: "Single Expand",
                type: "preview",
                demoKey: "accordion-single",
                demoCode: `import { AccordionGroup, AccordionItem } from "@chilli-ui/react"

export function AccordionSingle() {
  return (
    <AccordionGroup type="single" defaultValue="q1">
      <AccordionItem value="q1" title="What is Chilli?">
        Chilli is a design system built for modern web applications.
      </AccordionItem>
      <AccordionItem value="q2" title="How do I install it?">
        Install the component and import it into your project.
      </AccordionItem>
      <AccordionItem value="q3" title="Can I customize the theme?">
        Yes, all colors are CSS custom properties you can override.
      </AccordionItem>
    </AccordionGroup>
  )
}`
            },
            {
                title: "Multiple Expand",
                type: "preview",
                demoKey: "accordion-multiple",
                demoCode: `import { AccordionGroup, AccordionItem } from "@chilli-ui/react"

export function AccordionMultiple() {
  return (
    <AccordionGroup type="multiple" defaultValue={["q1", "q3"]}>
      <AccordionItem value="q1" title="Single expand mode">
        Only one item can be open at a time.
      </AccordionItem>
      <AccordionItem value="q2" title="Multiple expand mode">
        Multiple items can be open simultaneously.
      </AccordionItem>
    </AccordionGroup>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "AccordionGroup",
                props: [
                    {
                        prop: "type",
                        type: '"single" | "multiple"',
                        default: '"single"',
                        description: "Whether one or multiple items can be open."
                    },
                    {
                        prop: "defaultValue",
                        type: "string | string[]",
                        default: "—",
                        description: "Initially open item(s)."
                    }
                ]
            },
            {
                title: "AccordionItem",
                props: [
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "Unique identifier when used inside a group."
                    },
                    {
                        prop: "title",
                        type: "string",
                        default: "—",
                        description: "The title text displayed in the header."
                    },
                    {
                        prop: "defaultOpen",
                        type: "boolean",
                        default: "false",
                        description: "Whether the item is open by default (standalone mode)."
                    },
                    {
                        prop: "children",
                        type: "ReactNode",
                        default: "—",
                        description: "The collapsible content."
                    }
                ]
            }
        ]
    },
    {
        name: "ActionTextArea",
        slug: "action-textarea",
        description: "A textarea with a prompt question, supporting Default and Glass styles for action-oriented forms.",
        installCmd: "npx chilli@latest add action-textarea",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "action-textarea-default",
                demoCode: `import { ActionTextArea } from "@chilli-ui/react"

export function ActionTextAreaDefault() {
  return <ActionTextArea placeholder="tap to add" />
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "action-textarea-states",
                demoCode: `import { ActionTextArea } from "@chilli-ui/react"

export function ActionTextAreaStates() {
  return (
    <div className="flex flex-col gap-6">
      <ActionTextArea placeholder="tap to add" />
      <ActionTextArea defaultValue="user description" />
      <ActionTextArea defaultValue="user description" error />
      <ActionTextArea placeholder="tap to add" disabled />
    </div>
  )
}`
            },
            {
                title: "Glass",
                type: "preview",
                demoKey: "action-textarea-glass",
                demoCode: `import { ActionTextArea } from "@chilli-ui/react"

export function ActionTextAreaGlass() {
  return (
    <div className="flex flex-col gap-6">
      <ActionTextArea placeholder="tap to add" glass />
      <ActionTextArea defaultValue="user description" glass />
      <ActionTextArea defaultValue="user description" glass error />
      <ActionTextArea placeholder="tap to add" glass disabled />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "ActionTextArea",
                props: [
                    {
                        prop: "prompt",
                        type: "string",
                        default: '"what\'s your strategy?..."',
                        description: "The prompt question displayed above the textarea."
                    },
                    {
                        prop: "glass",
                        type: "boolean",
                        default: "false",
                        description: "Whether to use the glass/dark style variant."
                    },
                    {
                        prop: "error",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the error state."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the textarea is disabled."
                    },
                    {
                        prop: "placeholder",
                        type: "string",
                        default: "—",
                        description: "Placeholder text for the textarea."
                    }
                ]
            }
        ]
    },
    {
        name: "Avatars",
        slug: "avatars",
        description: "Avatar primitives for profile photos, groups, duos, and labeled identity patterns across the product.",
        installCmd: "npx chilli@latest add avatar",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Avatar",
                type: "preview",
                demoKey: "avatar-sizes",
                demoCode: `import { Avatar } from "@chilli-ui/react"

export function AvatarSizes() {
  return (
    <div className="flex items-end gap-3">
      <Avatar size="xsm" src="https://i.pravatar.cc/200?u=1" alt="User" />
      <Avatar size="sm" src="https://i.pravatar.cc/200?u=2" alt="User" />
      <Avatar size="md" src="https://i.pravatar.cc/200?u=3" alt="User" />
      <Avatar size="lg" src="https://i.pravatar.cc/200?u=4" alt="User" />
      <Avatar size="xl" src="https://i.pravatar.cc/200?u=5" alt="User" />
    </div>
  )
}`
            },
            {
                title: "Avatar Group",
                type: "preview",
                demoKey: "avatar-group-default",
                demoCode: `import { AvatarGroup } from "@chilli-ui/react"

const users = [
  { src: "https://i.pravatar.cc/200?img=1" },
  { src: "https://i.pravatar.cc/200?img=2" },
  { src: "https://i.pravatar.cc/200?img=3" },
  { src: "https://i.pravatar.cc/200?img=4" },
  { src: "https://i.pravatar.cc/200?img=5" },
]

export function AvatarGroupDemo() {
  return <AvatarGroup avatars={users} size="md" showAddButton />
}`
            },
            {
                title: "Avatar Duo",
                type: "preview",
                demoKey: "avatar-duo-default",
                demoCode: `import { AvatarDuo } from "@chilli-ui/react"

export function AvatarDuoDemo() {
  return (
    <AvatarDuo
      size="lg"
      primarySrc="https://i.pravatar.cc/200?img=9"
      secondarySrc="https://i.pravatar.cc/200?img=10"
    />
  )
}`
            },
            {
                title: "Avatar Label",
                type: "preview",
                demoKey: "avatar-label-default",
                demoCode: `import { AvatarLabel } from "@chilli-ui/react"

export function AvatarLabelDemo() {
  return (
    <AvatarLabel
      size="lg"
      src="https://i.pravatar.cc/200?img=17"
      name="Username"
      supportingText="Supporting text"
    />
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Avatar",
                props: [
                    {
                        prop: "src",
                        type: "string",
                        default: "—",
                        description: "The image source URL."
                    },
                    {
                        prop: "alt",
                        type: "string",
                        default: "—",
                        description: "Alternative text for the image."
                    },
                    {
                        prop: "fallback",
                        type: "string",
                        default: '"?"',
                        description: "Text displayed when no image is available."
                    },
                    {
                        prop: "size",
                        type: '"xxsm" | "xsm" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"',
                        default: '"md"',
                        description: "The size of the avatar."
                    },
                    {
                        prop: "className",
                        type: "string",
                        default: "—",
                        description: "Additional CSS classes."
                    }
                ]
            },
            {
                title: "AvatarGroup",
                props: [
                    {
                        prop: "avatars",
                        type: "Array<{ src?: string; fallback?: string; alt?: string }>",
                        default: "[]",
                        description: "List of avatars to display."
                    },
                    {
                        prop: "size",
                        type: '"xxsm" | "xsm" | "sm" | "md" | "lg" | "xl" | "2xl"',
                        default: '"md"',
                        description: "The size shared by all avatars in the group."
                    },
                    {
                        prop: "max",
                        type: "number",
                        default: "all avatars",
                        description: "Maximum number of visible avatars before showing an overflow count."
                    },
                    {
                        prop: "spacing",
                        type: "number",
                        default: "auto",
                        description: "Optional custom overlap between avatars."
                    },
                    {
                        prop: "showAddButton",
                        type: "boolean",
                        default: "false",
                        description: "Displays the trailing circular add button shown in the Figma design."
                    }
                ]
            },
            {
                title: "AvatarDuo",
                props: [
                    {
                        prop: "primarySrc",
                        type: "string",
                        default: "—",
                        description: "Image source for the front avatar."
                    },
                    {
                        prop: "primaryFallback",
                        type: "string",
                        default: '"?"',
                        description: "Fallback text for the front avatar."
                    },
                    {
                        prop: "secondarySrc",
                        type: "string",
                        default: "—",
                        description: "Image source for the back avatar."
                    },
                    {
                        prop: "secondaryFallback",
                        type: "string",
                        default: '"?"',
                        description: "Fallback text for the back avatar."
                    },
                    {
                        prop: "size",
                        type: '"xxsm" | "xsm" | "sm" | "md" | "lg" | "xl"',
                        default: '"md"',
                        description: "The size preset of the duo container."
                    }
                ]
            },
            {
                title: "AvatarLabel",
                props: [
                    {
                        prop: "src",
                        type: "string",
                        default: "—",
                        description: "The image source URL."
                    },
                    {
                        prop: "fallback",
                        type: "string",
                        default: '"?"',
                        description: "Fallback text displayed inside the avatar."
                    },
                    {
                        prop: "name",
                        type: "string",
                        default: "—",
                        description: "Primary label shown next to the avatar."
                    },
                    {
                        prop: "supportingText",
                        type: "string",
                        default: "—",
                        description: "Optional secondary text shown below the name."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg" | "xl"',
                        default: '"md"',
                        description: "The size of the avatar label layout."
                    }
                ]
            }
        ]
    },
    {
        name: "Badge",
        slug: "badge",
        description: "A small label component used to display status, categories, or counts with various styles and colors.",
        installCmd: "npx chilli@latest add badge",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "badge-default",
                demoCode: `import { Badge } from "@chilli-ui/react"

export default function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "badge-sizes",
                demoCode: `import { Badge } from "@chilli-ui/react"

export default function BadgeSizes() {
  return (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Badge",
                props: [
                    {
                        prop: "variant",
                        type: '"default" | "secondary" | "success" | "warning" | "danger"',
                        default: '"default"',
                        description: "The visual style variant of the badge."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg"',
                        default: '"md"',
                        description: "The size of the badge."
                    },
                    {
                        prop: "children",
                        type: "ReactNode",
                        default: "—",
                        description: "The content of the badge."
                    },
                    {
                        prop: "className",
                        type: "string",
                        default: "—",
                        description: "Additional CSS classes."
                    }
                ]
            }
        ]
    },
    {
        name: "Button",
        slug: "button",
        description: "A versatile button component supporting multiple variants, sizes, and states for user interactions.",
        installCmd: "npx chilli@latest add button",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Variants",
                type: "preview",
                demoKey: "button-variants",
                demoCode: `import { Button } from "@chilli-ui/react"

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="brand">Brand</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="danger-soft">Danger Soft</Button>

    </div>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "button-sizes",
                demoCode: `import { Button } from "@chilli-ui/react"

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xsm">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`
            },
            {
                title: "With Icons",
                type: "preview",
                demoKey: "button-icons",
                demoCode: `import { Button } from "@chilli-ui/react"
import { Plus, ArrowRight, Search } from "lucide-react"

export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftIcon={Plus}>Create</Button>
      <Button rightIcon={ArrowRight}>Continue</Button>
      <Button leftIcon={Search} variant="secondary">Search</Button>
      <Button leftIcon={Plus} rightIcon={ArrowRight} variant="brand">
        Add Item
      </Button>
    </div>
  )
}`
            },
            {
                title: "Loading & Disabled",
                type: "preview",
                demoKey: "button-loading",
                demoCode: `import { Button } from "@chilli-ui/react"

export function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}`
            },
            {
                title: "Glass Style",
                type: "preview",
                demoKey: "button-glass",
                demoCode: `import { Button } from "@chilli-ui/react"

export function ButtonGlass() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-6">
      <Button variant="brand" glass>Brand Glass</Button>
      <Button variant="primary" glass>Primary Glass</Button>
      <Button variant="secondary" glass>Secondary Glass</Button>
      <Button variant="ghost" glass>Ghost Glass</Button>
    </div>
  )
}`
            },
            {
                title: "Social Login",
                type: "preview",
                demoKey: "button-social",
                demoCode: `import { SocialButton } from "@chilli-ui/react"

export function ButtonSocialLogin() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[358px]">
      <SocialButton provider="apple" />
      <SocialButton provider="google" />
      <SocialButton provider="facebook" />
      <SocialButton provider="apple-pay" />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Button",
                props: [
                    {
                        prop: "variant",
                        type: '"brand" | "primary" | "secondary" | "ghost" | "danger" | "danger-soft"',
                        default: '"primary"',
                        description: "The visual style variant of the button."
                    },
                    {
                        prop: "size",
                        type: '"xsm" | "sm" | "md" | "lg"',
                        default: '"md"',
                        description: "The size of the button."
                    },
                    {
                        prop: "glass",
                        type: "boolean",
                        default: "false",
                        description: "Enables glass morphism style with backdrop blur and semi-transparent background."
                    },
                    {
                        prop: "loading",
                        type: "boolean",
                        default: "false",
                        description: "Shows a spinning loader icon and disables the button."
                    },
                    {
                        prop: "leftIcon",
                        type: "LucideIcon",
                        default: "—",
                        description: "Icon component displayed before the button text."
                    },
                    {
                        prop: "rightIcon",
                        type: "LucideIcon",
                        default: "—",
                        description: "Icon component displayed after the button text."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the button is disabled."
                    },
                    {
                        prop: "asChild",
                        type: "boolean",
                        default: "false",
                        description: "Renders as the child element instead of a button."
                    },
                    {
                        prop: "children",
                        type: "ReactNode",
                        default: "—",
                        description: "The content of the button."
                    },
                    {
                        prop: "className",
                        type: "string",
                        default: "—",
                        description: "Additional CSS classes to merge."
                    }
                ]
            },
            {
                title: "SocialButton",
                props: [
                    {
                        prop: "provider",
                        type: '"apple" | "google" | "facebook" | "apple-pay"',
                        default: "—",
                        description: "Required. The social provider."
                    },
                    {
                        prop: "variant",
                        type: '"primary" | "secondary"',
                        default: "auto (based on provider)",
                        description: "Visual style override."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Disables the button."
                    },
                    {
                        prop: "className",
                        type: "string",
                        default: "—",
                        description: "Additional CSS classes."
                    }
                ]
            }
        ]
    },
    {
        name: "Checkbox",
        slug: "checkbox",
        description: "A form control that allows users to select one or more options from a set of choices.",
        installCmd: "npx chilli@latest add checkbox",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "checkbox-default",
                demoCode: `import { Checkbox } from "@chilli-ui/react"

export default function CheckboxDemo() {
  return (
    <div className="flex items-center gap-6">
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
      <Checkbox number={1} />
    </div>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "checkbox-sizes",
                demoCode: `import { Checkbox } from "@chilli-ui/react"

export default function CheckboxSizes() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Checkbox size="sm" />
        <Checkbox size="sm" checked />
        <Checkbox size="sm" number={1} />
      </div>
      <div className="flex items-center gap-3">
        <Checkbox size="md" />
        <Checkbox size="md" checked />
        <Checkbox size="md" number={1} />
      </div>
    </div>
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "checkbox-states",
                demoCode: `import { Checkbox } from "@chilli-ui/react"

export default function CheckboxStates() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox checked disabled />
    </div>
  )
}`
            },
            {
                title: "With Text",
                type: "preview",
                demoKey: "checkbox-text",
                demoCode: `import { Checkbox } from "@chilli-ui/react"

export default function CheckboxWithText() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Accept terms and conditions"
        description="You agree to our Terms of Service and Privacy Policy."
      />
      <Checkbox
        checked
        label="Enable notifications"
        description="Receive email notifications for new activity."
      />
      <Checkbox
        label="Disabled option"
        description="This option is not available."
        disabled
      />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Checkbox",
                props: [
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "The label text displayed next to the checkbox."
                    },
                    {
                        prop: "description",
                        type: "string",
                        default: "—",
                        description: "Description text displayed below the label."
                    },
                    {
                        prop: "checked",
                        type: "boolean",
                        default: "false",
                        description: "Controlled checked state."
                    },
                    {
                        prop: "indeterminate",
                        type: "boolean",
                        default: "false",
                        description: "Display an indeterminate (mixed) state."
                    },
                    {
                        prop: "number",
                        type: "number",
                        default: "—",
                        description: "Display a number inside the checkbox instead of a check icon."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md"',
                        default: '"md"',
                        description: "The size of the checkbox."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the checkbox is disabled."
                    },
                    {
                        prop: "onCheckedChange",
                        type: "(checked: boolean) => void",
                        default: "—",
                        description: "Callback when the checked state changes."
                    }
                ]
            }
        ]
    },
    {
        name: "Chip",
        slug: "chip",
        description: "A compact element used to represent tags, filters, or selections with optional avatars, social icons, and removable states.",
        installCmd: "npx chilli@latest add chip",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "chip-default",
                demoCode: `import { Chip } from "@chilli-ui/react"

export function ChipDefault() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip size="sm" label="Small" />
      <Chip size="md" label="Medium" />
      <Chip size="lg" label="Large" />
      <Chip size="xl" label="Extra Large" />
    </div>
  )
}`
            },
            {
                title: "Types",
                type: "preview",
                demoKey: "chip-types",
                demoCode: `import { Chip } from "@chilli-ui/react"

export function ChipTypes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip type="fill" label="Fill" />
      <Chip type="light" label="Light" />
      <Chip type="fill" variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=5" label="Fill Avatar" />
      <Chip type="light" variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=6" label="Light Avatar" />
    </div>
  )
}`
            },
            {
                title: "Avatar",
                type: "preview",
                demoKey: "chip-avatar",
                demoCode: `import { Chip } from "@chilli-ui/react"

export function ChipAvatar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=1" size="sm" label="Alice" />
      <Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=2" size="md" label="Bob" />
      <Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=3" size="lg" label="Charlie" />
      <Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=4" size="xl" label="Diana" />
    </div>
  )
}`
            },
            {
                title: "Social",
                type: "preview",
                demoKey: "chip-social",
                demoCode: `import { Chip } from "@chilli-ui/react"
import { Globe } from "lucide-react"

export function ChipSocial() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="social" socialIcon={<Globe size={12} />} size="sm" label="Globe" />
      <Chip variant="social" socialIcon={<Globe size={16} />} size="md" label="Globe" />
      <Chip variant="social" socialIcon={<Globe size={16} />} size="lg" label="Globe" />
      <Chip variant="social" socialIcon={<Globe size={20} />} size="xl" label="Globe" />
    </div>
  )
}`
            },
            {
                title: "Removable",
                type: "preview",
                demoKey: "chip-removable",
                demoCode: `import { Chip } from "@chilli-ui/react"

export function ChipRemovable() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip label="React" onRemove={() => {}} />
      <Chip label="TypeScript" onRemove={() => {}} />
      <Chip label="Tailwind" type="light" onRemove={() => {}} />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Chip",
                props: [
                    {
                        prop: "variant",
                        type: '"default" | "avatar" | "social"',
                        default: '"default"',
                        description: "The visual variant of the chip."
                    },
                    {
                        prop: "type",
                        type: '"fill" | "light"',
                        default: '"fill"',
                        description: "The background style — filled or outlined."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg" | "xl"',
                        default: '"md"',
                        description: "The size of the chip."
                    },
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "The text content of the chip."
                    },
                    {
                        prop: "avatarSrc",
                        type: "string",
                        default: "—",
                        description: "Image source for the avatar variant."
                    },
                    {
                        prop: "socialIcon",
                        type: "ReactNode",
                        default: "—",
                        description: "Icon element for the social variant."
                    },
                    {
                        prop: "onRemove",
                        type: "() => void",
                        default: "—",
                        description: "Callback when remove button is clicked. Shows remove icon when provided."
                    },
                    {
                        prop: "className",
                        type: "string",
                        default: "—",
                        description: "Additional CSS classes."
                    }
                ]
            }
        ]
    },
    {
        name: "Date Picker",
        slug: "date-picker",
        description: "An interactive calendar component for selecting dates with support for ranges, disabled dates, and localization.",
        installCmd: "npx chilli@latest add date-picker",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "datepicker-default",
                demoCode: `import { DatePicker } from "@chilli-ui/react"

export default function DatePickerDemo() {
  return (
    <DatePicker
      placeholder="Select a date"
      onChange={(date) => console.log(date)}
    />
  )
}`
            },
            {
                title: "With Range",
                type: "preview",
                demoKey: "datepicker-range",
                demoCode: `import { DatePicker } from "@chilli-ui/react"

export default function DatePickerRange() {
  return (
    <DatePicker
      mode="range"
      placeholder="Select date range"
    />
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "DatePicker",
                props: [
                    {
                        prop: "value",
                        type: "Date | null",
                        default: "—",
                        description: "The controlled selected date."
                    },
                    {
                        prop: "mode",
                        type: '"single" | "range"',
                        default: '"single"',
                        description: "Selection mode — single date or date range."
                    },
                    {
                        prop: "placeholder",
                        type: "string",
                        default: '"Pick a date"',
                        description: "Placeholder text when no date is selected."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the date picker is disabled."
                    },
                    {
                        prop: "minDate",
                        type: "Date",
                        default: "—",
                        description: "The earliest selectable date."
                    },
                    {
                        prop: "maxDate",
                        type: "Date",
                        default: "—",
                        description: "The latest selectable date."
                    },
                    {
                        prop: "onChange",
                        type: "(date: Date | null) => void",
                        default: "—",
                        description: "Callback when the date changes."
                    }
                ]
            }
        ]
    },
    {
        name: "Dropdown",
        slug: "dropdown",
        description: "A floating menu component that displays a list of actions or options triggered by a button click.",
        installCmd: "npx chilli@latest add dropdown",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Small",
                type: "preview",
                demoKey: "dropdown-default",
                demoCode: `import { Dropdown, MenuItem } from "@chilli-ui/react"
import { Plus } from "lucide-react"

export function DropdownSmall() {
  const [checked, setChecked] = useState(2)
  const items = ["List item", "List item", "List item", "List item", "List item"]
  return (
    <Dropdown checkedIndex={checked} size="sm">
      {items.map((item, i) => (
        <MenuItem icon={Plus} label={item} index={i}
          onSelect={() => setChecked(i)} />
      ))}
    </Dropdown>
  )
}`
            },
            {
                title: "Medium",
                type: "preview",
                demoKey: "dropdown-medium",
                demoCode: `import { Dropdown, MenuItem } from "@chilli-ui/react"
import { Plus } from "lucide-react"

export function DropdownMedium() {
  const [checked, setChecked] = useState(2)
  const items = ["List item", "List item", "List item", "List item", "List item"]
  return (
    <Dropdown checkedIndex={checked} size="md">
      {items.map((item, i) => (
        <MenuItem icon={Plus} label={item} index={i}
          onSelect={() => setChecked(i)} />
      ))}
    </Dropdown>
  )
}`
            },
            {
                title: "Large",
                type: "preview",
                demoKey: "dropdown-large",
                demoCode: `import { Dropdown, MenuItem } from "@chilli-ui/react"
import { Plus } from "lucide-react"

export function DropdownLarge() {
  const [checked, setChecked] = useState(2)
  const items = ["List item", "List item", "List item", "List item", "List item"]
  return (
    <Dropdown checkedIndex={checked} size="lg">
      {items.map((item, i) => (
        <MenuItem icon={Plus} label={item} index={i}
          onSelect={() => setChecked(i)} />
      ))}
    </Dropdown>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Dropdown",
                props: [
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg"',
                        default: '"md"',
                        description: "The size of the dropdown and its items."
                    },
                    {
                        prop: "checkedIndex",
                        type: "number",
                        default: "—",
                        description: "Index of the currently checked/selected item."
                    },
                    {
                        prop: "children",
                        type: "ReactNode",
                        default: "—",
                        description: "MenuItem components to render."
                    }
                ]
            },
            {
                title: "MenuItem",
                props: [
                    {
                        prop: "icon",
                        type: "LucideIcon",
                        default: "—",
                        description: "Icon component displayed on the left."
                    },
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "The text label of the item."
                    },
                    {
                        prop: "index",
                        type: "number",
                        default: "—",
                        description: "The index of the item for selection tracking."
                    },
                    {
                        prop: "checked",
                        type: "boolean",
                        default: "—",
                        description: "Override checked state. Shows check icon when true."
                    },
                    {
                        prop: "onSelect",
                        type: "() => void",
                        default: "—",
                        description: "Callback when the item is selected."
                    }
                ]
            }
        ]
    },
    {
        name: "HeaderAction",
        slug: "action-navigation",
        description: "A top navigation bar for action screens with close button, title, glass icon buttons, and optional action button.",
        installCmd: "npx chilli@latest add action-navigation",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "action-navigation-default",
                demoCode: `import { ActionNavigation } from "@chilli-ui/react"

export function ActionNavigationDemo() {
  return (
    <div>
      <ActionNavigation title="Create" />
      <ActionNavigation title="Edit" border />
      <ActionNavigation title="Preview" scrolled border />
    </div>
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "action-navigation-states",
                demoCode: `import { ActionNavigation } from "@chilli-ui/react"

export function ActionNavigationStates() {
  return (
    <div className="flex flex-col gap-4">
      <ActionNavigation title="Default" />
      <ActionNavigation title="With Border" border />
      <ActionNavigation title="Scrolled" scrolled border />
    </div>
  )
}`
            },
            {
                title: "With Button",
                type: "preview",
                demoKey: "action-navigation-button",
                demoCode: `import { ActionNavigation } from "@chilli-ui/react"

export function ActionNavigationWithButton() {
  return (
    <ActionNavigation
      title="New Action"
      showButton
      buttonLabel="next"
    />
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "ActionNavigation",
                props: [
                    {
                        prop: "title",
                        type: "string",
                        default: '"title"',
                        description: "The title text displayed in the center."
                    },
                    {
                        prop: "variant",
                        type: '"mobile" | "desktop" | "auto"',
                        default: '"auto"',
                        description: "The breakpoint variant."
                    },
                    {
                        prop: "border",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show a bottom border."
                    },
                    {
                        prop: "scrolled",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the scrolled state with backdrop blur."
                    },
                    {
                        prop: "showClose",
                        type: "boolean",
                        default: "true",
                        description: "Whether to show the close (X) button."
                    },
                    {
                        prop: "onClose",
                        type: "() => void",
                        default: "—",
                        description: "Callback when the close button is clicked."
                    },
                    {
                        prop: "showButton",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the action button (e.g. 'next')."
                    },
                    {
                        prop: "buttonLabel",
                        type: "string",
                        default: '"next"',
                        description: "Label for the action button."
                    },
                    {
                        prop: "actions",
                        type: "ReactNode",
                        default: "Share + More icons",
                        description: "Custom action elements for the right side."
                    }
                ]
            }
        ]
    },
    {
        name: "HeaderNavigation",
        slug: "page-navigation",
        description: "A top navigation bar for pages with back button, title, and action icons, supporting mobile and desktop breakpoints.",
        installCmd: "npx chilli@latest add page-navigation",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "page-navigation-default",
                demoCode: `import { PageNavigation } from "@chilli-ui/react"

export function PageNavigationDemo() {
  const [view, setView] = useState("mobile")
  return (
    <div className="flex flex-col gap-4 w-full">
      <BreakpointSwitch value={view} onChange={setView} />
      <PageNavigation variant={view} title="Profile" />
      <PageNavigation variant={view} title="Settings" border />
      <PageNavigation variant={view} title="Activity" scrolled />
    </div>
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "page-navigation-states",
                demoCode: `import { PageNavigation, BreakpointSwitch } from "@chilli-ui/react"

export function PageNavigationStates() {
  const [view, setView] = useState("desktop")
  return (
    <div className="flex flex-col gap-4 w-full">
      <BreakpointSwitch value={view} onChange={setView} />
      <PageNavigation variant={view} title="Default" />
      <PageNavigation variant={view} title="With Border" border />
      <PageNavigation variant={view} title="Scrolled" scrolled />
    </div>
  )
}`
            },
            {
                title: "Custom Actions",
                type: "preview",
                demoKey: "page-navigation-custom",
                demoCode: `import { PageNavigation } from "@chilli-ui/react"
import { Heart, Share2, MoreHorizontal } from "lucide-react"

export function PageNavigationCustom() {
  return (
    <div className="flex flex-col gap-4">
      <PageNavigation title="Custom Actions" actions={...} />
      <PageNavigation title="No Back" showBack={false} />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "PageNavigation",
                props: [
                    {
                        prop: "title",
                        type: "string",
                        default: '"title"',
                        description: "The title text displayed in the center."
                    },
                    {
                        prop: "variant",
                        type: '"mobile" | "desktop" | "auto"',
                        default: '"auto"',
                        description: "The breakpoint variant. Auto adapts based on screen size."
                    },
                    {
                        prop: "border",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show a bottom border."
                    },
                    {
                        prop: "scrolled",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the scrolled state with opaque background."
                    },
                    {
                        prop: "showBack",
                        type: "boolean",
                        default: "true",
                        description: "Whether to show the back button."
                    },
                    {
                        prop: "onBack",
                        type: "() => void",
                        default: "—",
                        description: "Callback when the back button is clicked."
                    },
                    {
                        prop: "actions",
                        type: "ReactNode",
                        default: "Share + Settings icons",
                        description: "Custom action elements for the right side."
                    }
                ]
            }
        ]
    },
    {
        name: "Icon Button",
        slug: "icon-button",
        description: "A round, icon-only button component for compact actions — supports primary, secondary, and transparent variants with glass styling.",
        installCmd: "npx chilli@latest add icon-button",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Variants",
                type: "preview",
                demoKey: "icon-button-variants",
                demoCode: `import { IconButton } from "@chilli-ui/react"
import { Plus, Settings, Search } from "lucide-react"

export function IconButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton variant="primary" icon={Plus} />
      <IconButton variant="secondary" icon={Settings} />
      <IconButton variant="transparent" icon={Search} />
    </div>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "icon-button-sizes",
                demoCode: `import { IconButton } from "@chilli-ui/react"
import { X } from "lucide-react"

export function IconButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton size="xsm" icon={X} />
      <IconButton size="sm" icon={X} />
      <IconButton size="md" icon={X} />
      <IconButton size="lg" icon={X} />
    </div>
  )
}`
            },
            {
                title: "Glass Style",
                type: "preview",
                demoKey: "icon-button-glass",
                demoCode: `import { IconButton } from "@chilli-ui/react"
import { ChevronLeft, Heart } from "lucide-react"

export function IconButtonGlass() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-6">
      <IconButton variant="primary" glass icon={ChevronLeft} />
      <IconButton variant="secondary" glass icon={Heart} />
    </div>
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "icon-button-states",
                demoCode: `import { IconButton } from "@chilli-ui/react"
import { Plus, Settings, Search } from "lucide-react"

export function IconButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton icon={Plus} />
      <IconButton icon={Plus} disabled />
      <IconButton icon={Plus} loading />
      <IconButton variant="secondary" icon={Settings} />
      <IconButton variant="secondary" icon={Settings} disabled />
      <IconButton variant="secondary" icon={Settings} loading />
      <IconButton variant="transparent" icon={Search} />
      <IconButton variant="transparent" icon={Search} disabled />
      <IconButton variant="transparent" icon={Search} loading />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "IconButton",
                props: [
                    {
                        prop: "variant",
                        type: '"primary" | "secondary" | "transparent"',
                        default: '"primary"',
                        description: "Visual style of the button."
                    },
                    {
                        prop: "size",
                        type: '"xsm" | "sm" | "md" | "lg"',
                        default: '"md"',
                        description: "Size of the button (always square)."
                    },
                    {
                        prop: "glass",
                        type: "boolean",
                        default: "false",
                        description: "Surface style — glass adds backdrop blur and border."
                    },
                    {
                        prop: "icon",
                        type: "LucideIcon",
                        default: "—",
                        description: "Required. The icon to display."
                    },
                    {
                        prop: "loading",
                        type: "boolean",
                        default: "false",
                        description: "Shows a spinner and disables the button."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Disables the button."
                    },
                    {
                        prop: "asChild",
                        type: "boolean",
                        default: "false",
                        description: "Merge props onto child element."
                    },
                    {
                        prop: "className",
                        type: "string",
                        default: "—",
                        description: "Additional CSS classes to merge."
                    }
                ]
            }
        ]
    },
    {
        name: "Input",
        slug: "input",
        description: "A text input field component with built-in support for labels, placeholders, validation states, and icons.",
        installCmd: "npx chilli@latest add input",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "input-default",
                demoCode: `import { Input } from "@chilli-ui/react"

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-80">
      <Input placeholder="Enter your email" />
      <Input label="Username" placeholder="johndoe" />
      <Input label="Password" type="password" placeholder="••••••••" />
    </div>
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "input-states",
                demoCode: `import { Input } from "@chilli-ui/react"

export default function InputStates() {
  return (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Error" error="This field is required" />
      <Input label="Disabled" disabled value="Read only" />
      <Input label="With helper" helperText="We'll never share your data." />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Input",
                props: [
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "Label text displayed above the input."
                    },
                    {
                        prop: "placeholder",
                        type: "string",
                        default: "—",
                        description: "Placeholder text for the input."
                    },
                    {
                        prop: "type",
                        type: '"text" | "password" | "email" | "number"',
                        default: '"text"',
                        description: "The type of the input."
                    },
                    {
                        prop: "error",
                        type: "string",
                        default: "—",
                        description: "Error message displayed below the input."
                    },
                    {
                        prop: "helperText",
                        type: "string",
                        default: "—",
                        description: "Helper text displayed below the input."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the input is disabled."
                    },
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "Controlled value."
                    },
                    {
                        prop: "onChange",
                        type: "(e: ChangeEvent) => void",
                        default: "—",
                        description: "Change event handler."
                    }
                ]
            }
        ]
    },
    {
        name: "InputActionField",
        slug: "action-input",
        description: "A glass-style input field with integrated label, optional icons, avatar, and toggle for action-oriented forms.",
        installCmd: "npx chilli@latest add action-input",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "action-input-default",
                demoCode: `import { ActionInput } from "@chilli-ui/react"
import { MapPin } from "lucide-react"

export function ActionInputDefault() {
  return (
    <ActionInput
      label="Label"
      placeholder="placeholder"
      helperText="helper text"
      leftIcon={<MapPin size={20} />}
    />
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "action-input-states",
                demoCode: `import { ActionInput } from "@chilli-ui/react"
import { MapPin } from "lucide-react"

export function ActionInputStates() {
  return (
    <div className="flex flex-col gap-6">
      <ActionInput label="Placeholder" placeholder="placeholder" leftIcon={<MapPin size={20} />} />
      <ActionInput label="Filled" defaultValue="user text" leftIcon={<MapPin size={20} />} />
      <ActionInput label="Error" defaultValue="user text" error="helper text" leftIcon={<MapPin size={20} />} />
      <ActionInput label="Disabled" defaultValue="user text" leftIcon={<MapPin size={20} />} disabled />
    </div>
  )
}`
            },
            {
                title: "With Toggle",
                type: "preview",
                demoKey: "action-input-toggle",
                demoCode: `import { ActionInput } from "@chilli-ui/react"
import { MapPin } from "lucide-react"

export function ActionInputToggle() {
  const [toggle, setToggle] = useState(false)
  return (
    <ActionInput
      label="Label"
      placeholder="placeholder"
      leftIcon={<MapPin size={20} />}
      showToggle
      toggleChecked={toggle}
      onToggleChange={setToggle}
    />
  )
}`
            },
            {
                title: "With Avatar",
                type: "preview",
                demoKey: "action-input-avatar",
                demoCode: `import { ActionInput } from "@chilli-ui/react"

export function ActionInputAvatar() {
  return (
    <ActionInput
      label="Label"
      placeholder="placeholder"
      showAvatar
      avatarSrc="https://i.pravatar.cc/40?u=1"
    />
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "ActionInput",
                props: [
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "Label displayed inside the input container."
                    },
                    {
                        prop: "helperText",
                        type: "string",
                        default: "—",
                        description: "Helper text displayed below the input."
                    },
                    {
                        prop: "error",
                        type: "string",
                        default: "—",
                        description: "Error message. Applies error styling."
                    },
                    {
                        prop: "leftIcon",
                        type: "ReactNode",
                        default: "—",
                        description: "Icon displayed on the left side."
                    },
                    {
                        prop: "rightIcon",
                        type: "ReactNode",
                        default: "ChevronRight",
                        description: "Icon displayed on the right side."
                    },
                    {
                        prop: "showAvatar",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show an avatar."
                    },
                    {
                        prop: "avatarSrc",
                        type: "string",
                        default: "—",
                        description: "Avatar image source."
                    },
                    {
                        prop: "showToggle",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show a toggle switch."
                    },
                    {
                        prop: "toggleChecked",
                        type: "boolean",
                        default: "false",
                        description: "Controlled toggle state."
                    },
                    {
                        prop: "onToggleChange",
                        type: "(checked: boolean) => void",
                        default: "—",
                        description: "Callback when the toggle changes."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the input is disabled."
                    }
                ]
            }
        ]
    },
    {
        name: "InputFormTitle",
        slug: "action-form-title",
        description: "A pill-shaped title input for action forms with glass styling, supporting placeholder, filled, focused, and error states.",
        installCmd: "npx chilli@latest add form-title",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "form-title-default",
                demoCode: `import { FormTitle } from "@chilli-ui/react"

export function FormTitleDefault() {
  return <FormTitle placeholder="add cause" />
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "form-title-states",
                demoCode: `import { FormTitle } from "@chilli-ui/react"

export function FormTitleStates() {
  return (
    <div className="flex flex-col gap-6">
      <FormTitle placeholder="add cause" />
      <FormTitle defaultValue="ClimateWalk" />
      <FormTitle placeholder="add cause" error="add a cause to publish" />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "FormTitle",
                props: [
                    {
                        prop: "placeholder",
                        type: "string",
                        default: "—",
                        description: "Placeholder text displayed when empty."
                    },
                    {
                        prop: "error",
                        type: "string",
                        default: "—",
                        description: "Error message. Applies error styling and shows message below."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the input is disabled."
                    }
                ]
            }
        ]
    },
    {
        name: "InputNumber",
        slug: "number-input",
        description: "A verification code input component with individual digit cells, supporting auto-focus navigation, paste, and error states.",
        installCmd: "npx chilli@latest add number-input",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "number-input-default",
                demoCode: `import { NumberInput } from "@chilli-ui/react"

export function NumberInputDefault() {
  const [value, setValue] = useState("")
  return <NumberInput value={value} onChange={setValue} />
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "number-input-states",
                demoCode: `import { NumberInput } from "@chilli-ui/react"

export function NumberInputStates() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <NumberInput value="" />
      <NumberInput value="333333" />
      <NumberInput value="333333" error />
      <NumberInput value="" disabled />
    </div>
  )
}`
            },
            {
                title: "Length",
                type: "preview",
                demoKey: "number-input-length",
                demoCode: `import { NumberInput } from "@chilli-ui/react"

export function NumberInputLength() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <NumberInput length={4} />
      <NumberInput length={6} />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "NumberInput",
                props: [
                    {
                        prop: "value",
                        type: "string",
                        default: '""',
                        description: "The current value as a string of digits."
                    },
                    {
                        prop: "onChange",
                        type: "(value: string) => void",
                        default: "—",
                        description: "Callback when the value changes."
                    },
                    {
                        prop: "length",
                        type: "number",
                        default: "4",
                        description: "Number of digit cells to display."
                    },
                    {
                        prop: "error",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the error state."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the input is disabled."
                    }
                ]
            }
        ]
    },
    {
        name: "Progress Bar",
        slug: "slider",
        description: "A segmented progress bar component for displaying completion status with label positioning options.",
        installCmd: "npx chilli@latest add progress-bar",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "slider-default",
                demoCode: `import { ProgressBar } from "@chilli-ui/react"

export function ProgressBarDefault() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ProgressBar value={0} labelPosition="right" />
      <ProgressBar value={20} labelPosition="right" />
      <ProgressBar value={40} labelPosition="right" />
      <ProgressBar value={60} labelPosition="right" />
      <ProgressBar value={80} labelPosition="right" />
      <ProgressBar value={100} labelPosition="right" />
    </div>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "slider-sizes",
                demoCode: `import { ProgressBar } from "@chilli-ui/react"

export function ProgressBarSizes() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ProgressBar value={60} size="sm" labelPosition="right" />
      <ProgressBar value={60} size="md" labelPosition="right" />
      <ProgressBar value={60} size="lg" labelPosition="right" />
    </div>
  )
}`
            },
            {
                title: "With Label",
                type: "preview",
                demoKey: "slider-label",
                demoCode: `import { ProgressBar } from "@chilli-ui/react"

export function ProgressBarWithLabel() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ProgressBar value={60} labelPosition="right" />
      <ProgressBar value={60} labelPosition="bottom" />
      <ProgressBar value={60} />
    </div>
  )
}`
            },
            {
                title: "Interactive",
                type: "preview",
                demoKey: "slider-interactive",
                demoCode: `import { ProgressBar } from "@chilli-ui/react"

export function ProgressBarInteractive() {
  const [value, setValue] = useState(40)
  return <ProgressBar value={value} labelPosition="right" />
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "ProgressBar",
                props: [
                    {
                        prop: "value",
                        type: "number",
                        default: "0",
                        description: "Progress value from 0 to 100."
                    },
                    {
                        prop: "segments",
                        type: "number",
                        default: "5",
                        description: "Number of segments in the bar."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg"',
                        default: '"md"',
                        description: "Height of the progress bar."
                    },
                    {
                        prop: "labelPosition",
                        type: '"none" | "right" | "bottom"',
                        default: '"none"',
                        description: "Position of the percentage label."
                    },
                    {
                        prop: "formatLabel",
                        type: "(value: number) => string",
                        default: "—",
                        description: "Custom label formatter."
                    }
                ]
            }
        ]
    },
    {
        name: "Radio",
        slug: "radio",
        description: "A form control that allows users to select a single option from a group of mutually exclusive choices.",
        installCmd: "npx chilli@latest add radio",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "radio-default",
                demoCode: `import { Radio, RadioGroup } from "@chilli-ui/react"

export function RadioDefault() {
  const [value, setValue] = useState("option1")
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "radio-sizes",
                demoCode: `import { Radio } from "@chilli-ui/react"

export function RadioSizes() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3">
        <Radio size="sm" />
        <Radio size="sm" checked />
      </div>
      <div className="flex items-center gap-3">
        <Radio size="md" />
        <Radio size="md" checked />
      </div>
    </div>
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "radio-states",
                demoCode: `import { Radio } from "@chilli-ui/react"

export function RadioStates() {
  return (
    <div className="flex items-center gap-4">
      <Radio />
      <Radio checked />
      <Radio disabled />
      <Radio checked disabled />
    </div>
  )
}`
            },
            {
                title: "With Text",
                type: "preview",
                demoKey: "radio-text",
                demoCode: `import { Radio, RadioGroup } from "@chilli-ui/react"

export function RadioWithText() {
  const [value, setValue] = useState("email")
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio value="email" label="Email notifications"
        description="Receive updates via email." />
      <Radio value="sms" label="SMS notifications"
        description="Receive updates via text message." />
      <Radio value="none" label="No notifications"
        description="You won't receive any notifications." disabled />
    </RadioGroup>
  )
}`
            },
            {
                title: "Horizontal",
                type: "preview",
                demoKey: "radio-horizontal",
                demoCode: `import { Radio, RadioGroup } from "@chilli-ui/react"

export function RadioHorizontal() {
  const [value, setValue] = useState("a")
  return (
    <RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
      <Radio value="a" label="Daily" />
      <Radio value="b" label="Weekly" />
      <Radio value="c" label="Monthly" />
    </RadioGroup>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Radio",
                props: [
                    {
                        prop: "checked",
                        type: "boolean",
                        default: "false",
                        description: "Controlled checked state."
                    },
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "The value of the radio when used inside a RadioGroup."
                    },
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "The label text displayed next to the radio."
                    },
                    {
                        prop: "description",
                        type: "string",
                        default: "—",
                        description: "Description text displayed below the label."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md"',
                        default: '"md"',
                        description: "The size of the radio."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the radio is disabled."
                    },
                    {
                        prop: "onCheckedChange",
                        type: "(checked: boolean) => void",
                        default: "—",
                        description: "Callback when the checked state changes."
                    }
                ]
            },
            {
                title: "RadioGroup",
                props: [
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "The currently selected value."
                    },
                    {
                        prop: "onValueChange",
                        type: "(value: string) => void",
                        default: "—",
                        description: "Callback when the selected value changes."
                    },
                    {
                        prop: "orientation",
                        type: '"vertical" | "horizontal"',
                        default: '"vertical"',
                        description: "Layout direction of the radio group."
                    }
                ]
            }
        ]
    },
    {
        name: "Search",
        slug: "search",
        description: "A search bar input with magnifying glass icon and clearable filled state.",
        installCmd: "npx chilli@latest add search-bar",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "search-bar-default",
                demoCode: `import { SearchBar } from "@chilli-ui/react"

export function SearchBarDefault() {
  const [value, setValue] = useState("")
  return (
    <SearchBar
      placeholder="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "search-bar-states",
                demoCode: `import { SearchBar } from "@chilli-ui/react"

export function SearchBarStates() {
  return (
    <div className="flex flex-col gap-6">
      <SearchBar placeholder="search" value="" />
      <SearchBar placeholder="search" value="search" onClear={() => {}} />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "SearchBar",
                props: [
                    {
                        prop: "placeholder",
                        type: "string",
                        default: "—",
                        description: "Placeholder text."
                    },
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "Controlled input value."
                    },
                    {
                        prop: "onChange",
                        type: "(e: ChangeEvent) => void",
                        default: "—",
                        description: "Change event handler."
                    },
                    {
                        prop: "onClear",
                        type: "() => void",
                        default: "—",
                        description: "Callback when the clear button is clicked. Shows clear icon when value is non-empty."
                    }
                ]
            }
        ]
    },
    {
        name: "Select",
        slug: "select",
        description: "A dropdown select component for choosing a single option from a predefined list of values.",
        installCmd: "npx chilli@latest add select",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "select-default",
                demoCode: `import { Select } from "@chilli-ui/react"

const options = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function SelectDemo() {
  const [value, setValue] = useState("")
  return <Select options={options} value={value} onChange={setValue} placeholder="Framework" />
}`
            },
            {
                title: "With Icons",
                type: "preview",
                demoKey: "select-icons",
                demoCode: `import { Select } from "@chilli-ui/react"

export function SelectWithIcons() {
  return <Select options={options} value={value} onChange={setValue} placeholder="Select..." />
}`
            },
            {
                title: "Avatar",
                type: "preview",
                demoKey: "select-avatar",
                demoCode: `import { Select } from "@chilli-ui/react"

export function SelectAvatar() {
  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      variant="avatar"
      avatarSrc="https://i.pravatar.cc/40"
      placeholder="creator"
    />
  )
}`
            },
            {
                title: "Borderless",
                type: "preview",
                demoKey: "select-borderless",
                demoCode: `import { Select } from "@chilli-ui/react"

export function SelectBorderless() {
  const [value, setValue] = useState("")
  return (
    <div className="flex items-center gap-4">
      <Select options={options} value={value} onChange={setValue}
        placeholder="creator" variant="borderless" size="sm" />
      <Select options={options} value={value} onChange={setValue}
        placeholder="creator" variant="borderless" size="md" />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Select",
                props: [
                    {
                        prop: "options",
                        type: "{ value: string; label: string; icon?: ReactNode }[]",
                        default: "—",
                        description: "Array of options to display."
                    },
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "Controlled selected value."
                    },
                    {
                        prop: "onChange",
                        type: "(value: string) => void",
                        default: "—",
                        description: "Callback when the selected value changes."
                    },
                    {
                        prop: "placeholder",
                        type: "string",
                        default: '"Select..."',
                        description: "Placeholder text when no option is selected."
                    },
                    {
                        prop: "variant",
                        type: '"default" | "avatar" | "borderless"',
                        default: '"default"',
                        description: "Visual style of the trigger."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md"',
                        default: '"md"',
                        description: "Size of the select trigger."
                    },
                    {
                        prop: "avatarSrc",
                        type: "string",
                        default: "—",
                        description: "Avatar image source for the avatar variant."
                    }
                ]
            }
        ]
    },
    {
        name: "Select Date Picker",
        slug: "select-date-picker",
        description: "A date range input component for selecting start and end dates with an interactive timeline visual.",
        installCmd: "npx chilli@latest add select-date-picker",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "select-date-picker-default",
                demoCode: `import { SelectDatePicker } from "@chilli-ui/react"

export function SelectDatePickerDefault() {
  return <SelectDatePicker />
}`
            },
            {
                title: "Focused",
                type: "preview",
                demoKey: "select-date-picker-focused",
                demoCode: `import { SelectDatePicker } from "@chilli-ui/react"

export function SelectDatePickerFocused() {
  return <SelectDatePicker focused />
}`
            },
            {
                title: "With Helper Text",
                type: "preview",
                demoKey: "select-date-picker-helper",
                demoCode: `import { SelectDatePicker } from "@chilli-ui/react"

export function SelectDatePickerHelper() {
  return (
    <SelectDatePicker
      showHelperText
      helperText="your action will be available during 7 days"
    />
  )
}`
            },
            {
                title: "Interactive",
                type: "preview",
                demoKey: "select-date-picker-interactive",
                demoCode: `import { SelectDatePicker } from "@chilli-ui/react"

export function SelectDatePickerInteractive() {
  const [focused, setFocused] = useState(false)
  return (
    <SelectDatePicker
      focused={focused}
      onClick={() => setFocused(!focused)}
      startDate="nov 12, 2025"
      startTime="5:30PM"
      endDate="nov 17, 2025"
    />
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "SelectDatePicker",
                props: [
                    {
                        prop: "startDate",
                        type: "string",
                        default: '"nov 12, 2025"',
                        description: "The start date text to display."
                    },
                    {
                        prop: "startTime",
                        type: "string",
                        default: '"5:30PM"',
                        description: "The start time text to display."
                    },
                    {
                        prop: "endDate",
                        type: "string",
                        default: '"nov 17, 2025"',
                        description: "The end date text to display."
                    },
                    {
                        prop: "endTime",
                        type: "string",
                        default: "—",
                        description: "Optional end time text to display."
                    },
                    {
                        prop: "focused",
                        type: "boolean",
                        default: "false",
                        description: "Whether the picker is in focused/selected state."
                    },
                    {
                        prop: "helperText",
                        type: "string",
                        default: "—",
                        description: "Helper text displayed below the picker."
                    },
                    {
                        prop: "showHelperText",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the helper text."
                    },
                    {
                        prop: "onClick",
                        type: "() => void",
                        default: "—",
                        description: "Click handler for the picker."
                    }
                ]
            }
        ]
    },
    {
        name: "Switch",
        slug: "switch",
        description: "A toggle switch component for binary on/off states, often used for settings and preferences.",
        installCmd: "npx chilli@latest add switch",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "switch-default",
                demoCode: `import { Switch } from "@chilli-ui/react"

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch label="Enable notifications" />
      <Switch label="Dark mode" defaultChecked />
      <Switch label="Disabled" disabled />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Switch",
                props: [
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "The label text for the switch."
                    },
                    {
                        prop: "checked",
                        type: "boolean",
                        default: "—",
                        description: "Controlled checked state."
                    },
                    {
                        prop: "defaultChecked",
                        type: "boolean",
                        default: "false",
                        description: "Initial checked state for uncontrolled usage."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the switch is disabled."
                    },
                    {
                        prop: "onCheckedChange",
                        type: "(checked: boolean) => void",
                        default: "—",
                        description: "Callback when the checked state changes."
                    }
                ]
            }
        ]
    },
    {
        name: "Tabs",
        slug: "tabs",
        description: "A tabbed navigation component for organizing content into multiple panels with switchable views.",
        installCmd: "npx chilli@latest add tabs",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Underline",
                type: "preview",
                demoKey: "tabs-default",
                demoCode: `import { Tabs } from "@chilli-ui/react"
import { Plus, ChevronDown } from "lucide-react"

const items = [
  { label: "label", value: "tab1", icon: <Plus size={16} />, rightIcon: <ChevronDown size={16} /> },
  { label: "label", value: "tab2", icon: <Plus size={16} />, rightIcon: <ChevronDown size={16} /> },
  { label: "label", value: "tab3", icon: <Plus size={16} />, rightIcon: <ChevronDown size={16} /> },
]

export function TabsUnderline() {
  const [value, setValue] = useState("tab1")
  return (
    <div className="flex flex-col gap-6">
      <Tabs items={items} value={value} onValueChange={setValue} type="underline" size="sm" />
      <Tabs items={items} value={value} onValueChange={setValue} type="underline" size="md" />
      <Tabs items={items} value={value} onValueChange={setValue} type="underline" size="lg" />
    </div>
  )
}`
            },
            {
                title: "Pill",
                type: "preview",
                demoKey: "tabs-pill",
                demoCode: `import { Tabs } from "@chilli-ui/react"

export function TabsPill() {
  const [value, setValue] = useState("tab1")
  return (
    <div className="flex flex-col gap-6">
      <Tabs items={items} value={value} onValueChange={setValue} type="pill" size="sm" />
      <Tabs items={items} value={value} onValueChange={setValue} type="pill" size="md" />
      <Tabs items={items} value={value} onValueChange={setValue} type="pill" size="lg" />
    </div>
  )
}`
            },
            {
                title: "Segmented",
                type: "preview",
                demoKey: "tabs-segmented",
                demoCode: `import { Tabs } from "@chilli-ui/react"

export function TabsSegmented() {
  const [value, setValue] = useState("tab1")
  return (
    <div className="flex flex-col gap-6">
      <Tabs items={items.slice(0, 2)} value={value} onValueChange={setValue} type="segmented" size="sm" />
      <Tabs items={items.slice(0, 2)} value={value} onValueChange={setValue} type="segmented" size="md" />
      <Tabs items={items.slice(0, 2)} value={value} onValueChange={setValue} type="segmented" size="lg" />
    </div>
  )
}`
            },
            {
                title: "Sizes",
                type: "preview",
                demoKey: "tabs-sizes",
                demoCode: `import { Tabs } from "@chilli-ui/react"

export function TabsSizes() {
  const [value, setValue] = useState("tab1")
  return (
    <div className="flex flex-col gap-6">
      <Tabs items={items} value={value} onValueChange={setValue} type="pill" size="sm" />
      <Tabs items={items} value={value} onValueChange={setValue} type="pill" size="md" />
      <Tabs items={items} value={value} onValueChange={setValue} type="pill" size="lg" />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Tabs",
                props: [
                    {
                        prop: "items",
                        type: "{ label: string; value: string; icon?: ReactNode; rightIcon?: ReactNode }[]",
                        default: "—",
                        description: "Array of tab items to display."
                    },
                    {
                        prop: "value",
                        type: "string",
                        default: "—",
                        description: "Controlled active tab value."
                    },
                    {
                        prop: "onValueChange",
                        type: "(value: string) => void",
                        default: "—",
                        description: "Callback when the active tab changes."
                    },
                    {
                        prop: "type",
                        type: '"underline" | "pill" | "segmented"',
                        default: '"underline"',
                        description: "Visual style of the tabs."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg"',
                        default: '"md"',
                        description: "Size of the tab items."
                    }
                ]
            }
        ]
    },
    {
        name: "Text Area",
        slug: "textarea",
        description: "A multiline text input component for longer form content with support for labels, helper text, and AI generation.",
        installCmd: "npx chilli@latest add textarea",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "textarea-default",
                demoCode: `import { TextArea } from "@chilli-ui/react"

export function TextAreaDefault() {
  return (
    <TextArea
      label="Label"
      placeholder="add email"
      helperText="Helper text"
    />
  )
}`
            },
            {
                title: "States",
                type: "preview",
                demoKey: "textarea-states",
                demoCode: `import { TextArea } from "@chilli-ui/react"

export function TextAreaStates() {
  return (
    <div className="flex flex-col gap-6">
      <TextArea label="Placeholder" placeholder="add email" helperText="Helper text" />
      <TextArea label="Filled" defaultValue="user description" helperText="Helper text" />
      <TextArea label="Disabled" placeholder="add email" helperText="Helper text" disabled />
    </div>
  )
}`
            },
            {
                title: "With AI Button",
                type: "preview",
                demoKey: "textarea-ai",
                demoCode: `import { TextArea } from "@chilli-ui/react"

export function TextAreaWithAI() {
  return (
    <div className="flex flex-col gap-6">
      <TextArea label="Label" placeholder="add email" showAiButton />
      <TextArea label="Label" defaultValue="user description" showAiButton />
      <TextArea label="Label" placeholder="add email" showAiButton disabled />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "TextArea",
                props: [
                    {
                        prop: "label",
                        type: "string",
                        default: "—",
                        description: "The label text displayed above the textarea."
                    },
                    {
                        prop: "helperText",
                        type: "string",
                        default: "—",
                        description: "Helper text displayed below the textarea."
                    },
                    {
                        prop: "error",
                        type: "string",
                        default: "—",
                        description: "Error message. Replaces helper text and applies error styling."
                    },
                    {
                        prop: "showAiButton",
                        type: "boolean",
                        default: "false",
                        description: "Whether to show the 'generate with AI' button."
                    },
                    {
                        prop: "onAiGenerate",
                        type: "() => void",
                        default: "—",
                        description: "Callback when the AI generate button is clicked."
                    },
                    {
                        prop: "disabled",
                        type: "boolean",
                        default: "false",
                        description: "Whether the textarea is disabled."
                    },
                    {
                        prop: "placeholder",
                        type: "string",
                        default: "—",
                        description: "Placeholder text."
                    }
                ]
            }
        ]
    },
    {
        name: "ThinkingIndicator",
        slug: "thinking-indicator",
        description: "An animated indicator component that shows a thinking or loading state, perfect for AI and chat interfaces.",
        installCmd: "npx chilli@latest add thinking-indicator",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "thinking-default",
                demoCode: `import { ThinkingIndicator } from "@chilli-ui/react"

export default function ThinkingDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ThinkingIndicator />
      <ThinkingIndicator label="Generating response..." />
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "ThinkingIndicator",
                props: [
                    {
                        prop: "label",
                        type: "string",
                        default: '"Thinking..."',
                        description: "The text displayed next to the animation."
                    },
                    {
                        prop: "size",
                        type: '"sm" | "md" | "lg"',
                        default: '"md"',
                        description: "The size of the indicator."
                    },
                    {
                        prop: "variant",
                        type: '"dots" | "pulse" | "bars"',
                        default: '"dots"',
                        description: "The animation style of the indicator."
                    }
                ]
            }
        ]
    },
    {
        name: "Tooltip",
        slug: "tooltip",
        description: "A floating informational popup that appears on hover or focus, providing contextual help or descriptions.",
        installCmd: "npx chilli@latest add tooltip",
        sections: [
            {
                title: "Installation",
                type: "install"
            },
            {
                title: "Default",
                type: "preview",
                demoKey: "tooltip-default",
                demoCode: `import { Tooltip } from "@chilli-ui/react"

export default function TooltipDemo() {
  return (
    <div className="flex gap-4">
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
      <Tooltip content="Right side" side="right">
        <button>Right tooltip</button>
      </Tooltip>
    </div>
  )
}`
            },
            {
                title: "API Reference",
                type: "api"
            }
        ],
        apiTables: [
            {
                title: "Tooltip",
                props: [
                    {
                        prop: "content",
                        type: "ReactNode",
                        default: "—",
                        description: "The content displayed inside the tooltip."
                    },
                    {
                        prop: "side",
                        type: '"top" | "right" | "bottom" | "left"',
                        default: '"top"',
                        description: "The preferred side of the trigger to display."
                    },
                    {
                        prop: "delayDuration",
                        type: "number",
                        default: "200",
                        description: "Delay in ms before the tooltip appears."
                    },
                    {
                        prop: "children",
                        type: "ReactNode",
                        default: "—",
                        description: "The trigger element."
                    }
                ]
            }
        ]
    }
];
export function getComponent(slug) {
    return components.find((c)=>c.slug === slug);
}
export function getAllSlugs() {
    return components.map((c)=>c.slug);
}
