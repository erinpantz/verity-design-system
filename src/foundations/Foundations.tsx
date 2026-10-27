// Shared building blocks for the Foundations pages: page layout, tier
// sections, and token tables.

import { useRef, useState, type ReactNode } from 'react';
import { cellFor, columnsFor, groupsFor, type Group, type Page, type Token } from './tokenData';
import styles from './Foundations.module.css';

export function FoundationPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
      </header>
      {children}
    </div>
  );
}

export function TierSection({ tier, children }: { tier: number; children: ReactNode }) {
  return (
    <section className={styles.tier} aria-labelledby={`tier-${tier}`}>
      <div className={styles.tierHeader}>
        <h2 id={`tier-${tier}`} className={styles.tierTitle}>
          Tier {tier}
        </h2>
        {tier === 1 && <p className={styles.note}>Reference only: don’t use Tier 1 tokens in components.</p>}
      </div>
      {children}
    </section>
  );
}

// Click to copy a CSS variable name. If the clipboard isn't available, the name is selected instead.
export function CopyVar({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      if (code.current) window.getSelection()?.selectAllChildren(code.current);
    }
  }

  return (
    <button type="button" className={styles.copy} onClick={copy} title="Copy variable name">
      <code ref={code} className={styles.code}>
        {name}
      </code>
      <span className={styles.copied} aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

export interface TableOptions {
  // Drawn above each value, from that value (for example a color swatch)
  preview?: (value: string, token: Token) => ReactNode;
  // An extra first row, one cell per column (for example a live text sample)
  sample?: (group: Group, column: string) => ReactNode;
}

// The description every token in a group shares, if they all have the same one
function sharedDescription(group: Group): string | undefined {
  const first = group.tokens[0]?.description;
  return first && group.tokens.every((t) => t.description === first) ? first : undefined;
}

export function TokenTable({ group, preview, sample }: { group: Group } & TableOptions) {
  const columns = columnsFor(group.kind);
  // A shared description shows once, under the group heading, instead of on every row
  const showRowDescriptions = !sharedDescription(group);
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Token</th>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sample && (
            <tr>
              <th scope="row" className={styles.detail}>
                Sample
              </th>
              {columns.map((column) => (
                <td key={column}>{sample(group, column)}</td>
              ))}
            </tr>
          )}
          {group.tokens.map((token) => (
            <tr key={token.cssVar}>
              <th scope="row">
                <div className={styles.cellText}>
                  <CopyVar name={token.cssVar} />
                  {showRowDescriptions && token.description && <p className={styles.description}>{token.description}</p>}
                </div>
              </th>
              {columns.map((column) => {
                const cell = cellFor(token, column);
                return (
                  <td key={column}>
                    <div className={styles.cell}>
                      {preview && cell.value !== undefined && preview(cell.value, token)}
                      <div className={styles.cellText}>
                        <span className={styles.value}>{cell.value ?? 'Not in tokens.css. Run npm run tokens.'}</span>
                        {cell.reference && <span className={styles.detail}>→ {cell.reference}</span>}
                        {cell.sameAs && <span className={styles.detail}>Same as {cell.sameAs}</span>}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TokenGroup({ group, ...options }: { group: Group } & TableOptions) {
  const description = sharedDescription(group);
  return (
    <div className={styles.group}>
      <div>
        <h3 className={styles.groupTitle}>{group.name}</h3>
        <p className={styles.detail}>{group.collection}</p>
        {description && <p className={styles.groupDescription}>{description}</p>}
      </div>
      <TokenTable group={group} {...options} />
    </div>
  );
}

// Every token on a page, split into tier sections
export function TokenTiers({
  page,
  options,
  order,
}: {
  page: Page;
  // Previews and samples for a group
  options?: (group: Group) => TableOptions;
  // Group names to show first, in this order
  order?: string[];
}) {
  const groups = groupsFor(page, order);
  const tiers = [...new Set(groups.map((g) => g.tier))];
  return tiers.map((tier) => (
    <TierSection key={tier} tier={tier}>
      {groups
        .filter((g) => g.tier === tier)
        .map((group) => (
          <TokenGroup key={`${group.collection}|${group.name}`} group={group} {...options?.(group)} />
        ))}
    </TierSection>
  ));
}
