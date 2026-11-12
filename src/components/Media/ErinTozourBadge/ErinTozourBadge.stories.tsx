import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErinTozourBadge } from './ErinTozourBadge';

const meta = {
  title: 'Media/ErinTozourBadge',
  component: ErinTozourBadge,
} satisfies Meta<typeof ErinTozourBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

// It has no props: the mark, its size, and its colors are fixed
export const Default: Story = {};
