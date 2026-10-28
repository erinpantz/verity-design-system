import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { Container } from './Container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  // Full screen, without Storybook's padding, so the side margins are the Container's own
  parameters: { layout: 'fullscreen' },
  args: {
    width: 'constrained',
    as: 'div',
    children: <Placeholder>Content</Placeholder>,
  },
  argTypes: {
    width: { control: 'inline-radio', options: ['constrained', 'wide', 'full-bleed'] },
    as: { control: 'inline-radio', options: ['div', 'header', 'section'] },
    children: { control: false },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wide: Story = {
  args: { width: 'wide' },
};

export const FullBleed: Story = {
  name: 'Full bleed',
  args: { width: 'full-bleed' },
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    // Stands in for Main, which owns the space between Sections
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-main-spacing-section-gap)' }}>
      <Container as="header">
        <Placeholder size="lg">Page title and intro (header, constrained)</Placeholder>
      </Container>
      <Container width="full-bleed">
        <Placeholder size="lg">Edge-to-edge band (full-bleed)</Placeholder>
      </Container>
      <Container as="section" width="wide">
        <Placeholder size="lg">Media (section, wide)</Placeholder>
      </Container>
      <Container as="section">
        <Placeholder>Reading text (section, constrained)</Placeholder>
      </Container>
    </div>
  ),
};
