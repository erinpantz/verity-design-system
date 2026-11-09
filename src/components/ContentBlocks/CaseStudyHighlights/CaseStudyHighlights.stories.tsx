import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import { Container } from '../../Layout/Container';
import { Section } from '../../Layout/Section';
import { Image } from '../../Media/Image';
import { MediaBlock } from '../../Media/MediaBlock';
import { Prose } from '../../Text/Prose';
import { TextBlock } from '../../Text/TextBlock';
import { CaseStudyHighlights } from './CaseStudyHighlights';

// Three stand-in images, in MediaBlocks, as a case study would have
const images = (
  <>
    <MediaBlock caption="Step 2 of the old setup, where most people left">
      <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
    </MediaBlock>
    <MediaBlock caption="The design system’s shapes and colors">
      <Image src={shapes} alt="Overlapping circles in blue, yellow, and green" />
    </MediaBlock>
    <MediaBlock>
      <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" />
    </MediaBlock>
  </>
);

const meta = {
  title: 'Content blocks/CaseStudyHighlights',
  component: CaseStudyHighlights,
  args: { heading: 'Project highlights', headingLevel: 3, children: images },
  argTypes: {
    heading: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [1, 2, 3] },
    children: { control: false },
  },
} satisfies Meta<typeof CaseStudyHighlights>;

export default meta;

type Story = StoryObj<typeof meta>;

// In a Container, so it spans the wide width, as on a page
export const Default: Story = {
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

// Where it usually goes: in the Overview Section, under its heading, between
// the Overview's text and the next block. The Section sets the space around it.
export const InAnOverviewSection: StoryObj = {
  name: 'In an Overview Section',
  render: () => (
    <Section heading="Overview">
      <Prose>
        <p>
          Small businesses left setup at step 2, where it asked for a bank login before saying why.
          We rebuilt setup around what people needed to know first.
        </p>
      </Prose>
      <CaseStudyHighlights>{images}</CaseStudyHighlights>
      <TextBlock heading="My role">
        I led design, from research through launch, with a product manager and four engineers.
      </TextBlock>
    </Section>
  ),
};
