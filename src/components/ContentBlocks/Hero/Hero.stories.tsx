import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../../Layout/Section';
import { StatCard } from '../StatCard';
import { Grid } from '../../Layout/Grid';
import { Hero } from './Hero';

const meta = {
  title: 'Content blocks/Hero',
  component: Hero,
  args: {
    heading: 'I design tools that give people their time back',
    intro: 'I’m a senior product designer. I turn messy, high-stakes work into products people trust.',
    primaryAction: { label: 'View my work', href: '#work' },
    secondaryAction: { label: 'Book a call', href: '#contact' },
  },
  argTypes: {
    background: { control: 'inline-radio', options: ['default', 'knockout', 'brand'] },
    heading: { control: 'text' },
    intro: { control: 'text' },
    primaryAction: { control: 'object' },
    secondaryAction: { control: 'object' },
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Knockout: Story = {
  args: { background: 'knockout' },
};

export const Brand: Story = {
  args: { background: 'brand' },
};

export const OneAction: Story = {
  name: 'One action',
  args: { secondaryAction: undefined },
};

// The top of a home page: a Hero, then the first Section
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <>
      <Hero
        background="brand"
        heading="I design tools that give people their time back"
        intro="I’m a senior product designer. I turn messy, high-stakes work into products people trust."
        primaryAction={{ label: 'View my work', href: '#work' }}
        secondaryAction={{ label: 'Book a call', href: '#contact' }}
      />
      <Section heading="Results I’m proud of">
        <Grid as="ul" itemWidth="sm">
          <li><StatCard value="38%" description="Fewer people left at checkout" /></li>
          <li><StatCard value="6 hrs" description="Of admin saved per carer each week" /></li>
        </Grid>
      </Section>
    </>
  ),
};
