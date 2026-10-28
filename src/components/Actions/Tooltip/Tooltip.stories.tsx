import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId } from 'react';
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
    placement: { control: 'inline-radio', options: ['top', 'end'] },
    // Set by the component that owns the tooltip, not here
    id: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PlacementEnd: Story = {
  name: 'Placement end',
  args: { placement: 'end', text: 'Collapse navigation' },
};
