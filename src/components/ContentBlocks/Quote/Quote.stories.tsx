import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../../Layout/Section';
import { TextBlock } from '../../Text/TextBlock';
import { Quote } from './Quote';

const meta = {
  title: 'Content blocks/Quote',
  component: Quote,
  args: {
    quote: 'Erin made our research easy to act on. Every finding came with a decision we could make that week.',
    name: 'Jordan Lee',
  },
  argTypes: {
    quote: { control: 'text' },
    name: { control: 'text' },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Quote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
  name: 'With title',
  args: {
    title: 'Head of product, Basket',
  },
};

// A Quote between blocks in a case study Section
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Section heading="What customers told us" intro="We interviewed twelve weekly shoppers about how they plan and buy groceries.">
      <TextBlock heading="Checkout took too long">
        Most people knew what they wanted before they opened the app. The six-step checkout slowed them down at the end.
      </TextBlock>
      <Quote
        quote="I know what I want. The ‘review your order’ step just slows me down."
        name="Interview participant"
        title="weekly shopper"
      />
      <TextBlock heading="Delivery times were a guess">
        People picked a slot, then found out at the last step that it was full.
      </TextBlock>
    </Section>
  ),
};
