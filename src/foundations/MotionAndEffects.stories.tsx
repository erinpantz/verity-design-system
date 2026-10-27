import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationPage, TokenTiers, type TableOptions } from './Foundations';
import { cellFor, type Group } from './tokenData';
import styles from './Foundations.module.css';

// An easing curve, drawn from its cubic-bezier() control points. Time runs
// left to right and progress bottom to top.
function curve(value: string) {
  const points = value.match(/-?[\d.]+/g)?.map(Number);
  if (!value.startsWith('cubic-bezier') || points?.length !== 4) return null;
  const [x1, y1, x2, y2] = points.map((n) => n * 100);
  return (
    <svg className={styles.curve} viewBox="0 0 100 100" aria-hidden="true">
      <path className={styles.curveAxis} d="M0,100 L100,0" />
      <path className={styles.curveLine} d={`M0,100 C${x1},${100 - y1} ${x2},${100 - y2} 100,0`} />
    </svg>
  );
}

// A shadow put together from its parts: x, y, blur, spread, and color
function shadow(group: Group, column: string) {
  const part = (name: string) =>
    cellFor(group.tokens.find((t) => t.path.endsWith(`.${name}`))!, column).value ?? '';
  const boxShadow = ['x', 'y', 'blur', 'spread', 'color'].map(part).join(' ');
  return (
    <div className={styles.shadowStage}>
      <div className={styles.shadowExample} style={{ boxShadow }} />
    </div>
  );
}

function isShadow(group: Group) {
  return ['x', 'y', 'blur', 'spread', 'color'].every((name) => group.tokens.some((t) => t.path.endsWith(`.${name}`)));
}

function options(group: Group): TableOptions {
  if (isShadow(group)) {
    return {
      sample: shadow,
      preview: (value, token) => (token.type === 'color' ? <div className={styles.swatch} style={{ background: value }} /> : null),
    };
  }
  return { preview: curve };
}

const meta = {
  title: 'Foundations/Motion and effects',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;

export const MotionAndEffects: StoryObj = {
  name: 'Motion and effects',
  render: () => (
    <FoundationPage title="Motion and effects" intro="Every easing and shadow token, with each curve and shadow drawn as an example.">
      <TokenTiers page="motion" order={['easing.standard-decelerate', 'shadow.sm']} options={options} />
    </FoundationPage>
  ),
};
