import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ICON_NAMES } from '../../../icons/icons.generated';
import { IconTile, type IconTileProps } from './IconTile';

const COLORS: IconTileProps['color'][] = [
  'accent-one',
  'accent-two',
  'accent-three',
  'accent-four',
  'accent-five',
  'accent-six',
];

const meta = {
  title: 'Media/IconTile',
  component: IconTile,
  args: { icon: 'hand', color: 'accent-one' },
  argTypes: {
    icon: { control: 'select', options: ICON_NAMES },
    color: { control: 'select', options: COLORS },
  },
} satisfies Meta<typeof IconTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Story layout only: the six colors in a row, each with its name under it
const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 'var(--verity-spacing-lg)' };
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

// All six colors, with the Footer's three icons and three more
const ICONS: IconTileProps['icon'][] = ['hand', 'verity', 'music', 'email', 'resume', 'theme'];

export const Colors: Story = {
  render: () => (
    <div style={row}>
      {COLORS.map((color, i) => (
        <div key={color} style={cell}>
          <IconTile icon={ICONS[i]} color={color} />
          <span style={caption}>{color}</span>
        </div>
      ))}
    </div>
  ),
};
