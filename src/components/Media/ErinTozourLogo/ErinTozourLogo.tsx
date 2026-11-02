// The SVG comes straight from Figma's export (brand/, never edited by hand),
// loaded as text with Vite's ?raw import. If more logos arrive, Erin will
// decide whether they get a build step like the icons.
import logo from '../../../../brand/erin-tozour-logo.svg?raw';
import styles from './ErinTozourLogo.module.css';

// The viewBox and the shapes inside the <svg>, read once from the file
const viewBox = /\bviewBox="([^"]+)"/.exec(logo)?.[1];
const markup = /<svg\b[^>]*>([\s\S]*)<\/svg>/.exec(logo)?.[1] ?? '';

// Erin Tozour's name, drawn. It's one color (currentColor), so it takes the
// text color around it. Screen readers read it as “Erin Tozour.” It fills
// its container's width unless the owner sets its height; its width follows,
// so it keeps its proportions.
export function ErinTozourLogo() {
  return (
    <svg
      className={styles.logo}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      role="img"
      aria-label="Erin Tozour"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
