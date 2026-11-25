import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../../Actions/Link';
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

// A description of two paragraphs: a list of strings, one per paragraph,
// with body/lg's paragraph space between them. Narrow the window below the
// stack width to see it stacked.
export const TwoParagraphDescription: Story = {
  name: 'Two-paragraph description',
  args: {
    description: [
      'I designed the booking and check-in flows for a chain of clinics, from research with front-desk staff to shipped work.',
      'Check-in time fell by a third in the first year. The company was acquired in 2016, and the product folded into the new owner’s.',
    ],
  },
  argTypes: { description: { control: 'object' } },
};

// A description that links to proof of the work: an awards list and a blog
// post, on other sites, so they're plain links. Each one opens in a new tab
// with Link's own opensInNewTab: the site decides per link, not
// ExperienceItem.
// The second paragraph mixes text and Links, so it's wrapped in <>…</> to
// make it one paragraph. Each link's text says where it goes.
export const WithLinks: Story = {
  name: 'With links',
  args: {
    description: [
      'I led product and marketing design, from research to shipped work, and grew the design team from two to six.',
      <>
        Our patient app won{' '}
        <Link href="https://awards.northwindhealth.example/2025" opensInNewTab>
          three design awards in 2025
        </Link>
        ,
        and I wrote about{' '}
        <Link href="https://blog.northwindhealth.example/rebuilding-booking" opensInNewTab>
          how we rebuilt booking with front-desk staff
        </Link>
        .
      </>,
    ],
  },
  // Links can't be edited in the controls panel
  argTypes: { description: { control: false } },
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
