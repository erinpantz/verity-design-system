import { useEffect, useRef, useState } from 'react';
import { PlaybackFrame } from '../Playback/PlaybackFrame';
import { usePlayback } from '../Playback/usePlayback';
import styles from './Video.module.css';

export interface VideoProps {
  /** The video’s file: the URL of an MP4 (H.264, no audio track) */
  src: string;
  /**
   * The URL of a still image of the video, usually its first frame, at the
   * same size. It shows right away, while the video loads, before a visitor
   * with “reduce motion” on presses play, and if the file can’t load.
   */
  poster: string;
  /**
   * What happens in the video, for people who can’t see it. Use an empty
   * string ("") only when the text around it describes the same thing.
   */
  alt: string;
  /** The video’s shape. It fills its container’s width and keeps this ratio. */
  aspectRatio?: '16:9' | '3:2' | '1:1';
}

// A short, silent clip that loops while it's on screen, over its poster, with
// a button to pause it (WCAG 2.2.2). It plays and pauses like Animation: the
// rules and the button are shared, in ../Playback.
export function Video(props: VideoProps) {
  // A new file starts over: loading, playback, and the visitor's choice
  return <VideoPlayer key={props.src} {...props} />;
}

function VideoPlayer({ src, poster, alt, aspectRatio = '16:9' }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const playback = usePlayback(ready);

  // Play while it's meant to and on screen; pausing holds the frame
  const { load, running } = playback;
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    if (running) {
      // The browser can refuse (rare for a muted video); it then stays paused
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [ready, running]);

  return (
    <PlaybackFrame
      playback={playback}
      noun="video"
      poster={poster}
      alt={alt}
      aspectRatio={aspectRatio}
      failed={failed}
    >
      {/* No src until it's time to load, so nothing downloads before then.
          Muted and inline, so browsers let it play without a tap; no
          controls, since the frame's button is the only one. */}
      <video
        ref={videoRef}
        className={styles.video}
        src={load ? src : undefined}
        preload={load ? 'auto' : 'none'}
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
      />
    </PlaybackFrame>
  );
}
