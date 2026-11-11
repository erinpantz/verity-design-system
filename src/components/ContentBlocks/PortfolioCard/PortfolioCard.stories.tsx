import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import { Container } from '../../Layout/Container';
import { Grid } from '../../Layout/Grid';
import { VerticalStack } from '../../Layout/VerticalStack';
import { PortfolioCard } from './PortfolioCard';

// Sample work, standing in for the site's case studies and galleries
const CASE_STUDY = {
  type: 'case-study' as const,
  href: '#laguna-companion',
  heading: 'Designing AI that care teams trust',
  project: 'Laguna Companion',
  year: '2024–2025',
  thumbnail: screenshot,
};

const BRAND_GALLERY = {
  type: 'brand-gallery' as const,
  href: '#northwind',
  heading: 'Northwind',
  year: '2019–2021',
  thumbnails: [landscape, shapes, screenshot] as [string, string, string],
};

const meta = {
  title: 'Content blocks/PortfolioCard',
  component: PortfolioCard,
  args: CASE_STUDY,
  argTypes: {
    type: { control: 'inline-radio', options: ['case-study', 'brand-gallery'] },
    size: { control: 'inline-radio', options: ['lg', 'sm'] },
    href: { control: 'text' },
    heading: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [2, 3] },
    project: { control: 'text' },
    year: { control: 'text' },
    thumbnail: { control: false },
    thumbnails: { control: false },
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
} satisfies Meta<typeof PortfolioCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// A case study: the text beside one 3:2 thumbnail
export const Default: Story = {};

// A brand gallery: the text beside three 1:1 thumbnails, in one row
export const BrandGallery: Story = {
  name: 'Brand gallery',
  args: BRAND_GALLERY,
};

// The states below are held on with the pseudo-states addon. They're story
// globals, not parameters, so the state doesn't stay on for every story
// opened afterwards. The zoom shows here too.

export const Hover: Story = {
  globals: { pseudo: { hover: true } },
};

export const Focus: Story = {
  globals: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  globals: { pseudo: { active: true } },
};

// In the content column, too narrow for the text and the pictures side by
// side, so the pictures wrap below the text. A brand gallery's three
// thumbnails stay in one row and shrink together.
export const Narrow: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--verity-spacing-lg)',
        maxInlineSize: 'var(--verity-content-column-width)',
      }}
    >
      <PortfolioCard {...CASE_STUDY} />
      <PortfolioCard {...BRAND_GALLERY} />
    </div>
  ),
};

// Side by side in a wide Grid with itemWidth="xl", so the large headings have
// room: two to a row on a wide screen, one on narrower ones. Each card lays
// itself out by its own width, so here the pictures sit below the text.
export const InAGrid: StoryObj = {
  name: 'In a Grid',
  render: () => (
    <Grid width="wide" itemWidth="xl" gap="lg">
      <PortfolioCard {...CASE_STUDY} />
      <PortfolioCard
        {...CASE_STUDY}
        href="#setup"
        heading="Making setup make sense"
        project="Ledgerly onboarding"
        year="2023"
        thumbnail={landscape}
      />
    </Grid>
  ),
};

// Stacked, gap md, as on the Portfolio page. Hover a card: it rises and grows
// without touching its neighbors.
export const InAStack: StoryObj = {
  name: 'In a stack',
  render: () => (
    <VerticalStack gap="md">
      <PortfolioCard {...CASE_STUDY} />
      <PortfolioCard {...BRAND_GALLERY} />
      <PortfolioCard
        {...CASE_STUDY}
        href="#setup"
        heading="Making setup make sense"
        project="Ledgerly onboarding"
        year="2023"
        thumbnail={landscape}
      />
    </VerticalStack>
  ),
};

// Small, for several side by side. Narrower than portfolio-card/stack-width
// (640), as here, the picture sits on top of the text.
export const Small: Story = {
  args: { size: 'sm' },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: 'var(--verity-grid-item-min-width-lg)' }}>
        <Story />
      </div>
    ),
  ],
};

const SETUP = {
  ...CASE_STUDY,
  href: '#setup',
  heading: 'Making setup make sense',
  project: 'Ledgerly onboarding',
  year: '2023',
  thumbnail: landscape,
};

const GALLERY_TWO = { ...BRAND_GALLERY, href: '#lumen', heading: 'Lumen', year: '2018' };

// Three small cards in a wide Grid with itemWidth="md" and fillRows: three
// across, each narrower than the stack width, so each has its picture on top. The rows stretch the cards to the
// same height, and the extra space goes above the labels, so they line up.
export const SmallInAGrid: StoryObj = {
  name: 'Small, in a Grid',
  render: () => (
    <Grid width="wide" itemWidth="md" fillRows>
      <PortfolioCard {...CASE_STUDY} size="sm" />
      <PortfolioCard {...BRAND_GALLERY} size="sm" />
      <PortfolioCard {...SETUP} size="sm" />
    </Grid>
  ),
};

// Narrower, in the content column: two plus one. The third card takes the
// row's full width, at least the stack width, so its picture moves beside
// its text.
export const SmallInAGridNarrow: StoryObj = {
  name: 'Small, in a Grid, narrower',
  render: () => (
    <div style={{ maxInlineSize: 'var(--verity-content-column-width)' }}>
      <Grid itemWidth="md" fillRows>
        <PortfolioCard {...CASE_STUDY} size="sm" />
        <PortfolioCard {...SETUP} size="sm" />
        <PortfolioCard {...BRAND_GALLERY} size="sm" />
      </Grid>
    </div>
  ),
};

// The same, with a case study alone on the last row
export const SmallInAGridNarrowCaseStudy: StoryObj = {
  name: 'Small, in a Grid, narrower, case study last',
  render: () => (
    <div style={{ maxInlineSize: 'var(--verity-content-column-width)' }}>
      <Grid itemWidth="md" fillRows>
        <PortfolioCard {...BRAND_GALLERY} size="sm" />
        <PortfolioCard {...GALLERY_TWO} size="sm" />
        <PortfolioCard {...CASE_STUDY} size="sm" />
      </Grid>
    </div>
  ),
};


// A lone small card at the wide width: at least the stack width, so the
// picture and the text sit side by side, sharing the width equally
export const SmallWide: Story = {
  name: 'Small, wide',
  args: { size: 'sm' },
};

// The same, for a brand gallery: the three thumbnails stay square
export const SmallWideBrandGallery: Story = {
  name: 'Small, wide, brand gallery',
  args: { ...BRAND_GALLERY, size: 'sm' },
};
