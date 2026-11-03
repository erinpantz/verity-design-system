// Verity's themes, Blue and Red. A theme is the data-theme attribute on the
// page's root (<html>): tokens.css uses Blue when it's missing or "blue", and
// Red when it's "red". Storybook's Theme toolbar and ThemeToggle both set it,
// so there's one way to apply a theme.

import { useSyncExternalStore } from 'react';

export type Theme = 'blue' | 'red';

/** Where the visitor's choice is saved in localStorage */
export const THEME_STORAGE_KEY = 'verity-theme';

/** First-time visitors get Blue */
export const DEFAULT_THEME: Theme = 'blue';

function isTheme(value: unknown): value is Theme {
  return value === 'blue' || value === 'red';
}

/** The theme the page shows now */
export function getTheme(): Theme {
  if (typeof document === 'undefined') return DEFAULT_THEME;
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : DEFAULT_THEME;
}

/**
 * Switches the whole page to a theme at once and saves the choice, so the
 * next visit starts in it (see themeScript).
 */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  // Turn transitions off for the switch, so nothing fades into the new theme
  // (global.css). Reading a style makes the browser apply the new colors
  // before transitions come back.
  root.dataset.themeSwitching = '';
  root.dataset.theme = theme;
  void getComputedStyle(root).color;
  delete root.dataset.themeSwitching;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private windows, strict settings). The theme
    // still changes; it just isn't remembered.
  }
}

// useTheme watches data-theme, so it follows every change, wherever it
// comes from (ThemeToggle, or Storybook's toolbar)
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/**
 * The current theme, kept up to date. Before JavaScript runs (on a server)
 * it's the default; colors are right anyway, because they come from CSS.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME);
}

/**
 * A tiny script for the site's <head>. It applies the saved theme before the
 * first paint, so a Red visitor never sees a flash of Blue. Put it inline, as
 * the first thing in <head>:
 *
 *   <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="blue"||t==="red")document.documentElement.dataset.theme=t}catch(e){}})();`;
