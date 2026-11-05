import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
// ?url gives the file's address, since the browser can't import a .lottie file
import careInsights from '../../../foundations/sample-animations/creating-care-insights.lottie?url';
import careInsightsPoster from '../../../foundations/sample-animations/creating-care-insights.png';
import conversationTips from '../../../foundations/sample-animations/creating-conversation-tips.lottie?url';
import conversationTipsPoster from '../../../foundations/sample-animations/creating-conversation-tips.png';
import summary from '../../../foundations/sample-animations/creating-summary.lottie?url';
import summaryPoster from '../../../foundations/sample-animations/creating-summary.png';
import { Grid } from '../../Layout/Grid';
import { MediaBlock } from '../MediaBlock';
import { Animation } from './Animation';
import { ReducedMotionOverride } from './useReducedMotion';

// The sample animations, from the Laguna Companion case study. Their artwork
// is square, so the stories use 1:1; the component's default is 16:9.
const SUMMARY = {
  src: summary,
  poster: summaryPoster,
  alt: 'A card fills with colored lines and shapes, above the words “Creating your call Summary…”',
};
const CONVERSATION_TIPS = {
  src: conversationTips,
  poster: conversationTipsPoster,
  alt: 'A sparkling light bulb next to a hand giving a thumbs-up',
};
const CARE_INSIGHTS = {
  src: careInsights,
  poster: careInsightsPoster,
  alt: 'A person with dots circling around them, above the words “Generating Care Insights…”',
};

const meta = {
  title: 'Media/Animation',
  component: Animation,
  args: { ...SUMMARY, aspectRatio: '1:1' },
  argTypes: {
    src: { control: false },
    poster: { control: false },
    alt: { control: 'text' },
    aspectRatio: { control: 'inline-radio', options: ['16:9', '3:2', '1:1'] },
  },
} satisfies Meta<typeof Animation>;

export default meta;

type Story = StoryObj<typeof meta>;

// Plays on a loop while it's on screen. Hover over it to see the pause button.
export const Default: Story = {};

// Paused by the visitor: the frame holds, and the play button always shows.
// The story presses pause for you, a moment after the animation starts.
export const Paused: Story = {
  parameters: { docs: { story: { autoplay: true } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(
      () => expect(canvasElement.querySelector('[data-showing]')).not.toBeNull(),
      { timeout: 10000 },
    );
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await userEvent.click(canvas.getByRole('button', { name: 'Pause animation' }));
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

export const InAMediaBlock: StoryObj = {
  name: 'In a MediaBlock',
  render: () => (
    <MediaBlock caption="While the call wraps up, Companion writes the summary.">
      <Animation {...SUMMARY} aspectRatio="1:1" />
    </MediaBlock>
  ),
};

// Three side by side, the way the Laguna Companion case study shows them.
// Each plays on its own, and pausing one leaves the others playing.
export const InAGrid: StoryObj = {
  name: 'In a Grid',
  render: () => (
    <Grid itemWidth="sm">
      <MediaBlock caption="Creating the summary">
        <Animation {...SUMMARY} aspectRatio="1:1" />
      </MediaBlock>
      <MediaBlock caption="Creating conversation tips">
        <Animation {...CONVERSATION_TIPS} aspectRatio="1:1" />
      </MediaBlock>
      <MediaBlock caption="Creating care insights">
        <Animation {...CARE_INSIGHTS} aspectRatio="1:1" />
      </MediaBlock>
    </Grid>
  ),
};
