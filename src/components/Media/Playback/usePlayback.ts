import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface Playback {
  /** Goes on the frame, to know where it is on the page */
  frameRef: React.RefObject<HTMLDivElement | null>;
  /** Meant to play: the visitor's choice, or without one, unless “reduce motion” is on */
  playing: boolean;
  /** Time to download the media: it's near the screen and meant to play. Stays true once set. */
  load: boolean;
  /** Ready, meant to play, and on screen: the media should be running now */
  running: boolean;
  /** It has run at least once, so the media covers the poster */
  started: boolean;
  /** The pause and play button's action */
  toggle: () => void;
}

/**
 * The playback rules Animation and Video share, so a fix happens once. Pass
 * whether the media is ready to play; the component loads it when `load`
 * turns true, and plays or pauses it to follow `running`.
 */
export function usePlayback(ready: boolean): Playback {
  const frameRef = useRef<HTMLDivElement>(null);

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

  // Load once it's near the screen and meant to play. With “reduce motion”
  // on, that's when the visitor presses play, so nobody downloads media they
  // won't watch.
  const [load, setLoad] = useState(false);
  if (nearScreen && playing && !load) setLoad(true);

  // Run only while it's meant to play and on screen. Pausing holds the frame,
  // so scrolling back picks up where it stopped.
  const running = ready && playing && onScreen;

  // The media covers the poster from the first time it plays
  const [started, setStarted] = useState(false);
  if (running && !started) setStarted(true);

  return {
    frameRef,
    playing,
    load,
    running,
    started,
    toggle: () => setChoice(playing ? 'pause' : 'play'),
  };
}
