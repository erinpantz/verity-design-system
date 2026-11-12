import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { MainNav } from './MainNav';

const meta = {
  title: 'Navigation/MainNav',
  component: MainNav,
  args: { current: 'portfolio' },
  argTypes: {
    current: { control: 'inline-radio', options: [undefined, 'portfolio', 'profile', 'playground'] },
    hrefs: { control: false },
  },
  // The nav's own width picks its layout, so each story sets the width of a
  // box around it (dashed). The menu opens over the whole frame.
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '12rem' } } },
} satisfies Meta<typeof MainNav>;

export default meta;

type Story = StoryObj<typeof meta>;

// A box for the nav, at a width given as the nav's content width plus its
// side padding, so it follows the tokens at every breakpoint
const box =
  (contentWidth: string): Decorator =>
  (Story) => (
    <div
      style={{
        inlineSize: `calc(${contentWidth} + 2 * var(--verity-main-padding-inline))`,
        maxInlineSize: '100%',
        outline: 'var(--verity-border-width-sm) dashed var(--verity-color-border-divider)',
      }}
    >
      <Story />
    </div>
  );

// full: the full logo and the links. The frame's whole width.
export const Full: Story = {};

// short: the logo shows only “erin.” The widest short nav: 1px narrower than
// main-nav/short-logo-width.
export const Short: Story = {
  decorators: [box('var(--verity-main-nav-short-logo-width) - 1px')],
};

// short, at its narrowest: exactly main-nav/menu-width. Nothing should touch.
export const ShortNarrowest: Story = {
  name: 'Short, narrowest',
  decorators: [box('var(--verity-main-nav-menu-width)')],
};

// menu: the full logo and the menu button, which opens NavOverlay. The widest
// menu nav: 1px narrower than main-nav/menu-width.
export const Menu: Story = {
  decorators: [box('var(--verity-main-nav-menu-width) - 1px')],
};
