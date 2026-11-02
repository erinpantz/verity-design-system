import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../../Actions/Link';
import { LinkGroup } from '../../Navigation/LinkGroup';
import { Footer } from './Footer';

// Erin's footer from Figma. The page and profile addresses are placeholders
// until the portfolio site supplies its own.
const linkGroups = (
  <>
    <LinkGroup label="Pages">
      <Link href="#portfolio">Portfolio</Link>
      <Link href="#playground">Playground</Link>
      <Link href="#profile">Profile</Link>
    </LinkGroup>
    <LinkGroup label="Fun stuff">
      <Link href="#albums">My 20 favorite albums</Link>
      <Link disabled tooltip="Coming soon">
        Verity Design System
      </Link>
    </LinkGroup>
    <LinkGroup label="Connect">
      <Link href="#linkedin">LinkedIn</Link>
    </LinkGroup>
  </>
);

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  args: {
    width: 'constrained',
    callToAction: {
      heading: 'Let’s work together',
      text: 'Have a project in mind, or want to talk design systems? Book a 30-minute call.',
      buttonLabel: 'Book a call',
      href: 'https://calendly.com/erin-hurff/30min',
    },
    linkGroups,
    copyrightName: 'Erin Tozour',
  },
  argTypes: {
    width: { control: 'inline-radio', options: ['constrained', 'wide'] },
    callToAction: { control: 'object' },
    linkGroups: { control: false },
    copyrightName: { control: 'text' },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

// Constrained, the same width as a constrained Section. Narrow the window to
// see the links wrap below the call to action.
export const Default: Story = {};

export const Wide: Story = {
  args: { width: 'wide' },
};
