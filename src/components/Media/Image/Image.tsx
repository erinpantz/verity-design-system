import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '../../FeedbackAndStatus/Skeleton';
import styles from './Image.module.css';

export interface ImageProps {
  /** The image file’s URL */
  src: string;
  /**
   * What the image shows, for people who can’t see it. Use an empty string
   * ("") when the image is decorative and the text around it says it all.
   */
  alt: string;
  /** The image’s shape. It fills its container’s width and keeps this ratio. */
  aspectRatio?: '16:9' | '3:2' | '1:1';
  /**
   * The corners: rounded with border/radius/md, or square. Use none only for
   * an image that runs edge to edge in a full-bleed Container.
   */
  borderRadius?: 'none' | 'md';
  /**
   * How the picture fills the shape: cover crops it to fill, contain shows
   * all of it, with space around it if its shape is different
   */
  fit?: 'cover' | 'contain';
  /**
   * When the browser loads the file: lazy waits until it’s close to the
   * screen; eager loads it right away, for an image at the top of the page
   */
  loading?: 'lazy' | 'eager';
}

// Class names for each ratio, since a colon can't be part of one
const RATIO = { '16:9': 'ratio-16-9', '3:2': 'ratio-3-2', '1:1': 'ratio-1-1' } as const;

type Status = 'loading' | 'loaded' | 'error';

export function Image({
  src,
  alt,
  aspectRatio = '16:9',
  borderRadius = 'md',
  fit = 'cover',
  loading = 'lazy',
}: ImageProps) {
  // What happened to which file, so a new src starts over at loading
  const [result, setResult] = useState<{ src: string; status: Status } | null>(null);
  const status: Status = result?.src === src ? result.status : 'loading';
  const imgRef = useRef<HTMLImageElement>(null);

  // A file can finish loading before React is listening, for example when the
  // page was rendered on a server, so check once after the image appears
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setResult({ src, status: img.naturalWidth > 0 ? 'loaded' : 'error' });
  }, [src]);

  const frameClasses = [styles.frame, styles[RATIO[aspectRatio]], styles[`radius-${borderRadius}`]];
  return (
    <div className={frameClasses.join(' ')}>
      {/* Under the picture until it loads. If it fails, the base color stays, with no shine. */}
      {status !== 'loaded' && <Skeleton showShine={status === 'loading'} />}
      <img
        ref={imgRef}
        className={`${styles.image} ${styles[fit]}`}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setResult({ src, status: 'loaded' })}
        onError={() => setResult({ src, status: 'error' })}
      />
    </div>
  );
}
