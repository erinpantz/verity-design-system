import { useEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from '../Playback/useReducedMotion';
import styles from './LayeredImage.module.css';

export interface LayeredImageLayer {
  /** The layer’s image file: a photo, or a drawing (SVG or PNG) */
  src: string;
  /** Its left edge, in percent of the frame’s width (0 is the frame’s left edge) */
  x: number;
  /** Its top edge, in percent of the frame’s height (0 is the frame’s top edge) */
  y: number;
  /** Its width, in percent of the frame’s width. Its height follows from the file’s own shape. */
  width: number;
  /**
   * How far it moves with the pointer, and which way: 0 stays still, 1 moves
   * the max offset with the pointer, −1 against it. Bigger numbers feel
   * closer.
   */
  depth?: number;
  /** Rounded corners, from the border radius tokens. Usually only on the bottom layer, a photo. */
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Draws the layer in one Verity color, a color token’s custom property,
   * such as "--verity-color-accent-red". Its shape comes from the file and
   * its own colors are ignored, so it’s for single-color drawings.
   */
  color?: `--verity-color-${string}`;
}

export interface LayeredImageProps {
  /**
   * What the whole picture shows, for people who can’t see it. Use an empty
   * string ("") when it’s decorative and the text around it says it all.
   */
  alt: string;
  /** The layers, bottom first */
  layers: LayeredImageLayer[];
  /** The frame’s shape. It fills its container’s width and keeps this ratio. */
  aspectRatio?: '16:9' | '3:2' | '4:3' | '1:1';
  /** Also tilt the whole picture slightly toward the pointer, in 3D */
  tilt?: boolean;
  /**
   * When the browser loads the files: lazy waits until they’re close to the
   * screen; eager loads them right away, for a picture at the top of the page
   */
  loading?: 'lazy' | 'eager';
}

// Class names for each ratio, since a colon can't be part of one
const RATIO = { '16:9': 'ratio-16-9', '3:2': 'ratio-3-2', '4:3': 'ratio-4-3', '1:1': 'ratio-1-1' } as const;

// How the layers follow the pointer, tuned in Erin's prototype: each 60 fps
// frame, they move this share of the distance left to go. The step below
// scales it by the real time between frames, so it feels the same at 120 Hz.
// (The max offset, tilt, and perspective are in LayeredImage.module.css.)
const FOLLOW_PER_FRAME = 0.1;
const FRAME_MS = 1000 / 60;
// Close enough to the target to stop: a thousandth of the way across
const REST = 0.001;
// Only a mouse or trackpad moves the layers, never touch
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

const clamp = (n: number) => Math.min(1, Math.max(-1, n));

// A picture built from layers that move at different depths as the pointer
// moves over it. The frame is one image for screen readers, named by alt;
// the layers are decorative. The motion runs outside React: it writes the
// pointer's eased position (−1 to 1 on each axis) to two custom properties
// on the frame, and the CSS turns them into each layer's translate and the
// tilt, so each frame changes transforms only, with no layout. The loop
// stops once everything is at rest.
export function LayeredImage({ alt, layers, aspectRatio = '1:1', tilt = true, loading = 'lazy' }: LayeredImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reducedMotion) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    const write = () => {
      frame.style.setProperty('--pointer-x', current.x.toFixed(4));
      frame.style.setProperty('--pointer-y', current.y.toFixed(4));
    };

    const step = (now: number) => {
      // Real time since the last frame, capped so a background tab doesn't jump
      const elapsed = last ? Math.min(now - last, 100) : FRAME_MS;
      last = now;
      const share = 1 - Math.pow(1 - FOLLOW_PER_FRAME, elapsed / FRAME_MS);
      current.x += (target.x - current.x) * share;
      current.y += (target.y - current.y) * share;
      if (Math.abs(target.x - current.x) < REST && Math.abs(target.y - current.y) < REST) {
        current.x = target.x;
        current.y = target.y;
        write();
        raf = 0;
        last = 0;
        if (target.x === 0 && target.y === 0) delete frame.dataset.moving;
        return;
      }
      write();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf) return;
      frame.dataset.moving = '';
      raf = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !window.matchMedia(FINE_POINTER).matches) return;
      // The frame itself never moves (only what's inside it), so its box is
      // a steady reference
      const box = frame.getBoundingClientRect();
      target.x = clamp(((event.clientX - box.left) / box.width) * 2 - 1);
      target.y = clamp(((event.clientY - box.top) / box.height) * 2 - 1);
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (current.x !== 0 || current.y !== 0) start();
    };

    frame.addEventListener('pointermove', onMove);
    frame.addEventListener('pointerleave', onLeave);
    return () => {
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      // Back to rest at once, for example when reduce motion is turned on
      frame.style.removeProperty('--pointer-x');
      frame.style.removeProperty('--pointer-y');
      delete frame.dataset.moving;
    };
  }, [reducedMotion]);

  const frameClasses = [styles.frame, styles[RATIO[aspectRatio]], tilt ? styles.tilt : ''];
  // One image for screen readers, or nothing at all when it's decorative
  const accessibility = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true };

  return (
    <div ref={frameRef} className={frameClasses.join(' ')} {...accessibility}>
      <div className={styles.stage}>
        {layers.map((layer, i) => {
          // Each layer's place and depth are its own data, so they're set
          // as custom properties; the CSS module does the rest
          const place = {
            '--x': `${layer.x}%`,
            '--y': `${layer.y}%`,
            '--width': `${layer.width}%`,
            '--depth': layer.depth ?? 0,
            ...(layer.color && {
              '--color': `var(${layer.color})`,
              '--mask': `url(${JSON.stringify(layer.src)})`,
            }),
          } as CSSProperties;
          const classes = [
            styles.layer,
            layer.radius && styles[`radius-${layer.radius}`],
            layer.color && styles.colored,
          ];
          return (
            <span key={i} className={classes.filter(Boolean).join(' ')} style={place}>
              {/* With a color, the file is drawn through a mask in that
                  color, and this img only gives the layer its height */}
              <img
                className={styles.image}
                src={layer.src}
                alt=""
                aria-hidden
                draggable={false}
                loading={loading}
                decoding="async"
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
