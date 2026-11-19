import { useEffect, useRef, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';
import { IconButton } from '../../Actions/IconButton';
import { focusPageStart } from '../../Layout/Shell/focusPageStart';
import { ErinTozourBadge } from '../../Media/ErinTozourBadge';
import styles from './NavOverlay.module.css';

export interface NavOverlayProps {
  /** Whether the menu is open */
  open: boolean;
  /**
   * Called when the menu should close: the back button, Escape, or following
   * one of its links. After a link, focus goes to the new page's heading;
   * otherwise, back to the menu button.
   */
  onClose: () => void;
  /** The links: MainNav passes its NavItems, in a column */
  children: ReactNode;
}

// The full menu, covering the screen, for when MainNav shows its menu button.
// It's a modal <dialog>: focus moves to the back button, and the page behind
// can't be reached until it closes. It slides in from the right edge and back
// out the same way, then focus returns to the menu button, or, after one of
// its links was followed, goes to the new page's heading. With reduce motion
// on, it appears and disappears at once (the slide is in the CSS only when
// motion is allowed).
export function NavOverlay({ open, onClose, children }: NavOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // What had focus when the menu opened, so focus can go back to it
  const openerRef = useRef<HTMLElement | null>(null);
  // Whether the menu is closing because one of its links was followed
  const followedLinkRef = useRef(false);

  // Open and close the dialog to match the open prop. Closing slides it out
  // first (data-closing starts the slide-out animation), and closes the
  // dialog when that ends. With no animation (reduce motion), it closes at once.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      delete dialog.dataset.closing;
      followedLinkRef.current = false;
      if (!dialog.open) {
        openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.showModal();
      }
    } else if (dialog.open && dialog.dataset.closing === undefined) {
      dialog.dataset.closing = '';
      // getAnimations() picks up the slide-out that data-closing just started
      Promise.all(dialog.getAnimations().map((animation) => animation.finished))
        .then(() => {
          // Unless it was opened again while sliding out
          if (dialog.dataset.closing !== undefined) dialog.close();
        })
        .catch(() => {
          // An animation was cancelled, because the menu opened again
        });
    }
  }, [open]);

  // Closed with the back button, Escape, or a click outside, focus goes back
  // to the menu button. If that button is gone, because the nav widened and
  // shows its links, focus goes to the nav's first link, the logo, so it
  // isn't lost on the page.
  // Closed by following a link, focus goes to the new page's heading
  // instead (focusPageStart), as the site does after a page change. NavOverlay
  // does it too because the site can't: while the menu is open, the page
  // behind it can't take focus, and as the dialog closes, the browser sends
  // focus back to the menu button. If the new page isn't there yet, focus
  // goes to this page's heading, and the site moves it on when the page
  // changes.
  function handleClose() {
    const dialog = dialogRef.current;
    if (dialog) delete dialog.dataset.closing;
    const opener = openerRef.current;
    openerRef.current = null;
    const followedLink = followedLinkRef.current;
    followedLinkRef.current = false;
    if (followedLink) {
      focusPageStart();
      if (open) onClose();
      return;
    }
    if (opener?.isConnected && opener.checkVisibility()) opener.focus();
    else opener?.closest('nav')?.querySelector<HTMLElement>('a[href]')?.focus();
    if (open) onClose();
  }

  // Escape: the browser would close the dialog at once, so it's stopped here
  // and the menu slides out instead
  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  // Following one of the links closes the menu, so it isn't still open when
  // the site shows the new page without reloading. A click with a modifier
  // key opens the page in a new tab or window, so this page stays, and focus
  // goes back to the menu button as usual.
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target instanceof Element && event.target.closest('a[href]')) {
      followedLinkRef.current = !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.navOverlay}
      aria-label="Menu"
      onClose={handleClose}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <div className={styles.header}>
        <IconButton icon="back" label="Close menu" onClick={onClose} />
        <ErinTozourBadge />
      </div>
      {children}
    </dialog>
  );
}
