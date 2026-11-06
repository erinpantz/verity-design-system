import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import { VerticalStack } from '../../Layout/VerticalStack';
import { TextBlock } from '../../Text/TextBlock';
import { Image } from './Image';

const meta = {
  title: 'Media/Image',
  component: Image,
  args: {
    src: landscape,
    alt: 'Hills at dusk, with the sun setting behind them',
    aspectRatio: '16:9',
    fit: 'cover',
    loading: 'lazy',
  },
  argTypes: {
    src: { control: false },
    alt: { control: 'text' },
    aspectRatio: { control: 'inline-radio', options: ['16:9', '3:2', '4:3', '1:1'] },
    fit: { control: 'inline-radio', options: ['cover', 'contain'] },
    loading: { control: 'inline-radio', options: ['lazy', 'eager'] },
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AspectRatio3x2: Story = {
  name: 'Aspect ratio 3:2',
  args: { aspectRatio: '3:2' },
};

// For screenshot boards and slides, which are often 4:3
export const AspectRatio4x3: Story = {
  name: 'Aspect ratio 4:3',
  args: { aspectRatio: '4:3' },
};

export const AspectRatio1x1: Story = {
  name: 'Aspect ratio 1:1',
  args: { aspectRatio: '1:1', src: shapes, alt: 'Overlapping circles in blue, yellow, and green' },
};

// A screenshot shown whole: contain keeps every edge, with space around it
export const FitContain: Story = {
  name: 'Fit contain',
  args: {
    src: screenshot,
    alt: 'The setup screen, on step 2 of 5: Connect your bank',
    aspectRatio: '1:1',
    fit: 'contain',
  },
};

// The same screenshot with cover: it fills the square, but its sides are cut off
export const FitCover: Story = {
  name: 'Fit cover',
  args: {
    src: screenshot,
    alt: 'The setup screen, on step 2 of 5: Connect your bank',
    aspectRatio: '1:1',
    fit: 'cover',
  },
};

// Decorative: the text beside it says everything, so alt is empty
export const Decorative: Story = {
  args: { alt: '', aspectRatio: '3:2' },
};

// A file that doesn't exist: the Skeleton's base color stays, with no shine
export const FailedToLoad: Story = {
  name: 'Failed to load',
  args: { src: 'missing-image.jpg' },
};

export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="md">
      <TextBlock heading="The new setup flow" headingLevel={2}>
        Each step now says why it asks for what it asks for.
      </TextBlock>
      <Image
        src={screenshot}
        alt="The setup screen, on step 2 of 5: Connect your bank"
        aspectRatio="16:9"
      />
    </VerticalStack>
  ),
};
