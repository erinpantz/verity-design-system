import { ICONS, type IconName } from '../../../icons/icons.generated';
import styles from './Icon.module.css';

export interface IconProps {
  /** Which icon, by its Figma name without “icon/”, for example “email” or “nav/portfolio” */
  name: IconName;
  /** Width and height, from the icon size tokens */
  size?: 'sm' | 'md' | 'lg';
  /**
   * What the icon means, read by screen readers. Leave it out when the icon is
   * decorative or sits next to text that says the same thing.
   */
  label?: string;
}

// The icon's markup comes from icons.generated.ts, built from our own SVG
// files and checked for scripts at build time, so it's safe to insert.
export function Icon({ name, size = 'md', label }: IconProps) {
  const { viewBox, markup } = ICONS[name];
  const accessibility = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <svg
      className={`${styles.icon} ${styles[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      {...accessibility}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
