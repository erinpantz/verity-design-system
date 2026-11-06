import { useState } from 'react';
import { useBreakpoint } from '../../../styles/useBreakpoint';
import { IconButton } from '../../Actions/IconButton';
import { ThemeToggle } from '../../Actions/ThemeToggle';
import { ErinTozourLogo } from '../../Media/ErinTozourLogo';
import { NavItem } from '../NavItem';
import styles from './MainNav.module.css';

type Page = 'portfolio' | 'playground' | 'profile';

export interface MainNavProps {
  /** The page someone is on, if it’s one of the nav’s pages */
  current?: Page;
  /** Where each link goes. Any you leave out use the defaults. */
  hrefs?: Partial<Record<'home' | Page | 'resume', string>>;
  /**
   * How it starts on Large and XL: expanded, with labels, or collapsed to the
   * icon-only rail. The menu button switches between them. On Medium it’s
   * always the rail, and on Small, a top bar.
   */
  state?: 'expanded' | 'collapsed';
  /**
   * Where it sits: on the page, where its layout follows the screen width, or
   * in NavOverlay, where it’s always expanded and its menu button closes the
   * menu
   */
  placement?: 'page' | 'overlay';
  /** Whether NavOverlay is open, so the menu button can say so */
  menuOpen?: boolean;
  /**
   * Called when the menu button opens NavOverlay (on Small and Medium) or
   * closes it (in the overlay)
   */
  onMenuOpenChange?: (open: boolean) => void;
}

const DEFAULT_HREFS = {
  home: '/',
  portfolio: '/',
  playground: '/playground',
  profile: '/profile',
  resume: '/erin-tozour-resume.pdf',
};

const PAGES = [
  { page: 'portfolio', label: 'Portfolio' },
  { page: 'playground', label: 'Playground' },
  { page: 'profile', label: 'Profile' },
] as const;

// The site's main navigation: the menu button, the site title, a NavItem per
// page, Resume under a line, and ThemeToggle at the bottom. How it looks at each width is all CSS (see
// MainNav.module.css), so it's right before JavaScript runs. What the menu
// button does depends on the width too, and that comes from useBreakpoint.
export function MainNav({
  current,
  hrefs = {},
  state = 'expanded',
  placement = 'page',
  menuOpen = false,
  onMenuOpenChange,
}: MainNavProps) {
  const links = { ...DEFAULT_HREFS, ...hrefs };
  const breakpoint = useBreakpoint();

  // Expanded or collapsed, on Large and XL. It starts from the state prop,
  // and starts over if that prop changes.
  const [navState, setNavState] = useState(state);
  const [startingState, setStartingState] = useState(state);
  if (state !== startingState) {
    setStartingState(state);
    setNavState(state);
  }

  // What the menu button does: close the overlay, toggle the nav (Large and
  // XL), or open the overlay (Small and Medium). Before the screen width is
  // known (on a server), it's the toggle, which matches the default layout.
  const toggles = breakpoint === null || breakpoint === 'large' || breakpoint === 'xl';
  const menuButton =
    placement === 'overlay'
      ? { label: 'Close menu', onClick: () => onMenuOpenChange?.(false) }
      : toggles
        ? {
            label: navState === 'expanded' ? 'Collapse navigation' : 'Expand navigation',
            expanded: navState === 'expanded',
            onClick: () => setNavState(navState === 'expanded' ? 'collapsed' : 'expanded'),
          }
        : {
            label: 'Open menu',
            expanded: menuOpen,
            hasPopup: 'dialog' as const,
            onClick: () => onMenuOpenChange?.(true),
          };

  return (
    <nav className={`${styles.mainNav} ${styles[placement]}`} aria-label="Main" data-state={navState}>
      <div className={styles.menuBar}>
        {/* The site title: the logo, linking home. Its name is the logo's, “Erin Tozour.” */}
        <a className={styles.siteTitle} href={links.home}>
          <ErinTozourLogo />
        </a>
        <span className={styles.menuButton}>
          <IconButton icon="dock-to-left" {...menuButton} />
        </span>
        {/* ThemeToggle at the end of the Small top bar. CSS shows it only
            there; everywhere else, the one at the bottom of the nav shows. */}
        <span className={styles.topBarThemeToggle}>
          <ThemeToggle />
        </span>
      </div>
      {/* The links, in one list so screen readers hear them together: the
          pages, then Resume. Resume opens a PDF rather than a page, so it
          sits in its own group, under a line drawn in CSS (decorative, so
          nothing is announced). */}
      <ul className={styles.links}>
        {PAGES.map(({ page, label }) => (
          <li key={page}>
            <NavItem icon={page} label={label} href={links[page]} current={current === page} />
          </li>
        ))}
        <li className={styles.secondaryLinks}>
          <NavItem icon="resume" label="Resume" href={links.resume} />
        </li>
      </ul>
      {/* ThemeToggle, alone at the bottom. It's a button, not a place to go,
          so it's outside the list of links (but still in the nav). */}
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>
    </nav>
  );
}
