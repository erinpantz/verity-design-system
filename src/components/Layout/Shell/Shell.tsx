import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { Button } from '../../Actions/Button';
import { ThemeToggle } from '../../Actions/ThemeToggle';
import { PageLoader, type PageLoaderSection } from '../../FeedbackAndStatus/PageLoader';
import { BackLink, type BackLinkProps } from '../../Navigation/BackLink';
import { MainNav } from '../../Navigation/MainNav';
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
  /**
   * In focused mode, an action in the top-right corner, opposite the back
   * link, like a Button with background="scrim" that downloads the page’s
   * PDF. Leave it out for none. Default mode ignores it.
   */
  action?: ReactNode;
  /**
   * The section a page change is going to, while it’s going: home,
   * portfolio, profile, or playground (a case study is portfolio). Leave it
   * out when the change is done. PageLoader decides whether to show, and
   * that section’s nav link swaps its icon between poses meanwhile.
   */
  pending?: PageLoaderSection;
  /**
   * Each section’s loading words, plain lines like “Shuffling the deck.”
   * PageLoader adds the ellipsis and shuffles them.
   */
  loaderWords?: Partial<Record<PageLoaderSection, string[]>>;
}

// Back to the portfolio, as in Figma
const DEFAULT_BACK_LINK: BackLinkProps = { href: '/', label: 'Portfolio' };

// The page frame, in one column: a skip link, MainNav across the top, kept
// at the top of the screen as the page scrolls, then the page column with
// Main and the Footer. ThemeToggle floats in the
// bottom-right corner. In focused mode, a BackLink floats in the top-left
// corner instead of the nav, for reading one piece of work without the site
// around it, with an optional action mirroring it in the top-right corner.
// MainNav picks its own layout and owns its menu, so Shell only
// places it.
export function Shell({
  children,
  footer,
  current,
  hrefs,
  mode = 'default',
  backLink = DEFAULT_BACK_LINK,
  action,
  pending,
  loaderWords,
}: ShellProps) {
  const mainId = useId();
  // The section this page is in, which counts as visited: a nav page, a
  // case study (focused mode) as Portfolio, and anything else as Home
  const section: PageLoaderSection = current ?? (mode === 'focused' ? 'portfolio' : 'home');
  // The section PageLoader is showing, if it is. Its nav link keeps swapping
  // poses while the page change goes on or the loader shows, whichever is
  // longer (a first visit's loader can outlast a fast page change).
  const [loaderShowing, setLoaderShowing] = useState<PageLoaderSection>();
  const hasNav = mode !== 'focused';
  const topRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  // Whether the page has scrolled away from the top, for the nav's divider
  const [scrolled, setScrolled] = useState(false);

  // The nav sticks with CSS alone. These add what CSS can't know:
  useEffect(() => {
    const top = topRef.current;
    const nav = navRef.current;
    if (!hasNav || !top || !nav) return;
    // Scrolled: the marker at the very top of the page has left the screen
    const scrolling = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    scrolling.observe(top);
    // The nav's height, which changes with its layout and the breakpoint,
    // for the page's scroll padding (Shell.module.css), so whatever is
    // scrolled to or focused lands below the nav, not under it, and for
    // where PageLoader starts
    const root = document.documentElement;
    const sizing = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize[0]?.blockSize ?? nav.getBoundingClientRect().height;
      root.style.setProperty('--shell-nav-height', `${height}px`);
    });
    sizing.observe(nav);
    return () => {
      scrolling.disconnect();
      sizing.disconnect();
      root.style.removeProperty('--shell-nav-height');
    };
  }, [hasNav]);

  return (
    <div className={styles.shell} data-mode={mode}>
      {/* A 1px marker at the very top of the page: once it has scrolled off
          the screen, the nav shows its divider */}
      {hasNav && <div className={styles.topMarker} ref={topRef} aria-hidden />}
      {/* First in the tab order, and shown only on keyboard focus. It jumps
          past the nav and moves focus to Main (WCAG 2.4.1). */}
      <div className={styles.skipLink}>
        <Button href={`#${mainId}`}>Skip to content</Button>
      </div>
      {!hasNav ? (
        // Fixed to the top-left corner, in place of the nav, and the action,
        // if there is one, mirroring it in the top-right corner. In the tab
        // order: the back link, the action, then ThemeToggle, then Main.
        <>
          <div className={styles.backLink}>
            <BackLink href={backLink.href} label={backLink.label} />
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </>
      ) : (
        // Sticks to the top of the screen, above the page's content
        <div className={styles.nav} ref={navRef} data-scrolled={scrolled || undefined}>
          <MainNav current={current} hrefs={hrefs} pending={pending ?? loaderShowing} />
        </div>
      )}
      {/* Fixed to the screen's corner at every width, so it's always in
          reach. In the tab order, it comes right after the nav (or the back
          link and the action) and before Main. */}
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>
      <div className={styles.page}>
        {/* Right below the nav (or at the top, in focused mode): the page
            loader covers the page from here, or from the nav's bottom edge
            once the page has scrolled, above the content, below the nav,
            ThemeToggle, BackLink, and the skip link */}
        <PageLoader
          pending={pending}
          current={section}
          words={loaderWords}
          onVisibleChange={setLoaderShowing}
        />
        {/* tabIndex -1 lets the skip link move focus here, without adding Main to the tab order */}
        <main className={styles.main} id={mainId} tabIndex={-1}>
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
