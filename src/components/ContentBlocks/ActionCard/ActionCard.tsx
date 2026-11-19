import type { ReactNode } from 'react';
import type { IconName } from '../../../icons/icons.generated';
import { HorizontalStack } from '../../Layout/HorizontalStack';
import { IconTile, type IconTileProps } from '../../Media/IconTile';
import { Heading } from '../../Text/Heading';
import styles from './ActionCard.module.css';

export interface ActionCardProps {
  /** What the card offers, in a word or two, like “Let’s chat” */
  heading: string;
  /**
   * The heading’s level: 3 under a Section’s h2 (the default), or 2 where
   * the cards are the top level, as in the Footer
   */
  headingLevel?: 2 | 3;
  /** The icon on the tile beside the heading. It’s decorative: the heading says the same thing. */
  icon: IconName;
  /** The tile’s color, one of the six accents */
  iconColor: IconTileProps['color'];
  /**
   * A sentence or two about what the card offers. Text, or inline content:
   * text with a Link in it. It’s one paragraph, so no blocks.
   */
  body: ReactNode;
  /**
   * What to do: a Button, optionally followed by IconButtons, all md. They
   * sit at the bottom of the card, spacing/xs apart.
   */
  actions: ReactNode;
}

// A card that offers something to do: a heading with an IconTile, a
// sentence or two, and its buttons. The card isn't a link, unlike
// ProjectCard and PortfolioCard: its buttons are. It fills the height it's
// given, with the buttons at the bottom, so in a Grid row they line up
// across cards.
export function ActionCard({ heading, headingLevel = 3, icon, iconColor, body, actions }: ActionCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Heading level={headingLevel}>{heading}</Heading>
          <IconTile icon={icon} color={iconColor} />
        </div>
        <p className={styles.body}>{body}</p>
      </div>
      <HorizontalStack gap="xs">{actions}</HorizontalStack>
    </div>
  );
}
