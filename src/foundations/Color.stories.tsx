import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationPage, TokenTiers } from './Foundations';
import styles from './Foundations.module.css';

const meta = {
  title: 'Foundations/Color',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const Color: StoryObj = {
  render: () => (
    <FoundationPage
      title="Color"
      intro="Every color token, from raw primitives to component colors, with Blue and Red side by side where they differ."
    >
      <TokenTiers
        page="color"
        options={() => ({ preview: (value) => <div className={styles.swatch} style={{ background: value }} /> })}
      />
    </FoundationPage>
  ),
};
