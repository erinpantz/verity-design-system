import { useEffect, useRef, useState } from 'react';
import { ErinTozourBadge } from '../../Media/ErinTozourBadge';
import { useReducedMotion } from '../../Media/Playback/useReducedMotion';
import { NavIcon } from '../../Navigation/NavIcon';
import {
  LOADING_POSES,
  MOTION_LIMIT_MS,
  STILL_POSE,
  restartPoseClock,
  tokenMs,
  usePoseTicks,
  type Section,
} from '../../Navigation/NavIcon/poseClock';
import { hasVisited, markVisited } from './visits';
import styles from './PageLoader.module.css';

/** The site’s sections. Case studies are part of Portfolio. */
export type PageLoaderSection = Section;

export interface PageLoaderProps {
  /**
   * The section a page change is going to, while it’s going. Leave it out
   * (or set it back to undefined) when the change is done.
   */
  pending?: PageLoaderSection;
  /** The section the page is in now. It counts as visited. */
  current?: PageLoaderSection;
  /**
   * Each section’s words, plain lines like “Shuffling the deck.” PageLoader
   * adds the ellipsis, and shuffles them each time it opens.
   */
  words?: Partial<Record<PageLoaderSection, string[]>>;
  /**
   * Called when it appears, with the section it’s showing, and when it starts
   * to fade out, with undefined. Shell uses it to keep that section’s nav
   * link swapping poses for as long as the loader shows.
   */
  onVisibleChange?: (section: PageLoaderSection | undefined) => void;
}

const NAMES: Record<Section, string> = {
  home: 'Home',
  portfolio: 'Portfolio',
  profile: 'Profile',
  playground: 'Playground',
};

// A copy of the list in a random order
function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface View {
  section: Section;
  /** Showing, or fading out (it stays drawn, unseen, after that) */
  visible: boolean;
  words: string[];
  /** Which opening this is, so each one starts fresh */
  opening: number;
}

