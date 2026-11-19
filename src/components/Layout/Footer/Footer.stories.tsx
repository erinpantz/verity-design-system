import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  args: {
    callToAction: {
      heading: 'Let’s work together',
      text: 'Have a project in mind, or want to talk design systems? Book a 30-minute call.',
      buttonLabel: 'Book a call',
      href: 'https://calendly.com/erin-hurff/30min',
      opensInNewTab: true,
    },
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

// Wide, spanning the page like a wide image: the call to action, then the
// copyright line
export const Default: Story = {};
