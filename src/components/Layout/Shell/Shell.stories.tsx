import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import reel1 from '../../../foundations/sample-images/reel-1.png';
import reel2 from '../../../foundations/sample-images/reel-2.png';
import reel3 from '../../../foundations/sample-images/reel-3.png';
import reel4 from '../../../foundations/sample-images/reel-4.png';
import reel5 from '../../../foundations/sample-images/reel-5.png';
import { CaseStudyHeader } from '../../ContentBlocks/CaseStudyHeader';
import { Hero } from '../../ContentBlocks/Hero';
import { Gallery } from '../../Media/Gallery';
import { LayeredImage } from '../../Media/LayeredImage';
import type { LayeredImageProps } from '../../Media/LayeredImage';
import LayeredImageStories from '../../Media/LayeredImage/LayeredImage.stories';
import { Image } from '../../Media/Image';
import { MediaBlock } from '../../Media/MediaBlock';
import { Reel } from '../../Media/Reel';
import { Button } from '../../Actions/Button';
import { Prose } from '../../Text/Prose';
import { UnorderedList, UnorderedListItem } from '../../Text/UnorderedList';
import { Container } from '../Container';
import { Grid } from '../Grid';
import { TextBlock } from '../../Text/TextBlock';
import { Footer } from '../Footer';
import type { FooterProps } from '../Footer/Footer';
import FooterStories from '../Footer/Footer.stories';
import { Section } from '../Section';
import { Shell } from './Shell';

// The Footer's own example, so the two stay the same
const footer = <Footer {...(FooterStories.args as FooterProps)} />;

// A portfolio page, as Main
const page = (
  <>
    <Section
      heading="Portfolio"
      headingLevel={1}
      intro="Case studies from ten years of product design: research, design systems, and shipped work."
    />
    <Section heading="Selected work">
      <Gallery>
        <MediaBlock caption="Setup, before: step 2 asked for a bank login with no explanation.">
          <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
        </MediaBlock>
        <MediaBlock caption="Early sketches of the new flow.">
          <Image src={shapes} alt="Overlapping circles in blue, yellow, and green" />
        </MediaBlock>
        <MediaBlock caption="Field research with small-business owners in Ohio.">
          <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" />
        </MediaBlock>
      </Gallery>
    </Section>
    <Section heading="How I work">
      <UnorderedList>
        <UnorderedListItem title="Start with the people">
          I talk to the people who use a product before I change it, and again after.
        </UnorderedListItem>
        <UnorderedListItem title="Design the system, not just the screen">
          Each decision becomes a token, a component, or a rule, so the next screen is faster.
        </UnorderedListItem>
        <UnorderedListItem title="Ship, then measure">
          A design is done when it’s in people’s hands and we know whether it worked.
        </UnorderedListItem>
      </UnorderedList>
    </Section>
    <Section heading="About this site">
      <Prose>
        <p>
          This site is built with Verity, my design system. Every color, size, and space comes from a token
          exported from Figma, and the docs live in Storybook.
        </p>
        <p>
          The nav runs across the top of the page and stays there as the page scrolls. On a phone, the links move
          into a menu, one tap away.
        </p>
      </Prose>
    </Section>
  </>
);

// Home, as Main: a wide Hero on the default background, with a Reel as its
// media, then the page. With no band, the Reel's cards swing out across the
// page, dimmed away from their spot, behind the nav, the text, the content
// after the Hero, and the Footer, and are clipped at the window's sides.
const home = (
  <>
    <Container>
      <Hero
        width="wide"
        heading="Product designer with a creative toolkit"
        intro="I’m a senior product designer. I turn messy, high-stakes work into products people trust."
        media={<Reel images={[{ src: reel1 }, { src: reel2 }, { src: reel3 }, { src: reel4 }, { src: reel5 }]} />}
      />
    </Container>
    <Section heading="How I work">
      <UnorderedList>
        <UnorderedListItem title="Start with the people">
          I talk to the people who use a product before I change it, and again after.
        </UnorderedListItem>
        <UnorderedListItem title="Design the system, not just the screen">
          Each decision becomes a token, a component, or a rule, so the next screen is faster.
        </UnorderedListItem>
      </UnorderedList>
    </Section>
  </>
);

// A case study, as Main in focused mode: reading one piece of work
const caseStudy = (
  <>
    <Container>
      <CaseStudyHeader
        heading="Saving admin time and improving care quality"
        facts={[
          { title: 'Role', value: 'Lead product designer' },
          { title: 'Team', value: 'Two designers and six engineers' },
          { title: 'Year', value: '2025' },
        ]}
      />
    </Container>
    <Section heading="Overview">
      <Prose>
        <p>
          Carers ended each visit with twenty minutes of notes, written twice: once on paper and once in the office
          system. We designed a companion app that writes the notes during the visit.
        </p>
      </Prose>
      <MediaBlock width="wide">
        <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
      </MediaBlock>
    </Section>
    <Section heading="Results">
      <Prose>
        <p>Notes take four minutes instead of twenty, and the office copy is always up to date.</p>
      </Prose>
    </Section>
  </>
);

