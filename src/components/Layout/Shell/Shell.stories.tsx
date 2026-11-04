import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import { Gallery } from '../../Media/Gallery';
import { Image } from '../../Media/Image';
import { MediaBlock } from '../../Media/MediaBlock';
import { Prose } from '../../Text/Prose';
import { UnorderedList, UnorderedListItem } from '../../Text/UnorderedList';
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
          On a phone, the menu is one tap away in the top bar. On a wide screen, the nav sits beside the page; collapse
          it to the rail for more room.
        </p>
      </Prose>
    </Section>
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
  },
  parameters: {
    layout: 'fullscreen',
    // One viewport per breakpoint, at the width of Figma's Shell frames
    // (each breakpoint's viewport/default-width)
    viewport: {
      options: {
        sm: { name: 'Small (375px)', styles: { width: '375px', height: '812px' }, type: 'mobile' },
        md: { name: 'Medium (768px)', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        lg: { name: 'Large (1200px)', styles: { width: '1200px', height: '800px' }, type: 'desktop' },
        xl: { name: 'XL (1600px)', styles: { width: '1600px', height: '900px' }, type: 'desktop' },
      },
    },
    // On the docs page, each example gets its own frame
    docs: { story: { inline: false, height: '40rem' } },
  },
} satisfies Meta<typeof Shell>;

export default meta;

type Story = StoryObj<typeof meta>;

// The nav on the left, expanded. The menu button collapses it to the rail.
export const XL: Story = {
  globals: { viewport: { value: 'xl' } },
};

export const Large: Story = {
  globals: { viewport: { value: 'lg' } },
};

// The rail. Its menu button opens the full menu over the page.
export const Medium: Story = {
  globals: { viewport: { value: 'md' } },
};

// The top bar, pinned while the page scrolls. Its menu button opens the full menu.
export const Small: Story = {
  globals: { viewport: { value: 'sm' } },
};
