import { Badge } from '../../FeedbackAndStatus/Badge';
import styles from './ProblemOpportunityBlock.module.css';

export interface ProblemOpportunityBlockProps {
  /** What was wrong, in a sentence or two */
  problem: string;
  /** What that opened up, in a sentence or two */
  opportunity: string;
}

// A problem and the opportunity it opened, one above the other. It's a
// description list: each Badge is a label, and each text is what it labels.
export function ProblemOpportunityBlock({ problem, opportunity }: ProblemOpportunityBlockProps) {
  return (
    <dl className={styles.block}>
      <div className={`${styles.part} ${styles.problem}`}>
        <dt className={styles.label}>
          <Badge color="error" label="Problem" />
        </dt>
        <dd className={styles.text}>{problem}</dd>
      </div>
      <div className={`${styles.part} ${styles.opportunity}`}>
        <dt className={styles.label}>
          <Badge color="success" label="Opportunity" />
        </dt>
        <dd className={styles.text}>{opportunity}</dd>
      </div>
    </dl>
  );
}
