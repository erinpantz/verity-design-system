import type { Meta, StoryObj } from '@storybook/react-vite';
import { ICON_NAMES } from '../../../icons/icons.generated';
import { Icon } from './Icon';

const meta = {
  title: 'Media/Icon',
  component: Icon,
  args: {
    name: 'email',
    size: 'md',
  },
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  name: 'With label',
  args: { name: 'resume', label: 'Resume' },
};