// A long page, as Main, to see the nav stay at the top: a Hero with a Reel
// and a LayeredImage, which both pass under the nav as the page scrolls, and
// links to headings further down, which land below the nav, not under it
const layered = LayeredImageStories.args as LayeredImageProps;
const paragraph = (
  <p>
    Each decision becomes a token, a component, or a rule, so the next screen is faster. I talk to the people who use a
    product before I change it, and again after, and a design is done when it’s in people’s hands and we know whether
    it worked. <a href="#the-system">Read about the system</a>.
  </p>
);
const longPage = (
  <>
    <Container>
      <Hero
        width="wide"
        heading="Product designer with a creative toolkit"
        intro="I’m a senior product designer. I turn messy, high-stakes work into products people trust."
        media={<Reel images={[{ src: reel1 }, { src: reel2 }, { src: reel3 }, { src: reel4 }, { src: reel5 }]} />}
      />
    </Container>
    <Section heading="On this page">
      <Prose>
        <ul>
          <li>
            <a href="#how-i-work">How I work</a>
          </li>
          <li>
            <a href="#the-system">The system</a>
          </li>
          <li>
            <a href="#what-s-next">What’s next</a>
          </li>
        </ul>
      </Prose>
    </Section>
    <Section heading="Hello">
      <Grid itemWidth="lg" gap="lg">
        <LayeredImage {...layered} />
        <TextBlock heading="A picture in layers">
          Move the pointer over it, then scroll: its shapes pass under the nav, like the rest of the page.
        </TextBlock>
      </Grid>
    </Section>
    <Section heading="Selected work">
      <Gallery>
        <MediaBlock caption="Setup, before: step 2 asked for a bank login with no explanation.">
          <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
        </MediaBlock>
        <MediaBlock caption="Early sketches of the new flow.">
          <Image src={shapes} alt="Overlapping circles in blue, yellow, and green" />
        </MediaBlock>
        <MediaBlock caption="Field research with small-business owners in Ohio.">
          <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" />
        </MediaBlock>
      </Gallery>
    </Section>
    <Container>
      <Prose>
        <h2 id="how-i-work">How I work</h2>
        {paragraph}
        {paragraph}
        {paragraph}
        <h2 id="the-system">The system</h2>
        {paragraph}
        {paragraph}
        {paragraph}
        <h2 id="what-s-next">What’s next</h2>
        {paragraph}
        {paragraph}
        {paragraph}
      </Prose>
    </Container>
  </>
);

const meta = {
  title: 'Layout/Shell',
  component: Shell,
  args: { children: page, footer, current: 'portfolio' },
  argTypes: {
    children: { control: false },
    footer: { control: false },
    current: { control: 'inline-radio', options: [undefined, 'portfolio', 'playground', 'profile'] },
    hrefs: { control: false },
    mode: { control: 'inline-radio', options: ['default', 'focused'] },
    backLink: { control: 'object' },
    action: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    // On the docs page, each example gets its own frame
    docs: { story: { inline: false, height: '40rem' } },
  },
} satisfies Meta<typeof Shell>;

export default meta;

type Story = StoryObj<typeof meta>;

// The nav across the top: the full logo and the links. It stays at the top as the page scrolls.
export const XL: Story = {
  globals: { viewport: { value: 'xl' } },
};

export const Large: Story = {
  globals: { viewport: { value: 'lg' } },
};

// Still the full logo and the links: at 768 wide, the nav has room for both
export const Medium: Story = {
  globals: { viewport: { value: 'md' } },
};

// The full logo and the menu button, which opens the links in NavOverlay
export const Small: Story = {
  globals: { viewport: { value: 'sm' } },
};

// Focused mode: a case study with a link back instead of the nav. The back
// link floats in the top-left corner and ThemeToggle in the bottom-right.
const focused = {
  mode: 'focused' as const,
  children: caseStudy,
  backLink: { href: '#portfolio', label: 'Portfolio' },
};

export const FocusedXL: Story = {
  name: 'Focused, XL',
  args: focused,
  globals: { viewport: { value: 'xl' } },
};

export const FocusedLarge: Story = {
  name: 'Focused, Large',
  args: focused,
  globals: { viewport: { value: 'lg' } },
};

export const FocusedMedium: Story = {
  name: 'Focused, Medium',
  args: focused,
  globals: { viewport: { value: 'md' } },
};

export const FocusedSmall: Story = {
  name: 'Focused, Small',
  args: focused,
  globals: { viewport: { value: 'sm' } },
};

// Focused mode with an action in the top-right corner, opposite the back
// link: a Button on a scrim, “Download,” that saves the page's PDF, as on the site's
// résumé page. Like the back link, it stays put as the page scrolls.
const withAction = {
  ...focused,
  action: (
    <Button variant="secondary" background="scrim" startIcon="download" href={screenshot} download="resume.png">
      Download
    </Button>
  ),
};

export const FocusedWithAnActionXL: Story = {
  name: 'Focused with an action, XL',
  args: withAction,
  globals: { viewport: { value: 'xl' } },
};

export const FocusedWithAnActionSmall: Story = {
  name: 'Focused with an action, Small',
  args: withAction,
  globals: { viewport: { value: 'sm' } },
};

// Home: a wide default Hero with a Reel, then the page. Mid-turn, the
// outgoing card dims as it rises behind the nav, and the incoming one
// brightens as it settles; both pass behind the content after the Hero.
// Resize to see it at any width: nothing scrolls sideways.
export const Home: Story = {
  args: { children: home, current: undefined },
  globals: { viewport: { value: 'xl' } },
};

// A long page: scroll it, and the nav stays at the top, with a divider
// along its bottom edge once you've scrolled. The Reel's cards and the
// LayeredImage's shapes pass under it. The links under “On this page” jump
// to headings that land just below the nav, and tabbing down the page never
// puts the focused link under it. Try it at every width: the menu layout
// sticks too, and its menu opens over everything.
export const LongPage: Story = {
  name: 'Long page',
  args: { children: longPage, current: undefined },
  globals: { viewport: { value: 'xl' } },
};
