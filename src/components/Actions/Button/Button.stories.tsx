import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { ICON_NAMES } from '../../../icons/icons.generated';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { VerticalStack } from '../../Layout/VerticalStack';
import { TextBlock } from '../../Text/TextBlock';
import { Button } from './Button';

// A band of color behind the button, for the brand and knockout colors
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

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: {
    children: 'Book a call',
    variant: 'primary',
    color: 'default',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    color: { control: 'inline-radio', options: ['default', 'brand', 'knockout'] },
    size: { control: 'inline-radio', options: ['xl', 'lg', 'md', 'sm'] },
    startIcon: { control: 'select', options: [undefined, ...ICON_NAMES] },
    endIcon: { control: 'select', options: [undefined, ...ICON_NAMES] },
    type: { control: false },
    disabled: { control: 'boolean' },
    onClick: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Download resume' },
};

export const PrimaryBrand: Story = {
  name: 'Primary brand',
  args: { color: 'brand' },
  decorators: [onBackground('brand')],
};

export const SecondaryKnockout: Story = {
  name: 'Secondary knockout',
  args: { variant: 'secondary', color: 'knockout', children: 'Download resume' },
  decorators: [onBackground('knockout')],
};

// Every size, largest first
export const Sizes: StoryObj = {
  render: () => (
    <HorizontalStack gap="sm" wrap>
      <Button size="xl">Book a call</Button>
      <Button size="lg">Book a call</Button>
      <Button size="md">Book a call</Button>
      <Button size="sm">Book a call</Button>
    </HorizontalStack>
  ),
};

export const WithIcons: StoryObj = {
  name: 'With icons',
  render: () => (
    <HorizontalStack gap="sm" wrap>
      <Button startIcon="email">Email me</Button>
      <Button variant="secondary" startIcon="resume">
        Download resume
      </Button>
      <Button size="sm" variant="secondary" endIcon="email">
        Email me
      </Button>
    </HorizontalStack>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <HorizontalStack gap="sm" wrap>
      <Button disabled>Book a call</Button>
      <Button variant="secondary" disabled>
        Download resume
      </Button>
    </HorizontalStack>
  ),
};

// A call to action under a short pitch: the main action, then a quieter one
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="md" align="start">
      <TextBlock heading="Let’s work together" headingLevel={2}>
        I’m looking for a senior product design role on a team that cares about the details.
      </TextBlock>
      <HorizontalStack gap="sm" wrap>
        <Button size="lg">Book a call</Button>
        <Button size="lg" variant="secondary" startIcon="resume">
          Download resume
        </Button>
      </HorizontalStack>
    </VerticalStack>
  ),
};
