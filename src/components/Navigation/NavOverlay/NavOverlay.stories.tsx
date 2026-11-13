import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { Prose } from '../../Text/Prose';
import { NavItem } from '../NavItem';
import { NavOverlay } from './NavOverlay';

// The links, in a column, as MainNav passes them
const links = (
  <ul
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'var(--verity-main-nav-link-gap)',
      margin: 0,
      padding: 0,
      listStyle: 'none',
    }}
  >
    <li>
      <NavItem icon="portfolio" label="Portfolio" href="#portfolio" />
    </li>
    <li>
      <NavItem icon="profile" label="Profile" href="#profile" current />
    </li>
    <li>
      <NavItem icon="playground" label="Playground" href="#playground" />
    </li>
  </ul>
);

// A page with a button that opens the menu, the way MainNav's menu button does
function Page({ startOpen = false }: { startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div style={{ padding: 'var(--verity-padding-md)' }}>
      <IconButton icon="dock-to-left" label="Open menu" expanded={open} hasPopup="dialog" onClick={() => setOpen(true)} />
      <Prose>
        <h1>Profile</h1>
        <p>
          Open the menu with the button above. It slides in from the right. The back button, Escape, or one of its
          links slides it back out, and focus returns to the button.
        </p>
      </Prose>
      <NavOverlay open={open} onClose={() => setOpen(false)}>
        {links}
      </NavOverlay>
    </div>
  );
}

const meta = {
  title: 'Navigation/NavOverlay',
  component: NavOverlay,
  // The overlay is for narrow screens, where MainNav shows its menu button,
  // so the stories open at a phone's width
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '36rem' } } },
  globals: { viewport: { value: 'sm' } },
} satisfies Meta<typeof NavOverlay>;

export default meta;

// Closed: press the button to open it
export const Default: StoryObj = {
  render: () => <Page />,
};

// Open from the start: it slides in as the story loads
export const Open: StoryObj = {
  render: () => <Page startOpen />,
};

// The same, with the slide five times slower (1.5 seconds instead of 300ms),
// to see it move: open it, then close it. Story-only: the menu itself always
// uses motion/duration/playful.
export const SlowMotion: StoryObj = {
  name: 'Slow motion',
  render: () => (
    <div style={{ '--verity-motion-duration-playful': 'var(--verity-duration-1500)' } as CSSProperties}>
      <Page />
    </div>
  ),
};
