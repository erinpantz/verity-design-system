import type { Preview } from '@storybook/react-vite'
import { useEffect, useGlobals } from 'storybook/preview-api'
import '../src/styles/fonts.css'
import '../src/styles/global.css'
import { ThemedDocsContainer } from './ThemedDocsContainer'

// A story shown in its own frame on a docs page (docs: { story: { inline:
// false } }) runs its own Storybook, which doesn't know the toolbar's theme
// and starts on the default. Its frame sits inside the docs page's frame, so
// it reads the docs page's theme instead. On a story page, the frame's parent
// is Storybook's own window (the top one), so this is null.
function docsPageRoot(): HTMLElement | null {
  try {
    if (window.parent === window || window.parent === window.top) return null
    return window.parent.document.documentElement
  } catch {
    return null
  }
}

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
      const [, updateGlobals] = useGlobals()
      const docsRoot = docsPageRoot()
      const theme = docsRoot?.dataset.theme ?? context.globals.theme
      document.documentElement.dataset.theme = theme

      useEffect(() => {
        const root = document.documentElement
        const watch = (target: HTMLElement, onChange: () => void) => {
          const observer = new MutationObserver(onChange)
          observer.observe(target, { attributes: true, attributeFilter: ['data-theme'] })
          return () => observer.disconnect()
        }

        // In its own frame on a docs page: follow the docs page as it changes
        if (docsRoot) {
          return watch(docsRoot, () => {
            if (docsRoot.dataset.theme) root.dataset.theme = docsRoot.dataset.theme
          })
        }

        // ThemeToggle sets data-theme itself. When it does, move the toolbar to
        // match, so the toolbar and the page always agree.
        return watch(root, () => {
          const current = root.dataset.theme
          if (current && current !== theme) updateGlobals({ theme: current })
        })
      }, [theme, updateGlobals, docsRoot])

      return <Story />
    },
  ],
};

export default preview;
