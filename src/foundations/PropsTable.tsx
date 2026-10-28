// A component's props as a Verity-styled table, for component docs pages.
// Storybook reads each prop's name, type, default, and description from the
// component's TypeScript types and comments, so the table stays up to date.
//
//   <PropsTable of={IconStories} />

import { useOf } from '@storybook/addon-docs/blocks';
import styles from './PropsTable.module.css';

type Of = Parameters<typeof useOf>[0];

interface ArgType {
  name?: string;
  description?: string;
  type?: { required?: boolean; name?: string; value?: unknown };
  table?: {
    disable?: boolean;
    type?: { summary?: string };
    defaultValue?: { summary?: string };
  };
}

// A prop's type for the table. For a fixed set of values, Storybook's summary
// just says "union", so list the values instead: 'sm' | 'md' | 'lg'.
function typeOf(argType: ArgType): string | undefined {
  const { type } = argType;
  if (type?.name === 'enum' && Array.isArray(type.value)) {
    return type.value.map((value) => (typeof value === 'string' ? `'${value}'` : String(value))).join(' | ');
  }
  return argType.table?.type?.summary;
}

export function PropsTable({ of }: { of: Of }) {
  const { preparedMeta } = useOf(of, ['meta']);
  const props = Object.entries(preparedMeta.argTypes as Record<string, ArgType>).filter(
    ([, argType]) => !argType.table?.disable,
  );

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Prop</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map(([key, argType]) => {
          const type = typeOf(argType);
          const defaultValue = argType.table?.defaultValue?.summary;
          return (
            <tr key={key}>
              <td className={styles.name}>
                <code>{argType.name ?? key}</code>
              </td>
              <td>{type ? <code>{type}</code> : '—'}</td>
              <td>{defaultValue ? <code>{defaultValue}</code> : argType.type?.required ? 'Required' : '—'}</td>
              <td>{argType.description || '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
