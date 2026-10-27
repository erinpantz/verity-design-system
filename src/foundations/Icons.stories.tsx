import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Icon } from '../components/Media/Icon';
import { ICON_NAMES } from '../icons/icons.generated';
import { FoundationPage } from './Foundations';
import { cellFor, columnsFor, TOKENS } from './tokenData';
import styles from './Foundations.module.css';

const SIZES = ['sm', 'md', 'lg'] as const;
const NAV_ICONS = ICON_NAMES.filter((name) => name.startsWith('nav/'));

// The variables NavItem and IconButton set on hover, and the tokens they use
const NAV_ACCENTS: Record<string, string> = {
  '--icon-accent-brand': 'var(--verity-nav-icon-color-accent-brand)',
  '--icon-accent-three': 'var(--verity-nav-icon-color-accent-three)',
  '--icon-accent-four': 'var(--verity-nav-icon-color-accent-four)',
  '--icon-accent-yellow': 'var(--verity-nav-icon-color-accent-yellow)',
};

const NAV_ACCENTS_CSS = `.nav-item:hover {\n${Object.entries(NAV_ACCENTS)
  .map(([name, value]) => `  ${name}: ${value};`)
  .join('\n')}\n}`;

// "md · 24px", from the icon size token
function sizeHeading(size: string) {
  const token = TOKENS.find((t) => t.path === `icon.size.${size}`);
  const value = token && cellFor(token, columnsFor(token.kind)[0]).value;
  return value ? `${size} · ${value}` : size;
}

function IconsPage() {
  return (
    <FoundationPage title="Icons" intro="Every Verity icon at each size. Icons take the text color around them.">
      <section className={styles.tier} aria-labelledby="all-icons">
        <h2 id="all-icons" className={styles.tierTitle}>
          All icons
        </h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                {SIZES.map((size) => (
                  <th key={size} scope="col">
                    {sizeHeading(size)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ICON_NAMES.map((name) => (
                <tr key={name}>
                  <th scope="row" className={styles.codeName}>
                    {name}
                  </th>
                  {SIZES.map((size) => (
                    <td key={size}>
                      <Icon name={name} size={size} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.tier} aria-labelledby="nav-icons">
        <div className={styles.tierHeader}>
          <h2 id="nav-icons" className={styles.tierTitle}>
            Nav icons
          </h2>
          <p className={styles.intro}>
            The nav icons have accent shapes. On their own, the accents use the text color. NavItem and IconButton
            color them on hover by setting four variables on the icon: <code className={styles.codeName}>--icon-accent-brand</code>,{' '}
            <code className={styles.codeName}>--icon-accent-three</code>,{' '}
            <code className={styles.codeName}>--icon-accent-four</code>, and{' '}
            <code className={styles.codeName}>--icon-accent-yellow</code>.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Text color only</th>
                <th scope="col">Accents set</th>
              </tr>
            </thead>
            <tbody>
              {NAV_ICONS.map((name) => (
                <tr key={name}>
                  <th scope="row" className={styles.codeName}>
                    {name}
                  </th>
                  <td>
                    <Icon name={name} size="lg" />
                  </td>
                  <td style={NAV_ACCENTS as CSSProperties}>
                    <Icon name={name} size="lg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.detail}>The “Accents set” column uses this CSS:</p>
        <pre className={styles.codeBlock}>
          <code>{NAV_ACCENTS_CSS}</code>
        </pre>
      </section>
    </FoundationPage>
  );
}

const meta = {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const Icons: StoryObj = {
  render: () => <IconsPage />,
};
