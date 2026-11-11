import { useEffect, useId, useRef, useState } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { Image } from '../Image';
import styles from './VideoEmbed.module.css';

/** Where the video is hosted. Vimeo for now; others can be added to PROVIDERS. */
export type VideoEmbedProvider = 'vimeo';

export interface VideoEmbedProps {
  /** Where the video is hosted */
  provider?: VideoEmbedProvider;
  /** The video’s ID on the provider, like the number at the end of a Vimeo link */
  videoId: string;
  /**
   * The video’s title. It names the play button (“Play ” + title) and the
   * player, for screen readers.
   */
  title: string;
  /** The URL of a still from the video, shown until someone presses play */
  poster: string;
  /**
   * What the poster shows, for people who can’t see it. Use an empty string
   * ("") when the title says enough.
   */
  alt: string;
  /** The video’s shape. It fills its container’s width and keeps this ratio. */
  aspectRatio?: '16:9' | '3:2' | '4:3' | '1:1';
}

// Each provider's player address. Autoplay, since the visitor just pressed
// play; dnt ("do not track") so Vimeo sets no tracking cookies.
const PROVIDERS = {
  vimeo: (id: string) => `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1&dnt=1`,
} satisfies Record<VideoEmbedProvider, (id: string) => string>;

// Class names for each ratio, since a colon can't be part of one
const RATIO = { '16:9': 'ratio-16-9', '3:2': 'ratio-3-2', '4:3': 'ratio-4-3', '1:1': 'ratio-1-1' } as const;

// A video hosted elsewhere, with sound and the provider's own controls. Click
// to load: at first only the poster and a play button, with no request to the
// provider. Pressing play swaps in the provider's player, in the same box, and
// moves focus into it.
export function VideoEmbed(props: VideoEmbedProps) {
  // A different video starts over, back at its poster
  return <VideoEmbedPlayer key={`${props.provider ?? 'vimeo'}:${props.videoId}`} {...props} />;
}

function VideoEmbedPlayer({
  provider = 'vimeo',
  videoId,
  title,
  poster,
  alt,
  aspectRatio = '16:9',
}: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const posterId = useId();

  // Once the player replaces the poster, focus moves into it, so keyboard
  // users carry on where the button was
  useEffect(() => {
    if (loaded) playerRef.current?.focus();
  }, [loaded]);

  return (
    <div className={`${styles.frame} ${styles[RATIO[aspectRatio]]}`}>
      {loaded ? (
        <iframe
          ref={playerRef}
          className={styles.player}
          src={PROVIDERS[provider](videoId)}
          title={title}
          // encrypted-media: Vimeo sets up protected playback when it starts;
          // without it, it shows “Unable to play video”
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      ) : (
        // The whole poster is one button, named by the title. The poster's
        // alt describes it, so screen readers hear the picture too.
        <button
          type="button"
          className={styles.poster}
          aria-label={`Play ${title}`}
          aria-describedby={alt ? posterId : undefined}
          onClick={() => setLoaded(true)}
        >
          <span id={posterId} className={styles.image} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
            <Image src={poster} alt="" aspectRatio={aspectRatio} />
          </span>
          {/* The play button's look, following the poster's state */}
          <span className={styles.control}>
            <IconButton as="span" icon="play" label="Play" size="xl" background="scrim" />
          </span>
        </button>
      )}
    </div>
  );
}
