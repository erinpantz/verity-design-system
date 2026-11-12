import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactElement } from 'react';
import reel1 from '../../../foundations/sample-images/reel-1.png';
import reel2 from '../../../foundations/sample-images/reel-2.png';
import reel3 from '../../../foundations/sample-images/reel-3.png';
import reel4 from '../../../foundations/sample-images/reel-4.png';
import reel5 from '../../../foundations/sample-images/reel-5.png';
import { Hero } from '../../ContentBlocks/Hero';
import { Container } from '../../Layout/Container';
import { ReducedMotionOverride } from '../Playback/useReducedMotion';
import { Reel, type ReelProps } from './Reel';

// Five placeholder screens, made up for the stories, like Home's five
const IMAGES: ReelProps['images'] = [
  { src: reel1 },
  { src: reel2 },
  { src: reel3 },
  { src: reel4 },
  { src: reel5 },
];

// The cards move past the reel's edges, so it sits on a band that clips
// them, as in a subtle Hero: the subtle background, padding/lg, and rounded
// corners
const onBand = (Story: () => ReactElement) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      padding: 'var(--verity-padding-lg)',
      overflow: 'clip',
      borderRadius: 'var(--verity-border-radius-md)',
      background: 'var(--verity-color-background-subtle)',
    }}
  >
    <Story />
  </div>
);

const meta = {
  title: 'Media/Reel',
  component: Reel,
  args: { images: IMAGES },
  argTypes: {
    images: { control: false },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Reel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [onBand],
};

// Home's layout: a wide, subtle Hero with no actions and the Reel as its
// media. The cards pass behind the text and out of sight at the band's
// edges. Shown in a Container, with the page's side margins, as on a page.
export const InAHero: Story = {
  name: 'In a Hero',
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ paddingInline: 'var(--verity-main-padding-inline)' }}>
      <Container>
        <Hero
          background="subtle"
          width="wide"
          heading="Product designer with a creative toolkit"
          intro="I’m a senior product designer. I turn messy, high-stakes work into products people trust."
          media={<Reel {...args} />}
        />
      </Container>
    </div>
  ),
};

// With reduce motion on, whatever the computer is set to: each image
// crossfades in place, with the same hold and the same pausing
export const ReduceMotion: Story = {
  name: 'Reduce motion',
  decorators: [
    onBand,
    (Story) => (
      <ReducedMotionOverride.Provider value={true}>
        <Story />
      </ReducedMotionOverride.Provider>
    ),
  ],
};

// The turn four times slower, to review it: the dip, the rise past the spot,
// the fall just below it, and the settle. The hold stays the same.
// Story-only: the Reel itself always uses the reel/duration tokens.
export const SlowMotion: Story = {
  name: 'Slow motion',
  decorators: [
    onBand,
    (Story) => (
      <div
        style={
          {
            '--verity-reel-duration-dip': 'calc(var(--verity-duration-340) * 4)',
            '--verity-reel-duration-rise': 'calc(var(--verity-duration-525) * 4)',
            '--verity-reel-duration-fall': 'calc(var(--verity-duration-300) * 4)',
            '--verity-reel-duration-settle': 'calc(var(--verity-duration-260) * 4)',
          } as CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
};
