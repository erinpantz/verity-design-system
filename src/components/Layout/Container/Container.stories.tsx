import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../../../foundations/Placeholder';
import { Container } from './Container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  args: {
    as: 'div',
    children: <Placeholder>Content</Placeholder>,
  },
  argTypes: {
    as: { control: 'inline-radio', options: ['div', 'header', 'section'] },
    children: { control: false },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    // Stands in for Main, which owns the space between Sections. Every block
    // sits in the same centered column.
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--verity-main-spacing-section-gap)' }}>
      <Container as="header">
        <Placeholder size="lg">Page title and intro (header)</Placeholder>
      </Container>
      <Container as="section">
        <Placeholder>Reading text (section)</Placeholder>
      </Container>
    </div>
  ),
};
