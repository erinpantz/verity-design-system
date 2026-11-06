import type { ReactNode } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { Image } from '../Image';
import styles from './PlaybackFrame.module.css';
import type { Playback } from './usePlayback';

export interface PlaybackFrameProps {
  /** From usePlayback */
  playback: Playback;
  /** What plays, for the button's label: “Pause animation”, “Play video” */
  noun: 'animation' | 'video';
  poster: string;
  alt: string;
  aspectRatio: '16:9' | '3:2' | '1:1';
  /** The file couldn't load: the poster stays and the button is hidden */
  failed: boolean;
  /** The media, drawn over the poster: a Lottie canvas or a video */
  children: ReactNode;
}

// What Animation and Video share: the poster, the media over it, and the
// pause and play button (WCAG 2.2.2). Not exported from the library.
export function PlaybackFrame({
  playback,
  noun,
  poster,
  alt,
  aspectRatio,
  failed,
  children,
}: PlaybackFrameProps) {
  const { frameRef, playing, started, toggle } = playback;
  return (
    <div ref={frameRef} className={styles.frame} data-playing={playing || undefined}>
      {/* One picture for screen readers, described by alt, like an Image */}
      <div className={styles.media} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
        <Image src={poster} alt="" aspectRatio={aspectRatio} />
        <div className={styles.layer} data-showing={started || undefined} aria-hidden="true">
          {children}
        </div>
      </div>
      {/* If the file can't load, the poster stays and there's nothing to play */}
      {!failed && (
        <div className={styles.control}>
          <IconButton
            icon={playing ? 'pause' : 'play'}
            label={`${playing ? 'Pause' : 'Play'} ${noun}`}
            size="sm"
            background="scrim"
            tooltipPlacement="top-end"
            onClick={toggle}
          />
        </div>
      )}
    </div>
  );
}
