import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../../Layout/Container';
import { Grid } from '../../Layout/Grid';
import { VerticalStack } from '../../Layout/VerticalStack';
import { Heading } from '../Heading';
import { TextBlock } from './TextBlock';

const meta = {
  title: 'Text/TextBlock',
  component: TextBlock,
  args: {
    heading: 'The problem',
    headingLevel: 3,
    children:
      'New customers stalled on the second step of setup. Half of them left before they connected their first account, and support tickets about setup doubled in a year.',
  },
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [1, 2, 3] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof TextBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoParagraphs: Story = {
  name: 'Two paragraphs',
  args: {
    children: (
      <>
        <p>
          New customers stalled on the second step of setup. Half of them left before they connected
          their first account.
        </p>
        <p>Support tickets about setup doubled in a year, and most asked the same three questions.</p>
      </>
    ),
  },
};

export const HeadingLevel2: Story = {
  name: 'Heading level 2',
  args: { heading: 'Research and discovery', headingLevel: 2 },
};

// A section of a case study: a level 2 heading over a Grid of level 3 TextBlocks
export const InContext: Story = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Container as="section" width="wide">
      <VerticalStack gap="md">
        <Heading level={2}>Outcomes</Heading>
        <Grid>
          <TextBlock heading="Faster setup">
            The median time to connect a first account fell from 14 minutes to 4.
          </TextBlock>
          <TextBlock heading="Fewer tickets">
            Setup tickets dropped by 60 percent in the first quarter after launch.
          </TextBlock>
          <TextBlock heading="More customers stayed">
            Three in four new customers finished setup, up from one in two.
          </TextBlock>
        </Grid>
      </VerticalStack>
    </Container>
  ),
};
