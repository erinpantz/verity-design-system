import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import { Image } from '../../Media/Image';
import { BackLink } from './BackLink';

const meta = {
  title: 'Navigation/BackLink',
  component: BackLink,
  args: { href: '#portfolio', label: 'Portfolio' },
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof BackLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// The states below are held on with the pseudo-states addon, so the fills and
// ring show without a pointer. They're story globals, not parameters, so the
// state doesn't stay on for every story opened afterwards.

export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

// Over a picture, as when a page scrolls under it in Shell's focused mode:
// the scrim keeps the arrow and label readable
export const OverAnImage: Story = {
  name: 'Over an image',
  render: (args) => (
    <div style={{ position: 'relative' }}>
      <Image src={landscape} alt="" />
      <div
        style={{
          position: 'absolute',
          insetBlockStart: 'var(--verity-spacing-md)',
          insetInlineStart: 'var(--verity-spacing-md)',
        }}
      >
        <BackLink {...args} />
      </div>
    </div>
  ),
};
