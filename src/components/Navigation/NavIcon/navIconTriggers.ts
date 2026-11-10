import styles from './NavIcon.module.css';

// The classes a link puts on itself to drive the NavIcon inside it:
// trigger: the hover pose on hover, and the active pose on the current page
//   (aria-current="page").
// triggerFocus: also the hover pose on keyboard focus, kept while pressed.
export const navIconTrigger = styles.trigger;
export const navIconTriggerFocus = styles.triggerFocus;
