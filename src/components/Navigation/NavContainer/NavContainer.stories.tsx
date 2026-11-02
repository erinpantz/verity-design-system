import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainNav } from '../MainNav';
import { Prose } from '../../Text/Prose';
import { NavContainer } from './NavContainer';

const meta = {
  title: 'Navigation/NavContainer',
  component: NavContainer,
  args: { children: <MainNav current="portfolio" /> },
  argTypes: { children: { control: false } },
  // The whole window, as on the site. Resize it to see the dock change.
  // On the docs page, each example gets its own short frame, so a full-height
  // nav is the frame's height, not the whole window's
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '32rem' } } },
} satisfies Meta<typeof NavContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

// Docked on the left, expanded, on Large and XL; the rail on Medium; the top bar on Small
export const Default: Story = {};

// Collapsed on Large and XL: the rail
export const Collapsed: Story = {
  args: { children: <MainNav current="portfolio" state="collapsed" /> },
};

// Beside the page's content, which scrolls while the nav stays in place.
// The page layout here is only for the story; Shell will own it.
export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <NavContainer>
        <MainNav current="playground" />
      </NavContainer>
      <main style={{ flex: '1 1 0', minInlineSize: 0, padding: 'var(--verity-padding-lg)' }}>
        <Prose>
          <h1>Playground</h1>
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>
              Small experiments in motion, color, and code. Some become part of Verity; most stay here, as notes on
              what didn’t work and why.
            </p>
          ))}
        </Prose>
      </main>
    </div>
  ),
};
