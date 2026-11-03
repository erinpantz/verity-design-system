import type { Meta, StoryObj } from '@storybook/react-vite';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import { Section } from '../../Layout/Section';
import { Image } from '../../Media/Image';
import { MediaBlock } from '../../Media/MediaBlock';
import { TextBlock } from '../../Text/TextBlock';
import { MediaText } from './MediaText';

const text = (
  <TextBlock heading="Setup asked for too much, too soon">
    Step 2 asked for a bank login before people knew why. Most people who left setup left here.
  </TextBlock>
);

const media = (
  <MediaBlock caption="Step 2 of the old setup">
    <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" borderRadius="md" />
  </MediaBlock>
);

const meta = {
  title: 'Content blocks/MediaText',
  component: MediaText,
  args: { text, media },
  argTypes: {
    layout: { control: 'inline-radio', options: ['row', 'stacked'] },
    mediaPosition: { control: 'inline-radio', options: ['right', 'left'] },
    mediaRatio: { control: 'inline-radio', options: ['60', '50', '40'] },
    text: { control: false },
    media: { control: false },
  },
} satisfies Meta<typeof MediaText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MediaLeft: Story = {
  name: 'Media left',
  args: { mediaPosition: 'left' },
};

export const Ratios: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-spacing-lg)' }}>
      <MediaText text={text} media={media} mediaRatio="60" />
      <MediaText text={text} media={media} mediaRatio="50" />
      <MediaText text={text} media={media} mediaRatio="40" />
    </div>
  ),
};

export const Stacked: Story = {
  args: { layout: 'stacked' },
};

// A row in a column narrower than the stack width (800px) stacks by itself,
// whatever the screen's width. This column is three quarters of it.
export const NarrowColumn: Story = {
  name: 'Row in a narrow column',
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: 'calc(var(--verity-media-text-stack-width) * 0.75)' }}>
        <Story />
      </div>
    ),
  ],
};

// A case study's findings: a Section with MediaTexts, alternating sides
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Section heading="What we found" intro="Two moments in setup lost the most people." width="wide">
      <MediaText text={text} media={media} />
      <MediaText
        mediaPosition="left"
        text={
          <TextBlock heading="Nobody knew how long it would take">
            The progress bar showed five steps, but step 4 had three screens of its own. People felt stuck.
          </TextBlock>
        }
        media={media}
      />
    </Section>
  ),
};
