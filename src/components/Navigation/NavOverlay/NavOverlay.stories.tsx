import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Prose } from '../../Text/Prose';
import { MainNav } from '../MainNav';
import { NavContainer } from '../NavContainer';
import { NavOverlay } from './NavOverlay';

// The page's nav and the overlay, wired together the way Shell will: the
// page's menu button opens the overlay, and the overlay's closes it
function Page({ startOpen = false }: { startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <NavContainer>
        <MainNav current="profile" menuOpen={open} onMenuOpenChange={setOpen} />
      </NavContainer>
      <main style={{ flex: '1 1 0', minInlineSize: 0, padding: 'var(--verity-padding-lg)' }}>
        <Prose>
          <h1>Profile</h1>
          <p>Open the menu with the button in the nav. Escape, the close button, or a click outside the menu closes it.</p>
        </Prose>
      </main>
      <NavOverlay open={open} onClose={() => setOpen(false)}>
        <MainNav current="profile" placement="overlay" menuOpen={open} onMenuOpenChange={setOpen} />
      </NavOverlay>
    </div>
  );
}

const meta = {
  title: 'Navigation/NavOverlay',
  component: NavOverlay,
  // The overlay is for Small and Medium, so the stories open at a phone's
  // width. On Large and up it closes, because the nav is beside the page.
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '36rem' } } },
  globals: { viewport: { value: 'mobile2' } },
} satisfies Meta<typeof NavOverlay>;

export default meta;

// On Small: tap the menu button in the top bar
export const Default: StoryObj = {
  render: () => <Page />,
};

// Open from the start, to see it over the page
export const Open: StoryObj = {
  render: () => <Page startOpen />,
};

// On Medium, the rail's menu button opens it too
export const OnMedium: StoryObj = {
  name: 'On Medium',
  render: () => <Page />,
  globals: { viewport: { value: 'tablet' } },
};
