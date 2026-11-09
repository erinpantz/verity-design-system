import { Grid } from '../../Layout/Grid';
import { MetaItem } from '../../Text/MetaItem';
import styles from './CaseStudyHeader.module.css';

/** One fact about the project: a short label and its value */
export interface CaseStudyFact {
  /** The label, in sentence case, like “Role” */
  title: string;
  /** Its value, like “Lead designer” */
  value: string;
}

export interface CaseStudyHeaderProps {
  /** The case study’s title. It’s the page’s <h1>. */
  heading: string;
  /** Facts about the project, like the role, team, and year, in the order they should appear */
  facts: CaseStudyFact[];
}

// The top of a case study: the title and the facts about the project. It's
// the page's <header>, and the title is the page's <h1>, in display-default
// like Hero's headline. The facts are a description list: a Grid of
// MetaItems.
export function CaseStudyHeader({ heading, facts }: CaseStudyHeaderProps) {
  return (
    <header className={styles.caseStudyHeader}>
      <h1 className={styles.heading}>{heading}</h1>
      <Grid as="dl" itemWidth="sm">
        {facts.map((fact) => (
          <MetaItem key={fact.title} title={fact.title} value={fact.value} />
        ))}
      </Grid>
    </header>
  );
}
