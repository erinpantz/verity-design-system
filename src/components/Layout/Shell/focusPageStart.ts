// Where focus goes when a new page appears without a reload: the page's
// heading, the first h1 in Main, so a screen reader announces the page by
// name (“Portfolio, heading level 1”) instead of just “main.” The heading
// isn't a control, so it's made focusable with tabindex="-1" (reachable by
// code, not by Tab) and shows no focus ring (see .main in Shell.module.css).
// With no h1, focus goes to Main itself, where the skip link sends it.
// It doesn't scroll: the site's router decides that.
//
// The site calls it after each page change in the app, and NavOverlay calls
// it when it closes because one of its links was followed, so whichever
// runs last, focus ends at the new page.
export function focusPageStart() {
  const main = document.querySelector<HTMLElement>('main');
  if (!main) return;
  const heading = main.querySelector<HTMLElement>('h1');
  if (heading && !heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  (heading ?? main).focus({ preventScroll: true });
}
