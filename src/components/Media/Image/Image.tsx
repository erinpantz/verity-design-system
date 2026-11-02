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
  /** The corners: square, or rounded with border/radius/md */
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

export function Image({
  src,
  alt,
  aspectRatio = '16:9',
  borderRadius = 'none',
  fit = 'cover',
  loading = 'lazy',
}: ImageProps) {
  const classes = [styles.image, styles[RATIO[aspectRatio]], styles[`radius-${borderRadius}`], styles[fit]];
  return <img className={classes.join(' ')} src={src} alt={alt} loading={loading} decoding="async" />;
}
