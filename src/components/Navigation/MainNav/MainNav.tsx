import { useEffect, useRef, useState } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { ErinTozourLogo } from '../../Media/ErinTozourLogo';
import { NavItem } from '../NavItem';
import { NavOverlay } from '../NavOverlay';
import styles from './MainNav.module.css';
import { LinkAnchor } from '../../Actions/LinkProvider/LinkProvider';

type Page = 'portfolio' | 'profile' | 'playground';

export interface MainNavProps {
  /** The page someone is on, if it’s one of the nav’s pages */
  current?: Page;
  /** Where each link goes. Any you leave out use the defaults. */
  hrefs?: Partial<Record<'home' | Page, string>>;
  /**
   * The section a page change is going to, while it’s going. That page’s
   * link swaps its icon between poses, in step with PageLoader. Home’s link
   * is the logo, which doesn’t move.
   */
  pending?: 'home' | Page;
}

const DEFAULT_HREFS = {
  home: '/',
  portfolio: '/',
  profile: '/profile',
  playground: '/playground',
};

const PAGES = [
  { page: 'portfolio', label: 'Portfolio' },
  { page: 'profile', label: 'Profile' },
  { page: 'playground', label: 'Playground' },
] as const;

// The site's main navigation, a bar across the top of the page: the logo,
// linking home, then a NavItem per page. Its own width picks its layout, in
// CSS (see MainNav.module.css), so it's right before JavaScript runs: the full
// logo and the links, "erin" and the links, or the full logo and a menu
// button that opens the links in NavOverlay. MainNav owns the overlay and
// whether it's open.
export function MainNav({ current, hrefs = {}, pending }: MainNavProps) {
  const links = { ...DEFAULT_HREFS, ...hrefs };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLSpanElement>(null);

  // When the nav widens past the menu layout, its CSS hides the menu button
  // and shows the links, so the overlay isn't needed: close it. This follows
  // the nav's own layout, not the screen's: a hidden button measures 0 wide.
  useEffect(() => {
    const menuButton = menuButtonRef.current;
    if (!menuOpen || !menuButton) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === 0) setMenuOpen(false);
    });
    observer.observe(menuButton);
    return () => observer.disconnect();
  }, [menuOpen]);

  // The pages: a row in the bar, and a column in the overlay
  const pageLinks = (direction: 'row' | 'column') => (
    <ul className={`${styles.links} ${styles[direction]}`}>
      {PAGES.map(({ page, label }) => (
        <li key={page}>
          <NavItem
            icon={page}
            label={label}
            href={links[page]}
            current={current === page}
            pending={pending === page}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <nav className={styles.mainNav} aria-label="Main">
      <div className={styles.bar}>
        {/* The site title fills the rest of the row, so the links sit at the
            end. The link inside it hugs the logo. Both logos are in the
            link, and CSS shows one: the hidden one is display: none, so
            screen readers hear only the shown one's name, “Erin Tozour.” */}
        <div className={styles.siteTitle}>
          <LinkAnchor className={styles.homeLink} href={links.home}>
            <span className={styles.fullLogo}>
              <ErinTozourLogo />
            </span>
            <span className={styles.firstLogo}>
              <ErinTozourLogo name="first" />
            </span>
          </LinkAnchor>
        </div>
        {pageLinks('row')}
        <span className={styles.menuButton} ref={menuButtonRef}>
          <IconButton
            icon="dock-to-left"
            label="Open menu"
            expanded={menuOpen}
            hasPopup="dialog"
            onClick={() => setMenuOpen(true)}
          />
        </span>
      </div>
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)}>
        {pageLinks('column')}
      </NavOverlay>
    </nav>
  );
}
