import styles from './ErinTozourLogo.module.css';

// The class a link puts on itself so the ErinTozourLogo inside it cycles
// through the accent colors while the link is hovered or has keyboard focus
// (see ErinTozourLogo.module.css). MainNav's home link uses it. Not exported
// from the library.
export const erinTozourLogoTrigger = styles.trigger;