// A loader for moving between the site's sections: the section's nav icon
// swapping between its poses (Home: the badge, turning), over a line of
// playful words. The first visit to a section in a tab always shows it, for
// at least page-loader/duration/first-visit-minimum; after that, only a slow
// page change does, from page-loader/duration/delay, for at least
// page-loader/duration/minimum. It covers the page from where it's placed
// (in Shell, right below the nav) to the bottom of the screen.
export function PageLoader({ pending, current, words = {}, onVisibleChange }: PageLoaderProps) {
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<View | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const anchorRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Read by the timers, which outlive a render
  const latest = useRef({ words, reducedMotion, onVisibleChange, visible: false, opening: 0 });
  useEffect(() => {
    latest.current.words = words;
    latest.current.reducedMotion = reducedMotion;
    latest.current.onVisibleChange = onVisibleChange;
  });

  // The page change in progress: where it's going, when the loader appeared
  // (if it has), and the least time it stays
  const runRef = useRef<{ section: Section; shownAt: number | null; minimum: number } | null>(null);

  // The section someone lands on counts as visited
  useEffect(() => {
    if (current) markVisited(current);
  }, [current]);

  useEffect(() => {
    const open = (section: Section) => {
      // Cover from where it's placed (right below the nav) to the bottom of
      // the screen, or the whole screen once the nav has scrolled away
      const top = anchorRef.current?.getBoundingClientRect().top ?? 0;
      layerRef.current?.style.setProperty('--top', `${Math.max(0, top)}px`);
      const lines = latest.current.words[section]?.filter(Boolean) ?? [];
      const list = (lines.length ? shuffle(lines) : ['Loading']).map((line) => `${line}…`);
      latest.current.visible = true;
      latest.current.opening += 1;
      setView({ section, visible: true, words: list, opening: latest.current.opening });
      setWordIndex(0);
      // A pending nav item falls into step with the loader
      restartPoseClock(section);
    };
    const close = () => {
      latest.current.visible = false;
      setView((shown) => shown && { ...shown, visible: false });
    };

    const run = runRef.current;

    // The change is done: close once the loader has had its least time
    if (!pending) {
      if (!run) return;
      markVisited(run.section);
      runRef.current = null;
      if (run.shownAt === null) return;
      const timer = window.setTimeout(close, Math.max(0, run.shownAt + run.minimum - performance.now()));
      return () => clearTimeout(timer);
    }

    // A change is going to `pending`. A first visit shows the loader at once,
    // for at least the first-visit minimum, unless reduce motion is on. Any
    // other shows it only if the page isn't ready by the delay, for at least
    // the minimum. If the loader is already up, it stays, for the new section.
    const first = !latest.current.reducedMotion && !hasVisited(pending);
    const next = {
      section: pending,
      shownAt: null as number | null,
      minimum: tokenMs(
        first ? '--verity-page-loader-duration-first-visit-minimum' : '--verity-page-loader-duration-minimum',
      ),
    };
    runRef.current = next;
    const show = () => {
      next.shownAt = performance.now();
      open(pending);
    };
    const wait = first || latest.current.visible ? 0 : tokenMs('--verity-page-loader-duration-delay');
    const timer = window.setTimeout(show, wait);
    return () => clearTimeout(timer);
  }, [pending]);

  // The words: each shows for page-loader/duration/word, then the next. With
  // one word, or reduce motion, it doesn't change. After 5 seconds, they stop.
  const visible = view?.visible ?? false;
  const wordCount = view?.words.length ?? 0;
  useEffect(() => {
    if (!visible || reducedMotion || wordCount < 2) return;
    const each = tokenMs('--verity-page-loader-duration-word');
    if (each <= 0) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      if (performance.now() - start > MOTION_LIMIT_MS) clearInterval(timer);
      else setWordIndex((index) => index + 1);
    }, each);
    return () => clearInterval(timer);
  }, [visible, reducedMotion, wordCount, view?.opening]);

  // Tell the page what's showing
  const shownSection = visible ? view?.section : undefined;
  useEffect(() => {
    latest.current.onVisibleChange?.(shownSection);
  }, [shownSection]);

  // The icon's poses, or Home's badge's turns, on a clock shared with the
  // pending nav item. It stops after 5 seconds.
  const section = view?.section ?? 'home';
  const ticks = usePoseTicks(section, visible && !reducedMotion);
  const badgeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    badgeRef.current?.style.setProperty('--turns', reducedMotion ? '0' : `${ticks}`);
  }, [ticks, reducedMotion]);

  const pose =
    section === 'home'
      ? undefined
      : reducedMotion
        ? STILL_POSE[section]
        : LOADING_POSES[section][ticks % LOADING_POSES[section].length];

  const word = view ? view.words[wordIndex % view.words.length] : '';
  const previous = view && wordIndex > 0 ? view.words[(wordIndex - 1) % view.words.length] : null;

  return (
    <>
      {/* Where the loader starts: right below whatever comes before it */}
      <div ref={anchorRef} className={styles.anchor} />
      {/* The icon and the words are hidden from screen readers, so the
          changing words aren't read out; the status message below says it once */}
      <div ref={layerRef} className={styles.loader} data-visible={visible || undefined} aria-hidden="true">
        {view && (
          <div key={view.opening} className={styles.content}>
            <span className={styles.icon}>
              {section === 'home' ? (
                <span ref={badgeRef} className={styles.badge}>
                  <ErinTozourBadge fill />
                </span>
              ) : (
                <NavIcon page={section} pose={pose} fill />
              )}
            </span>
            <span className={styles.words}>
              {previous !== null && (
                <span key={`out-${wordIndex}`} className={`${styles.word} ${styles.wordOut}`}>
                  {previous}
                </span>
              )}
              <span key={`in-${wordIndex}`} className={`${styles.word} ${wordIndex > 0 ? styles.wordIn : ''}`}>
                {word}
              </span>
            </span>
          </div>
        )}
      </div>
      {/* Polite: said once, when it appears, without interrupting */}
      <p className={styles.status} role="status">
        {visible && view ? `Loading ${NAMES[view.section]}` : ''}
      </p>
    </>
  );
}
