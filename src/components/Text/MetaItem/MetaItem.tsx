import styles from './MetaItem.module.css';

export interface MetaItemProps {
  /** The label, in sentence case. Its text style shows it in capitals. */
  title: string;
  /** The value the label describes */
  value: string;
}

// One label and value pair in a description list. It must go inside a <dl>,
// such as a Grid or stack with as="dl".
export function MetaItem({ title, value }: MetaItemProps) {
  return (
    <div className={styles.metaItem}>
      <dt className={styles.title}>{title}</dt>
      <dd className={styles.value}>{value}</dd>
    </div>
  );
}
