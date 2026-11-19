import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../../Actions/Link';
import { VerityMark } from '../../Media/VerityMark';
import { Footer, type FooterProps } from './Footer';

// Erin's footer: “Book a meeting,” with LinkedIn beside it, and a line about
// Verity on the right. The Verity link is a placeholder until the portfolio
// site supplies its own.
const callToAction: FooterProps['callToAction'] = {
  heading: 'Let’s work together',
  text: 'Have a project in mind, or want to talk design systems? Book a 30-minute meeting.',
  buttonLabel: 'Book a meeting',
  href: 'https://calendly.com/erin-hurff/30min',
  opensInNewTab: true,
  secondaryAction: {
    icon: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/erintozour/',
    opensInNewTab: true,
  },
};

// The aside: the Verity mark above a sentence with a link
const aside = (
  <>
    <VerityMark />
    <p>
      This site is built with <Link href="#verity">Verity</Link>, my design system. Every color, size, and space
      comes from a token.
    </p>
  </>
);

// The call to action without its second action
const { secondaryAction: _, ...withoutSecondaryAction } = callToAction;

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  args: {
    callToAction,
    aside,
    copyrightName: 'Erin Tozour',
  },
  argTypes: {
    callToAction: { control: 'object' },
    aside: { control: false },
    copyrightName: { control: 'text' },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

// Wide, spanning the page like a wide image: the call to action at the start,
// with LinkedIn beside its button, and the aside at the end. Narrow the
// window to see the aside wrap below the call to action.
export const Default: Story = {};

// No aside: the call to action alone above the copyright line
export const WithoutAside: Story = {
  name: 'Without an aside',
  args: { aside: undefined },
};

// No second action: the button alone
export const WithoutSecondaryAction: Story = {
  name: 'Without a second action',
  args: { callToAction: withoutSecondaryAction },
};

// Neither: the heading, the sentence, and the button
export const CallToActionOnly: Story = {
  name: 'Call to action only',
  args: { callToAction: withoutSecondaryAction, aside: undefined },
};
