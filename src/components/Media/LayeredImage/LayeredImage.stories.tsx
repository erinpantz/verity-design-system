import type { Meta, StoryObj } from '@storybook/react-vite';
import shapesPhoto from '../../../foundations/sample-images/shapes.jpg';
import { Container } from '../../Layout/Container';
import { Grid } from '../../Layout/Grid';
import { TextBlock } from '../../Text/TextBlock';
import { ReducedMotionOverride } from '../Playback/useReducedMotion';
import { LayeredImage, type LayeredImageLayer } from './LayeredImage';

// Simple shapes for the stories, as SVG files written inline. Each is drawn
// in one color; the layer's color prop decides which Verity color it shows.
const svg = (viewBox: string, body: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`)}`;

const SQUARE = svg('0 0 100 100', '<rect width="100" height="100"/>');
const CIRCLE = svg('0 0 100 100', '<circle cx="50" cy="50" r="50"/>');
const RING = svg('0 0 100 100', '<circle cx="50" cy="50" r="42" fill="none" stroke="black" stroke-width="16"/>');
const TRIANGLE = svg('0 0 100 90', '<path d="M50 0 100 90H0Z"/>');
const SQUIGGLE = svg(
  '0 0 200 60',
  '<path d="M10 30q25-30 50 0t50 0 50 0 30 0" fill="none" stroke="black" stroke-width="12" stroke-linecap="round"/>',
);

// The bottom layer still; the shapes in front of it at different depths
const SHAPES: LayeredImageLayer[] = [
  { src: SQUARE, x: 0, y: 0, width: 100, depth: 0, radius: 'lg', color: '--verity-color-background-brand' },
  { src: CIRCLE, x: 46, y: 14, width: 40, depth: 0.5, color: '--verity-color-accent-violet' },
  { src: RING, x: 12, y: 50, width: 30, depth: 1, color: '--verity-color-accent-yellow' },
  { src: TRIANGLE, x: 66, y: 62, width: 14, depth: -1, color: '--verity-color-accent-pink' },
  { src: SQUIGGLE, x: 18, y: 18, width: 34, depth: 2, color: '--verity-color-content-default' },
];

const meta = {
  title: 'Media/LayeredImage',
  component: LayeredImage,
  args: {
    alt: 'A large circle, a ring, a small triangle, and a squiggle on a rounded square',
    layers: SHAPES,
    aspectRatio: '1:1',
    tilt: true,
  },
  argTypes: {
    aspectRatio: { control: 'inline-radio', options: ['16:9', '3:2', '4:3', '1:1'] },
    tilt: { control: 'boolean' },
    loading: { control: 'inline-radio', options: ['lazy', 'eager'] },
    layers: { control: false },
  },
  // Story layout only: beside some text, as on a Profile page
  decorators: [
    (Story) => (
      <Container>
        <Grid itemWidth="lg" gap="lg">
          <Story />
          <TextBlock heading="Move the pointer over the picture">
            Each shape moves at its own depth, and the picture tilts toward the pointer. On touch, or with
            reduce motion on, it stays still.
          </TextBlock>
        </Grid>
      </Container>
    ),
  ],
} satisfies Meta<typeof LayeredImage>;

export default meta;

type Story = StoryObj<typeof meta>;

// Shapes in Verity's colors, so they follow the Theme toolbar
export const Default: Story = {};

// A photo at the bottom, with the photo's own corners, and shapes in front
export const OnAPhoto: Story = {
  name: 'On a photo',
  args: {
    alt: 'Colored circles over a horizon, with a ring and a squiggle in front',
    layers: [
      { src: shapesPhoto, x: 0, y: 0, width: 100, depth: 0, radius: 'lg' },
      { src: RING, x: 58, y: 8, width: 26, depth: 1, color: '--verity-color-accent-yellow' },
      { src: SQUIGGLE, x: 8, y: 72, width: 40, depth: 2, color: '--verity-color-content-default' },
    ],
  },
};

// Only the layers move; the frame stays flat
export const WithoutTilt: Story = {
  name: 'Without tilt',
  args: { tilt: false },
};

// With reduce motion on, everything stays at rest, even under the pointer
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
