import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationPage, TokenTiers, type TableOptions } from './Foundations';
import type { Group } from './tokenData';
import styles from './Foundations.module.css';

function options(group: Group): TableOptions {
  if (group.name.endsWith('width')) {
    return { preview: (value) => <div className={styles.borderExample} style={{ borderWidth: value }} /> };
  }
  if (group.name.endsWith('radius')) {
    return { preview: (value) => <div className={styles.radiusExample} style={{ borderRadius: value }} /> };
  }
  return {};
}

const meta = {
  title: 'Foundations/Borders',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const Borders: StoryObj = {
  render: () => (
    <FoundationPage title="Borders" intro="Every border width and corner radius token, drawn as an example.">
      <TokenTiers page="borders" order={['border.width', 'border.radius']} options={options} />
    </FoundationPage>
  ),
};
