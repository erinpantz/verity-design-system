import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId } from 'react';
import { Link } from '../Link';
import { Tooltip, type TooltipProps } from './Tooltip';

// A stand-in trigger for these stories, styled with tokens. Link and
// IconButton are the real owners of a Tooltip; see their stories.
function Trigger({ describedBy }: { describedBy: string }) {
  return (
    <button
      type="button"
      aria-describedby={describedBy}
      style={{
        paddingBlock: 'var(--verity-padding-xs)',
        paddingInline: 'var(--verity-padding-sm)',
        border: 'var(--verity-border-width-sm) solid var(--verity-color-border-default)',
        borderRadius: 'var(--verity-border-radius-md)',
        background: 'var(--verity-color-background-subtle)',
        color: 'var(--verity-color-content-default)',
        font: 'inherit',
      }}
    >
      Hover or focus me
    </button>
  );
}

// Each Tooltip needs an id that's unique on the page, so the demo makes one
function TooltipDemo(args: Omit<TooltipProps, 'id' | 'children'>) {
  const id = useId();
  return (
    <Tooltip {...args} id={id}>
      <Trigger describedBy={id} />
    </Tooltip>
  );
}

const meta = {
  title: 'Actions/Tooltip',
  component: Tooltip,
  // Room above and beside the trigger, so the tooltip isn't cut off
  decorators: [
    (Story) => (
      <div style={{ paddingBlock: 'var(--verity-spacing-lg)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <TooltipDemo text={args.text} placement={args.placement} />,
  args: {
    text: 'Coming soon',
    placement: 'top',
    id: '',
    children: null,
  },
  argTypes: {
    text: { control: 'text' },
    placement: { control: 'inline-radio', options: ['top', 'top-end', 'end'] },
    // Set by the component that owns the tooltip, not here
    id: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// For a trigger at the end of something the tooltip shouldn't spill past,
// like the pause button in an Animation's bottom-right corner
export const PlacementTopEnd: Story = {
  name: 'Placement top end',
  args: { placement: 'top-end', text: 'Pause animation' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
};

export const PlacementEnd: Story = {
  name: 'Placement end',
  args: { placement: 'end', text: 'Collapse navigation' },
};

// At the right edge of the screen there's no room beside the trigger, so an
// end tooltip opens below it, lined up with its end, like ThemeToggle in the
// Small top bar
export const PlacementEndAtTheEdge: Story = {
  name: 'Placement end, at the edge',
  args: { placement: 'end', text: 'Change to red' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
};

// The usual use: a disabled Link to a page that isn't live yet
export const InContext: Story = {
  name: 'In context',
  render: () => (
    <Link disabled tooltip="Coming soon">
      Case studies
    </Link>
  ),
};
