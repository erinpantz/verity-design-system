import { useEffect, useRef, useState } from 'react';
import { PlaybackFrame } from '../Playback/PlaybackFrame';
import { usePlayback } from '../Playback/usePlayback';
import type { AnimationItem } from './loadLottie';

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
// a button to pause it (WCAG 2.2.2). The playback rules and the button are
// shared with Video, in ../Playback.
export function Animation(props: AnimationProps) {
  // A new file starts over: loading, playback, and the visitor's choice
  return <AnimationPlayer key={props.src} {...props} />;
}

function AnimationPlayer({ src, poster, alt, aspectRatio = '16:9' }: AnimationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<AnimationItem | null>(null);
  const [failed, setFailed] = useState(false);
  const playback = usePlayback(animation !== null);

  // Load the player and the file when it's time
  const { load, running } = playback;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!load || !canvas) return;
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
  }, [load, src]);

  // Play while it's meant to and on screen; pausing holds the frame
  useEffect(() => {
    if (!animation) return;
    if (running) animation.play();
    else animation.pause();
  }, [animation, running]);

  return (
    <PlaybackFrame
      playback={playback}
      noun="animation"
      poster={poster}
      alt={alt}
      aspectRatio={aspectRatio}
      failed={failed}
    >
      {/* Where the player draws its SVG */}
      <div ref={canvasRef} />
    </PlaybackFrame>
  );
}
