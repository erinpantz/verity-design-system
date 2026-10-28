import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { Heading } from '../../Text/Heading';
import { MetaItem } from '../../Text/MetaItem';
import { Prose } from '../../Text/Prose';
import { TextBlock } from '../../Text/TextBlock';
import { UnorderedList, UnorderedListItem } from '../../Text/UnorderedList';
import { Container } from '../Container';
import { Grid } from '../Grid';
import { Section } from './Section';

const meta = {
  title: 'Layout/Section',
  component: Section,
  // Full screen, without Storybook's padding, so the side margins are the Section's own
  parameters: { layout: 'fullscreen' },
  args: {
    heading: 'Research and discovery',
    headingLevel: 2,
    intro: 'We started with the people who left, to learn where setup lost them.',
    width: 'constrained',
    children: (
      <>
        <TextBlock heading="The problem">
          Half of new customers left before they connected their first account, and support tickets
          about setup doubled in a year.
        </TextBlock>
        <TextBlock heading="Who we talked to">
          Twelve customers who stopped during setup, and four who finished it.
        </TextBlock>
      </>
    ),
  },
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [1, 2, 3] },
    intro: { control: 'text' },
    width: { control: 'inline-radio', options: ['constrained', 'wide', 'full-bleed'] },
    children: { control: false },
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIntro: Story = {
  name: 'Without intro',
  args: { intro: undefined },
};

export const Wide: Story = {
  args: {
    heading: 'Outcomes',
    intro: 'Three months after launch, setup was faster and more people finished it.',
    width: 'wide',
    children: (
      <Grid>
        <TextBlock heading="Faster setup">The median time to connect an account fell from 14 minutes to 4.</TextBlock>
        <TextBlock heading="Fewer tickets">Setup tickets dropped by 60 percent.</TextBlock>
        <TextBlock heading="More customers stayed">Three in four finished setup, up from one in two.</TextBlock>
      </Grid>
    ),
  },
};

export const FullBleed: Story = {
  name: 'Full bleed',
  args: {
    heading: 'The new flow',
    intro: undefined,
    width: 'full-bleed',
    children: <Placeholder size="lg">Edge-to-edge image</Placeholder>,
  },
};

export const HeadingLevel3: Story = {
  name: 'Heading level 3',
  args: { heading: 'Interviews', headingLevel: 3, intro: undefined },
};

// A case study page: a header, then Sections, spaced by Main's section gap
export const InContext: StoryObj = {
  name: 'In context',
  render: () => (
    // Stands in for Main, which owns the space between Sections
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-main-spacing-section-gap)' }}>
      <Container as="header">
        <Heading level={1}>Redesigning the onboarding flow</Heading>
      </Container>
      <Section heading="Overview" intro="Half of new customers left during setup. This is how we found out why.">
        <Grid as="dl" itemWidth="sm">
          <MetaItem title="Role" value="Lead designer" />
          <MetaItem title="Timeline" value="March–August 2025" />
          <MetaItem title="Team" value="Two designers and four engineers" />
        </Grid>
      </Section>
      <Section heading="Research and discovery">
        <Prose>
          <p>
            We started with the people who left. Twelve customers who stopped during setup talked us
            through where they got stuck.
          </p>
          <blockquote>
            <p>“I didn’t know why you needed it, so I closed the tab.”</p>
          </blockquote>
        </Prose>
        <UnorderedList>
          <UnorderedListItem title="People didn’t know why we asked">
            The second step asked for a bank login with no explanation.
          </UnorderedListItem>
          <UnorderedListItem title="Errors sent people to support">
            A failed connection showed a code but no next step.
          </UnorderedListItem>
        </UnorderedList>
      </Section>
      <Section heading="Outcomes" width="wide">
        <Grid>
          <TextBlock heading="Faster setup">The median time to connect an account fell from 14 minutes to 4.</TextBlock>
          <TextBlock heading="Fewer tickets">Setup tickets dropped by 60 percent.</TextBlock>
          <TextBlock heading="More customers stayed">Three in four finished setup, up from one in two.</TextBlock>
        </Grid>
      </Section>
    </div>
  ),
};
