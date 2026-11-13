import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import reel2 from '../../../foundations/sample-images/reel-2.png';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import { Container } from '../../Layout/Container';
import { Grid } from '../../Layout/Grid';
import { ProjectCard } from './ProjectCard';

// Sample work, standing in for the site's case studies and galleries
const PROJECTS = [
  { href: '#medication', heading: 'Helping people take their cancer meds on time', thumbnail: screenshot },
  { href: '#care-notes', heading: 'Saving admin time and improving care quality', thumbnail: landscape },
  { href: '#northwind', heading: 'Northwind', thumbnail: shapes },
  { href: '#setup', heading: 'Making setup make sense for small businesses', thumbnail: reel2 },
];

const meta = {
  title: 'Content blocks/ProjectCard',
  component: ProjectCard,
  args: PROJECTS[0],
  argTypes: {
    href: { control: 'text' },
    heading: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [2, 3] },
    thumbnail: { control: false },
  },
  // Wide, as on the Portfolio page
  decorators: [
    (Story) => (
      <Container>
        <div data-width="wide">
          <Story />
        </div>
      </Container>
    ),
  ],
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// As wide as its space: a row on a wide screen, stacked on a narrow one
export const Default: Story = {};

// Two cards to show where the layout switches. The first is exactly
// project-card/stack-width wide for the screen's breakpoint (960, 820, 660,
// 560 on XL, Large, Medium, Small), so it's a row; the second is 1px
// narrower, so it's stacked. Pick a screen size in the viewport menu.
// On Small, the screen is narrower than 560, so a card there is always
// stacked. Story-only widths, from the token.
const atWidth = (width: string) => (Story: () => ReactElement) => (
  <div style={{ inlineSize: width, maxInlineSize: 'none' }}>
    <Story />
  </div>
);

export const AtTheStackWidth: Story = {
  name: 'Row: card exactly at the stack width',
  decorators: [atWidth('var(--verity-project-card-stack-width)')],
};

export const BelowTheStackWidth: Story = {
  name: 'Stacked: card 1px narrower than the stack width',
  decorators: [atWidth('calc(var(--verity-project-card-stack-width) - 1px)')],
};

// The states below are held on with the pseudo-states addon. They're story
// tools only: in the site, the card follows the pointer and the keyboard.
export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

// In a wide Grid with itemWidth="xl", gap="lg", and fillRows: one, two,
// three, and four cards. Cards in a row are as tall as the tallest, with the
// extra height at the bottom of the title area.
const grid = (count: number) => () => (
  <Grid width="wide" itemWidth="xl" gap="lg" fillRows>
    {PROJECTS.slice(0, count).map((project) => (
      <ProjectCard key={project.href} {...project} />
    ))}
  </Grid>
);

export const InAGridOne: StoryObj = { name: 'In a Grid, one', render: grid(1) };
export const InAGridTwo: StoryObj = { name: 'In a Grid, two', render: grid(2) };
export const InAGridThree: StoryObj = { name: 'In a Grid, three', render: grid(3) };
export const InAGridFour: StoryObj = { name: 'In a Grid, four', render: grid(4) };
