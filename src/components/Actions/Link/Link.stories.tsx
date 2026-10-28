import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { VerticalStack } from '../../Layout/VerticalStack';
import { TextBlock } from '../../Text/TextBlock';
import { UnorderedList, UnorderedListItem } from '../../Text/UnorderedList';
import { Link } from './Link';

// A band of color behind the link, for the brand and knockout colors
const onBackground =
  (background: string): Decorator =>
  (Story) => (
    <div
      style={{
        padding: 'var(--verity-padding-md)',
        borderRadius: 'var(--verity-border-radius-md)',
        background: `var(--verity-color-background-${background})`,
      }}
    >
      <Story />
    </div>
  );

// Room above the link, so its tooltip isn't cut off
const roomForTooltip: Decorator = (Story) => (
  <div style={{ paddingBlockStart: 'var(--verity-spacing-lg)' }}>
    <Story />
  </div>
);

const meta = {
  title: 'Actions/Link',
  component: Link,
  args: {
    children: 'Case studies',
    href: '#case-studies',
    color: 'default',
    disabled: false,
  },
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
    color: { control: 'inline-radio', options: ['default', 'brand', 'knockout'] },
    disabled: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Brand: Story = {
  args: { color: 'brand' },
  decorators: [onBackground('brand')],
};

export const Knockout: Story = {
  args: { color: 'knockout' },
  decorators: [onBackground('knockout')],
};

export const Disabled: Story = {
  args: { disabled: true, tooltip: 'Coming soon' },
  decorators: [roomForTooltip],
};

// A Link takes its font from the text around it: body-default in a TextBlock,
// body-lg in a list with the larger text size
export const InsideText: Story = {
  name: 'Inside text',
  render: () => (
    <VerticalStack gap="lg">
      <TextBlock heading="The problem">
        <p>
          Half of new customers left before they connected their first account. The{' '}
          <Link href="#research">research summary</Link> has the full numbers.
        </p>
      </TextBlock>
      <UnorderedList>
        <UnorderedListItem textSize="body-lg">
          Read the <Link href="#interviews">interview notes</Link>
        </UnorderedListItem>
      </UnorderedList>
    </VerticalStack>
  ),
};

// Links on their own, in a list, with one page that isn't live yet
export const InContext: Story = {
  name: 'In context',
  decorators: [roomForTooltip],
  render: () => (
    <HorizontalStack as="ul" gap="md" wrap>
      <li>
        <Link disabled tooltip="Coming soon">
          Case studies
        </Link>
      </li>
      <li>
        <Link href="#about">About</Link>
      </li>
      <li>
        <Link href="#resume">Resume</Link>
      </li>
    </HorizontalStack>
  ),
};
