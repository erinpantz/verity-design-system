import type { ReactNode } from 'react';
import styles from './MediaText.module.css';

export interface MediaTextProps {
  /** The text, such as a TextBlock. It always comes first in the reading order. */
  text: ReactNode;
  /** The media, such as a MediaBlock with an Image */
  media: ReactNode;
  /**
   * Row puts the text and media side by side, and stacks them when MediaText
   * is narrower than media-text/stack-width (800px). Stacked puts the text
   * above the media at every width.
   */
  layout?: 'row' | 'stacked';
  /**
   * In a row, which side the media is on. Left moves it visually only: the
   * text is still read first.
   */
  mediaPosition?: 'right' | 'left';
  /** In a row, the media column’s share of the width, in percent. Stacked ignores it. */
  mediaRatio?: '60' | '50' | '40';
}

// Text beside media, or above it. The text comes first in the HTML, so
// screen readers and keyboards reach it first wherever the media sits.
export function MediaText({ text, media, layout = 'row', mediaPosition = 'right', mediaRatio = '60' }: MediaTextProps) {
  const classes =
    layout === 'row'
      ? [styles.mediaText, styles.row, styles[`media-${mediaPosition}`], styles[`ratio-${mediaRatio}`]]
      : [styles.mediaText, styles.stacked];
  return (
    <div className={classes.join(' ')}>
      <div className={styles.text}>{text}</div>
      <div className={styles.media}>{media}</div>
    </div>
  );
}
