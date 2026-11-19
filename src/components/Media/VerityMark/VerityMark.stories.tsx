import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerityMark, type VerityMarkProps } from './VerityMark';

const SIZES: NonNullable<VerityMarkProps['size']>[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Media/VerityMark',
  component: VerityMark,
  args: { size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
  },
} satisfies Meta<typeof VerityMark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Story layout only: the three sizes in a row, each with its name under it
const row: CSSProperties = { display: 'flex', alignItems: 'flex-end', gap: 'var(--verity-spacing-lg)' };
const cell: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--verity-spacing-xxs)',
};
const caption: CSSProperties = {
  fontFamily: 'var(--verity-viewport-typography-label-sm-font-family)',
  fontSize: 'var(--verity-viewport-typography-label-sm-font-size)',
  fontWeight: 'var(--verity-viewport-typography-label-sm-font-weight)',
  lineHeight: 'var(--verity-viewport-typography-label-sm-line-height)',
  color: 'var(--verity-color-content-subtle)',
};

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      {SIZES.map((size) => (
        <div key={size} style={cell}>
          <VerityMark size={size} />
          <span style={caption}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
