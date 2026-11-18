import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErinTozourBadge } from './ErinTozourBadge';

const meta = {
  title: 'Media/ErinTozourBadge',
  component: ErinTozourBadge,
} satisfies Meta<typeof ErinTozourBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

// The mark and its colors are fixed; fill only changes its size
export const Default: Story = {};
