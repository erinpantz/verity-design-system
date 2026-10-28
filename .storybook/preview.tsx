import type { Preview } from '@storybook/react-vite'
import '../src/styles/global.css'
import './preview.css'
import { ThemedDocsContainer } from './ThemedDocsContainer'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // Docs pages follow the Theme menu too (stories use the decorator below)
    docs: {
      container: ThemedDocsContainer,
    },
    options: {
      // Sidebar order (the rule is in CLAUDE.md): Introduction, Guidelines, and
      // Foundations first, then everything else A–Z at every level. Stories in
      // one component share a title, so they keep the order they're written
      // in, with Docs first because main.ts finds .mdx files before stories.
      storySort: {
        method: 'alphabetical',
        order: ['Introduction', 'Guidelines', 'Foundations', '*'],
      },
    },
  },
  // Theme switch in the toolbar. Sets data-theme, which tokens.css uses to pick Blue or Red.
  globalTypes: {
    theme: {
      description: 'Verity theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'blue', title: 'Blue' },
          { value: 'red', title: 'Red' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'blue',
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme
      return <Story />
    },
  ],
};

export default preview;
