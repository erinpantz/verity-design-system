import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { VerticalStack } from '../../Layout/VerticalStack';
import { TextBlock } from '../../Text/TextBlock';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback and status/Skeleton',
  component: Skeleton,
  args: { showShine: true },
  argTypes: {
    showShine: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

// A Skeleton fills the space it's given, so the stories give it the shape of
// a 16:9 Image with md corners
const imageShape: Decorator = (Story) => (
  <div style={{ aspectRatio: '16 / 9', borderRadius: 'var(--verity-border-radius-md)' }}>
    <Story />
  </div>
);

export const Default: Story = {
  decorators: [imageShape],
};

// What an image that failed to load keeps: the base color, with no shine
export const WithoutShine: Story = {
  name: 'Without shine',
  args: { showShine: false },
  decorators: [imageShape],
};

// Where it usually appears: in an Image's place, under the text that introduces it
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="md">
      <TextBlock heading="The new setup flow" headingLevel={2}>
        Each step now says why it asks for what it asks for.
      </TextBlock>
      <div style={{ aspectRatio: '16 / 9', borderRadius: 'var(--verity-border-radius-md)' }}>
        <Skeleton />
      </div>
    </VerticalStack>
  ),
};
