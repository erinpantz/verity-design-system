// The wave is read from illustrations/divider.svg when the code is built
// (Vite's ?raw import gives the file's text), so a new Figma export updates
// it with no copying. There's only one illustration, so it has no build step
// of its own. When more arrive, we'll decide whether to extend the icon build
// (build-icons.ts) to cover illustrations/ too.
import divider from '../../../../illustrations/divider.svg?raw';
import styles from './Divider.module.css';

// The viewBox and the shapes inside the <svg>. The size comes from the
// viewBox, so the wave keeps the size it was drawn at in Figma.
const match = divider.match(/<svg[^>]*\sviewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>/);
if (!match) throw new Error('illustrations/divider.svg needs an <svg> with a viewBox');
const [, viewBox, markup] = match;
const [, , width, height] = viewBox.split(/\s+/);

// The markup comes from our own SVG file, exported from Figma, so it's safe to insert
export function Divider() {
  return (
    <div className={styles.divider} role="separator">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={width}
        height={height}
        fill="none"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>
  );
}
