import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../../Layout/Section';
import { VerticalStack } from '../../Layout/VerticalStack';
import { ExperienceItem, type ExperienceItemProps } from './ExperienceItem';

// Made-up roles, as a Profile page would list them
const ROLES: ExperienceItemProps[] = [
  {
    company: 'Northwind Health',
    title: 'Head of Design',
    dates: 'Jan 2024 – Sep 2026',
    description: 'I led product and marketing design, from research to shipped work, and grew the design team from two to six.',
  },
  {
    company: 'Lumen Bank',
    title: 'Senior Product Designer',
    dates: 'Mar 2020 – Dec 2023',
    description: 'I redesigned account setup for small businesses, which cut the time to a first payment in half.',
  },
  {
    company: 'Fieldwork Studio',
    title: 'Product Designer',
    dates: 'Jun 2016 – Feb 2020',
    description: 'I designed apps for clients in health care and retail, and set up the studio’s first design system.',
  },
];

const meta = {
  title: 'Content blocks/ExperienceItem',
  component: ExperienceItem,
  args: { ...ROLES[0], headingLevel: 3 },
  argTypes: {
    company: { control: 'text' },
    title: { control: 'text' },
    dates: { control: 'text' },
    description: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [2, 3] },
  },
} satisfies Meta<typeof ExperienceItem>;

export default meta;

type Story = StoryObj<typeof meta>;

// As wide as the canvas: a row, at or above experience-item/stack-width
// (800). Narrow the window below that to see it stack.
export const Row: Story = {};

// 600 wide (story layout only), below the stack width: the credentials sit
// under the company
export const Stacked: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: 'var(--verity-experience-item-credentials-max-width)' }}>
        <Story />
      </div>
    ),
  ],
};

// A long company name wraps within its side of the row
export const LongCompanyName: Story = {
  name: 'Long company name',
  args: { company: 'The Northwind Regional Health and Care Partnership' },
};

// How a page uses it: a list (each item an <li>) in a VerticalStack with no
// gap, under a Section's h2, so each company is an h3. The top borders
// divide the rows.
const list = (width?: 'wide') => (
  <Section heading="Experience" width={width}>
    <VerticalStack as="ul" gap="none" width={width}>
      {ROLES.map((role) => (
        <li key={role.company}>
          <ExperienceItem {...role} />
        </li>
      ))}
    </VerticalStack>
  </Section>
);

export const InASection: StoryObj = {
  name: 'In a Section',
  render: () => list(),
  parameters: { layout: 'fullscreen' },
};

export const InAWideSection: StoryObj = {
  name: 'In a wide Section',
  render: () => list('wide'),
  parameters: { layout: 'fullscreen' },
};
