import type { Preview } from '@storybook/react-vite'
import '../src/styles/global.css'
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
      // Sidebar order matches the Figma pages
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Color', 'Typography', 'Spacing and layout', 'Borders', 'Breakpoints', 'Motion and effects'],
          'Actions',
          'Navigation',
          'Layout',
          'Text',
          'Media',
          'Content blocks',
        ],
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
