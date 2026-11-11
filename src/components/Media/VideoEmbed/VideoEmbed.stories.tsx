import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import { Container } from '../../Layout/Container';
import { VideoEmbed } from './VideoEmbed';

// Vimeo's own public sample video, from its player examples, not one of
// Erin's. The poster is a stand-in sample picture, so the alt describes it.
const SAMPLE = {
  provider: 'vimeo' as const,
  videoId: '76979871',
  title: 'The new Vimeo player',
  poster: landscape,
  alt: 'Purple hills under a setting sun',
};

const meta = {
  title: 'Media/VideoEmbed',
  component: VideoEmbed,
  // In the content column, as on a page
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
  args: SAMPLE,
  argTypes: {
    provider: { control: 'inline-radio', options: ['vimeo'] },
    videoId: { control: 'text' },
    title: { control: 'text' },
    poster: { control: false },
    alt: { control: 'text' },
    aspectRatio: { control: 'inline-radio', options: ['16:9', '3:2', '4:3', '1:1'] },
  },
} satisfies Meta<typeof VideoEmbed>;

export default meta;

type Story = StoryObj<typeof meta>;

// The poster and the play button. Nothing loads from Vimeo until it's pressed.
export const Default: Story = {};

// Presses play: the player replaces the poster in the same box, and focus
// moves into it. Vimeo loads here, so this story needs a connection.
export const Playing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Play The new Vimeo player' }));
    const player = await canvas.findByTitle('The new Vimeo player');
    await waitFor(() => expect(player.ownerDocument.activeElement).toBe(player));
  },
};

// The states below are held on with the pseudo-states addon. They're story
// globals, so the state doesn't stay on for every story opened afterwards.

export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

export const AspectRatio1To1: Story = {
  name: 'Aspect ratio 1:1',
  args: { aspectRatio: '1:1' },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: 'var(--verity-grid-item-min-width-lg)' }}>
        <Story />
      </div>
    ),
  ],
};
