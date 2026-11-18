import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavIcon, type NavIconPose, type NavIconProps } from './NavIcon';

const PAGES: NavIconProps['page'][] = ['portfolio', 'playground', 'profile'];
const POSES: NavIconPose[] = ['default', 'hover', 'hover-mirrored', 'current'];

const meta = {
  title: 'Navigation/NavIcon',
  component: NavIcon,
  args: { page: 'portfolio', fill: false },
  argTypes: {
    page: { control: 'inline-radio', options: PAGES },
    pose: { control: 'inline-radio', options: [undefined, ...POSES] },
    fill: { control: 'boolean' },
  },
} satisfies Meta<typeof NavIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

// Story layout only: a row of poses, each with its name under it
const row: CSSProperties = { display: 'flex', gap: 'var(--verity-spacing-lg)' };
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

function Poses({ page }: { page: NavIconProps['page'] }) {
  return (
    <div style={row}>
      {POSES.map((pose) => (
        <div key={pose} style={cell}>
          <NavIcon page={page} pose={pose} />
          <span style={caption}>{pose}</span>
        </div>
      ))}
    </div>
  );
}

// No pose: the icon in its own color, at rest, without its accents
export const Default: Story = {};

// Each pose set with the pose prop, accent colors on. Only Profile has a
// mirrored hover pose; Portfolio and Playground show their usual hover pose.
export const Portfolio: Story = {
  render: () => <Poses page="portfolio" />,
};

export const Playground: Story = {
  render: () => <Poses page="playground" />,
};

export const Profile: Story = {
  render: () => <Poses page="profile" />,
};

// With fill, it takes its container's width and height. The box here is
// story scaffolding: the container has to set both.
export const Fill: Story = {
  args: { page: 'profile', pose: 'hover', fill: true },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 'var(--verity-size-96)', blockSize: 'var(--verity-size-96)' }}>
        <Story />
      </div>
    ),
  ],
};
