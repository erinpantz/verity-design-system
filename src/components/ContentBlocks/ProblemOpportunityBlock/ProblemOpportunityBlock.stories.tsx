import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '../../Layout/Grid';
import { Section } from '../../Layout/Section';
import { ProblemOpportunityBlock } from './ProblemOpportunityBlock';

const meta = {
  title: 'Content blocks/ProblemOpportunityBlock',
  component: ProblemOpportunityBlock,
  args: {
    problem: 'Half of shoppers left at checkout. It took six steps, and delivery times only showed at the end.',
    opportunity: 'Most people buy the same things every week. A checkout that remembers them could take one step.',
  },
  argTypes: {
    problem: { control: 'text' },
    opportunity: { control: 'text' },
  },
} satisfies Meta<typeof ProblemOpportunityBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// A case study's findings: a Section with a Grid of ProblemOpportunityBlocks
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Section heading="What we found" intro="Two problems came up in every interview.">
      <Grid itemWidth="md">
        <ProblemOpportunityBlock
          problem="Checkout took six steps, and most people knew what they wanted before they started."
          opportunity="A checkout that remembers last week’s basket could take one step."
        />
        <ProblemOpportunityBlock
          problem="Delivery slots showed at the last step, and the one people wanted was often full."
          opportunity="Showing open slots first would let people plan their order around them."
        />
      </Grid>
    </Section>
  ),
};
