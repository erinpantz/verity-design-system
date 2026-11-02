import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { useBreakpoint } from '../../../styles/useBreakpoint';
import styles from './NavOverlay.module.css';

export interface NavOverlayProps {
  /** Whether the menu is open */
  open: boolean;
  /** Called when the menu should close: Escape, a click outside it, or the screen widening to Large */
  onClose: () => void;
  /** The menu: a MainNav with placement="overlay" */
  children: ReactNode;
}

// The full menu, over the page, on Small and Medium. It's a modal <dialog>:
// focus moves into it and the page behind can't be reached until it closes.
// Escape closes it, and focus returns to whatever opened it (the menu button).
export function NavOverlay({ open, onClose, children }: NavOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // What had focus when the menu opened, so focus can go back to it
  const openerRef = useRef<HTMLElement | null>(null);
  const breakpoint = useBreakpoint();

  // Open and close the dialog to match the open prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // On Large and XL, the nav is beside the page, so the overlay isn't needed
  useEffect(() => {
    if (open && (breakpoint === 'large' || breakpoint === 'xl')) onClose();
  }, [open, breakpoint, onClose]);

  // However it closed (Escape, or the open prop), focus goes back to the
  // menu button, if it's still on the page
  function handleClose() {
    const opener = openerRef.current;
    if (opener?.isConnected) opener.focus();
    openerRef.current = null;
    if (open) onClose();
  }

  // A click on the dimmed page around the menu closes it. Those clicks land
  // on the dialog itself; clicks on the menu land on what's inside it.
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog ref={dialogRef} className={styles.navOverlay} aria-label="Menu" onClose={handleClose} onClick={handleClick}>
      <div className={styles.menu}>{children}</div>
    </dialog>
  );
}
