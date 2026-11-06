import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import improvedEditing from '../../../foundations/sample-videos/improved-editing.mp4';
import improvedEditingPoster from '../../../foundations/sample-videos/improved-editing-poster.webp';
import { Container } from '../../Layout/Container';
import { MediaBlock } from '../MediaBlock';
import { ReducedMotionOverride } from '../Playback/useReducedMotion';
import { Video } from './Video';

// The sample clip, from the Laguna Companion case study: 1920 × 1080, 10.7
// seconds, no audio track
const IMPROVED_EDITING = {
  src: improvedEditing,
  poster: improvedEditingPoster,
  alt: 'A call summary is edited: a line is selected, rewritten, and saved, and the summary updates',
};

const meta = {
  title: 'Media/Video',
  component: Video,
  // In the content column, as on a page
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
  args: IMPROVED_EDITING,
  argTypes: {
    src: { control: false },
    poster: { control: false },
    alt: { control: 'text' },
    aspectRatio: { control: 'inline-radio', options: ['16:9', '3:2', '1:1'] },
  },
} satisfies Meta<typeof Video>;

export default meta;

type Story = StoryObj<typeof meta>;

// Plays on a loop while it's on screen. Hover over it to see the pause button.
export const Default: Story = {};

// Paused by the visitor: the frame holds, and the play button always shows.
// The story presses pause for you, a moment after the video starts.
export const Paused: Story = {
  parameters: { docs: { story: { autoplay: true } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(
      () => expect(canvasElement.querySelector('[data-showing]')).not.toBeNull(),
      { timeout: 10000 },
    );
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await userEvent.click(canvas.getByRole('button', { name: 'Pause video' }));
  },
};

// With “reduce motion” on, it starts paused on the poster, and plays only
// when the visitor presses play. This story turns the setting on for itself;
// on a site, it comes from the visitor's system settings.
export const ReduceMotion: Story = {
  name: 'Reduce motion',
  decorators: [
    (Story) => (
      <ReducedMotionOverride.Provider value={true}>
        <Story />
      </ReducedMotionOverride.Provider>
    ),
  ],
};

// Wide, to show the detail of a prototype, with a caption in the column
export const InAMediaBlock: StoryObj = {
  name: 'In a MediaBlock',
  render: () => (
    <MediaBlock
      width="wide"
      caption="Editing a summary takes one click: select a line, rewrite it, and it saves."
    >
      <Video {...IMPROVED_EDITING} />
    </MediaBlock>
  ),
};
