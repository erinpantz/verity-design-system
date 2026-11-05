import { useEffect, useRef, useState } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { Image } from '../Image';
import styles from './Animation.module.css';
import type { AnimationItem } from './loadLottie';
import { useReducedMotion } from './useReducedMotion';

export interface AnimationProps {
  /** The animation’s file: the URL of a .lottie file */
  src: string;
  /**
   * The URL of a still image of the animation, usually its first frame. It
   * shows right away, while the animation loads, before a visitor with
   * “reduce motion” on presses play, and if the file can’t load.
   */
  poster: string;
  /**
   * What the animation shows, for people who can’t see it. Use an empty
   * string ("") when it’s decorative and the text around it says it all.
   */
  alt: string;
  /** The animation’s shape. It fills its container’s width and keeps this ratio. */
  aspectRatio?: '16:9' | '3:2' | '1:1';
}

// A Lottie animation that loops while it's on screen, over its poster, with
// a button to pause it (WCAG 2.2.2).
export function Animation(props: AnimationProps) {
  // A new file starts over: loading, playback, and the visitor's choice
  return <AnimationPlayer key={props.src} {...props} />;
}

function AnimationPlayer({ src, poster, alt, aspectRatio = '16:9' }: AnimationProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Playing or paused. The visitor's choice from the button wins and sticks;
  // without one, it plays unless “reduce motion” is on.
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<'play' | 'pause' | null>(null);
  // If “reduce motion” turns on while the page is open, pause, even if the
  // visitor had pressed play. If it turns off, it plays, unless the visitor
  // paused it.
  const [lastReducedMotion, setLastReducedMotion] = useState(reducedMotion);
  if (reducedMotion !== lastReducedMotion) {
    setLastReducedMotion(reducedMotion);
    if (reducedMotion) setChoice(null);
  }
  const playing = choice ? choice === 'play' : !reducedMotion;

  // Where it is on the page: near the screen (within a screen's height of
  // it), and on the screen
  const [nearScreen, setNearScreen] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearScreen(true);
          near.disconnect();
        }
      },
      { rootMargin: '100% 0px' },
    );
    const visible = new IntersectionObserver((entries) => {
      setOnScreen(entries[entries.length - 1].isIntersecting);
    });
    near.observe(frame);
    visible.observe(frame);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, []);

  // Load the player and the file once it's near the screen and meant to play.
  // With “reduce motion” on, that's when the visitor presses play, so nobody
  // downloads an animation they won't watch.
  const [wanted, setWanted] = useState(false);
  if (nearScreen && playing && !wanted) setWanted(true);

  const [animation, setAnimation] = useState<AnimationItem | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!wanted || !canvas) return;
    let cancelled = false;
    let loaded: AnimationItem | undefined;
    import('./loadLottie')
      .then(({ loadLottie }) => loadLottie(canvas, src))
      .then((item) => {
        if (cancelled) return item.destroy();
        loaded = item;
        setAnimation(item);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [wanted, src]);

  // Run only while it's meant to play and on screen. Pausing holds the frame,
  // so scrolling back picks up where it stopped.
  const running = animation !== null && playing && onScreen;
  useEffect(() => {
    if (!animation) return;
    if (running) animation.play();
    else animation.pause();
  }, [animation, running]);

  // The animation covers the poster from the first time it plays
  const [started, setStarted] = useState(false);
  if (running && !started) setStarted(true);

  return (
    <div ref={frameRef} className={styles.animation} data-playing={playing || undefined}>
      {/* One picture for screen readers, described by alt, like an Image */}
      <div className={styles.media} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
        <Image src={poster} alt="" aspectRatio={aspectRatio} />
        <div
          ref={canvasRef}
          className={styles.canvas}
          data-showing={started || undefined}
          aria-hidden="true"
        />
      </div>
      {/* If the file can't load, the poster stays and there's nothing to play */}
      {!failed && (
        <div className={styles.control}>
          <IconButton
            icon={playing ? 'pause' : 'play'}
            label={playing ? 'Pause animation' : 'Play animation'}
            size="sm"
            background="scrim"
            tooltipPlacement="top-end"
            onClick={() => setChoice(playing ? 'pause' : 'play')}
          />
        </div>
      )}
    </div>
  );
}
