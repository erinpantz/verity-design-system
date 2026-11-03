import styles from './Skeleton.module.css';

export interface SkeletonProps {
  /**
   * Whether the block pulses to the lighter shine color and back. Turn it
   * off when nothing is coming, like an image that failed to load.
   */
  showShine?: boolean;
}

// A placeholder that fills its container while media loads. It's only
// decoration, so screen readers skip it.
export function Skeleton({ showShine = true }: SkeletonProps) {
  const classes = [styles.skeleton, showShine ? styles.shine : ''];
  return <div className={classes.join(' ').trim()} aria-hidden="true" />;
}
