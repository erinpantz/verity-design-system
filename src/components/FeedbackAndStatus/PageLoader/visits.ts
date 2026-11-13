import type { Section } from '../../Navigation/NavIcon/poseClock';

// The sections visited in this tab, remembered in sessionStorage, so until
// the tab closes. Every read and write is in a try/catch: in a private
// window, or with storage blocked, it still works, and every visit counts
// as a first.
const KEY = 'verity-page-loader-visited';

function read(): Section[] {
  try {
    const list: unknown = JSON.parse(sessionStorage.getItem(KEY) ?? '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function hasVisited(section: Section): boolean {
  return read().includes(section);
}

export function markVisited(section: Section) {
  const list = read();
  if (list.includes(section)) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify([...list, section]));
  } catch {
    // Not remembered: the next visit counts as a first again
  }
}

/** Forgets every visit, so each section's next visit is a first. For stories. */
export function forgetVisits() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Nothing was remembered
  }
}
