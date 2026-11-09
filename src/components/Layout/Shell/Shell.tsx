import { useCallback, useId, useState, type ComponentProps, type ReactNode } from 'react';
import { Button } from '../../Actions/Button';
import { ThemeToggle } from '../../Actions/ThemeToggle';
import { BackLink, type BackLinkProps } from '../../Navigation/BackLink';
import { MainNav } from '../../Navigation/MainNav';
import { NavContainer } from '../../Navigation/NavContainer';
import { NavOverlay } from '../../Navigation/NavOverlay';
import styles from './Shell.module.css';

type MainNavProps = ComponentProps<typeof MainNav>;

export interface ShellProps {
  /** Main: the page’s content, such as its Sections. It goes inside <main>. */
  children: ReactNode;
  /** The site’s Footer, after Main */
  footer: ReactNode;
  /** The page someone is on, if it’s one of the nav’s pages */
  current?: MainNavProps['current'];
  /** Where each nav link goes. Any you leave out use MainNav’s defaults. */
  hrefs?: MainNavProps['hrefs'];
  /**
   * The page frame: default, with the site’s nav, or focused, for reading
   * one piece of work, with a link back instead of the nav
   */
  mode?: 'default' | 'focused';
  /** In focused mode, where the back link goes and what it says */
  backLink?: BackLinkProps;
}

// Back to the portfolio, as in Figma
const DEFAULT_BACK_LINK: BackLinkProps = { href: '/', label: 'Portfolio' };

// The page frame: a skip link, the nav docked in NavContainer, ThemeToggle
// floating in the bottom-right corner, and the page column with Main and the
// Footer. In focused mode, a BackLink floats in the top-left corner instead
// of the nav, for reading one piece of work without the site around it. NavOverlay holds the full menu for Small
// and Medium. How it's laid out at each width is CSS (Shell.module.css); the
// nav decides what its menu button does.
export function Shell({
  children,
  footer,
  current,
  hrefs,
  mode = 'default',
  backLink = DEFAULT_BACK_LINK,
}: ShellProps) {
  const mainId = useId();
  // Whether NavOverlay is open. The nav always starts expanded on Large and
  // XL, and doesn't remember the toggle between visits.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className={styles.shell} data-mode={mode}>
      {/* First in the tab order, and shown only on keyboard focus. It jumps
          past the nav and moves focus to Main (WCAG 2.4.1). */}
      <div className={styles.skipLink}>
        <Button href={`#${mainId}`}>Skip to content</Button>
      </div>
      {mode === 'focused' ? (
        // Fixed to the top-left corner, in place of the nav. In the tab
        // order: the back link, then ThemeToggle, then Main.
        <div className={styles.backLink}>
          <BackLink href={backLink.href} label={backLink.label} />
        </div>
      ) : (
        <NavContainer>
          <MainNav current={current} hrefs={hrefs} menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
        </NavContainer>
      )}
      {/* Fixed to the screen's corner at every width, so it's always in
          reach. In the tab order, it comes right after the nav (or the back
          link) and before Main. */}
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>
      <div className={styles.page}>
        {/* tabIndex -1 lets the skip link move focus here, without adding Main to the tab order */}
        <main className={styles.main} id={mainId} tabIndex={-1}>
          {children}
        </main>
        {footer}
      </div>
      {mode === 'default' && (
        <NavOverlay open={menuOpen} onClose={closeMenu}>
          <MainNav
            current={current}
            hrefs={hrefs}
            placement="overlay"
            menuOpen={menuOpen}
            onMenuOpenChange={setMenuOpen}
          />
        </NavOverlay>
      )}
    </div>
  );
}
