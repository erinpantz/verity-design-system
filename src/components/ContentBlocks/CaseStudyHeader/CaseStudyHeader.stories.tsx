import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../../Layout/Container';
import { Section } from '../../Layout/Section';
import { TextBlock } from '../../Text/TextBlock';
import { CaseStudyHeader } from './CaseStudyHeader';

const meta = {
  title: 'Content blocks/CaseStudyHeader',
  component: CaseStudyHeader,
  args: {
    badge: { label: 'Case study' },
    heading: 'Saving admin time and improving care quality',
    facts: [
      { title: 'Role', value: 'Lead product designer' },
      { title: 'Team', value: 'Two designers and six engineers' },
      { title: 'Year', value: '2025' },
    ],
  },
  argTypes: {
    badge: { control: 'object' },
    heading: { control: 'text' },
    facts: { control: 'object' },
  },
} satisfies Meta<typeof CaseStudyHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BadgeColor: Story = {
  name: 'Badge color',
  args: { badge: { label: 'Healthcare', color: 'accent-one' } },
};

export const MoreFacts: Story = {
  name: 'More facts',
  args: {
    facts: [
      { title: 'Role', value: 'Lead product designer' },
      { title: 'Team', value: 'Two designers and six engineers' },
      { title: 'Timeline', value: 'Eight months' },
      { title: 'Year', value: '2025' },
      { title: 'Tools', value: 'Figma, Dovetail, and Maze' },
    ],
  },
};

// The top of a case study page: a CaseStudyHeader in a Container, then the
// first Section, with Main's gap between them
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-main-spacing-section-gap)' }}>
      <Container>
        <CaseStudyHeader
          badge={{ label: 'Case study' }}
          heading="Saving admin time and improving care quality"
          facts={[
            { title: 'Role', value: 'Lead product designer' },
            { title: 'Team', value: 'Two designers and six engineers' },
            { title: 'Year', value: '2025' },
          ]}
        />
      </Container>
      <Section heading="The challenge">
        <TextBlock heading="Carers spent hours on paperwork">
          Each visit ended with twenty minutes of notes, written twice: once on paper and once in the office system.
        </TextBlock>
      </Section>
    </div>
  ),
};
