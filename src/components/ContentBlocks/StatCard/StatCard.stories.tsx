import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '../../Layout/Grid';
import { Section } from '../../Layout/Section';
import { StatCard } from './StatCard';

const ACCENTS = ['accent-one', 'accent-two', 'accent-three', 'accent-four', 'accent-five', 'accent-six'] as const;

const meta = {
  title: 'Content blocks/StatCard',
  component: StatCard,
  args: {
    value: '38%',
    description: 'Fewer people left at checkout',
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['outlined', ...ACCENTS.map((a) => `outlined-${a}`), 'brand', ...ACCENTS],
    },
    value: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OutlinedAccents: StoryObj = {
  name: 'Outlined accents',
  render: () => (
    <Grid itemWidth="sm">
      {ACCENTS.map((accent) => (
        <StatCard key={accent} style={`outlined-${accent}`} value="38%" description={`outlined-${accent}`} />
      ))}
    </Grid>
  ),
};

export const Brand: Story = {
  args: { style: 'brand' },
};

export const FilledAccents: StoryObj = {
  name: 'Filled accents',
  render: () => (
    <Grid itemWidth="sm">
      {ACCENTS.map((accent) => (
        <StatCard key={accent} style={accent} value="38%" description={accent} />
      ))}
    </Grid>
  ),
};

// A case study's results: a Section with a Grid of StatCards, as a list
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Section heading="The results" intro="Three months after launch, compared with the three months before.">
      <Grid as="ul" itemWidth="sm">
        <li><StatCard style="brand" value="38%" description="Fewer people left at checkout" /></li>
        <li><StatCard value="2 min" description="Faster to place a weekly order" /></li>
        <li><StatCard value="4.7" description="App store rating, up from 3.9" /></li>
      </Grid>
    </Section>
  ),
};
