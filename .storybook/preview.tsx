import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      // Sidebar order matches the Figma pages
      storySort: {
        order: ['Introduction', 'Actions', 'Navigation', 'Layout', 'Text', 'Media', 'Content blocks'],
      },
    },
  },
};

export default preview;