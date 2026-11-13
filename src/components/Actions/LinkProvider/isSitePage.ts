/**
 * Whether a link goes to a page on this site, so a router can handle it: an
 * address that starts with one slash (not two, which is another site), with
 * no target (like a new tab), no download, and no file extension at the end
 * of its path (like the resume PDF, which a router would try to show as a
 * page). Everything else, like other sites and mailto:, stays a plain <a>.
 */
export function isSitePage(href: string | undefined, target?: string, download?: unknown): boolean {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return false;
  if (target || download !== undefined) return false;
  const path = href.split(/[?#]/)[0];
  const last = path.slice(path.lastIndexOf('/') + 1);
  return !/\.[a-z0-9]+$/i.test(last);
}
