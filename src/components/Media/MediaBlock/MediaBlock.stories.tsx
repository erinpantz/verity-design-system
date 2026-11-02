import type { Meta, StoryObj } from '@storybook/react-vite';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import { Section } from '../../Layout/Section';
import { Prose } from '../../Text/Prose';
import { Image } from '../Image';
import { MediaBlock } from './MediaBlock';

const meta = {
  title: 'Media/MediaBlock',
  component: MediaBlock,
  args: {
    caption: 'Step 2 asked for a bank login with no explanation.',
    children: (
      <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" borderRadius="md" />
    ),
  },
  argTypes: {
    caption: { control: 'text' },
    children: { control: false },
  },
} satisfies Meta<typeof MediaBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCaption: Story = {
  name: 'Without caption',
  args: { caption: undefined },
};

export const LongCaption: Story = {
  name: 'Long caption',
  args: {
    caption:
      'Step 2 asked for a bank login with no explanation. In interviews, most people who left said they stopped here, because they didn’t know why we needed it or where their details would go.',
  },
};

export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Section heading="Before the redesign" intro="The old setup flow had five steps and no explanations." width="wide">
      <Prose>
        <p>Half of the people who reached step 2 left the flow there.</p>
      </Prose>
      <MediaBlock caption="Step 2 asked for a bank login with no explanation.">
        <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" borderRadius="md" />
      </MediaBlock>
    </Section>
  ),
};
