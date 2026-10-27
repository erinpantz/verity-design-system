// Wraps every docs page so it follows the Theme menu in the toolbar, like
// stories do. Sets data-theme, which tokens.css uses to pick Blue or Red.

import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks'
import { useEffect, useLayoutEffect, useState, type PropsWithChildren } from 'react'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'

type Globals = Record<string, unknown>

// The theme when the page loads. Storybook's docs context keeps the current
// settings in its store, which isn't in Storybook's public types.
function initialTheme(context: DocsContainerProps['context']): string {
  const store = (context as unknown as { store?: { userGlobals?: { get(): Globals } } }).store
  const theme = store?.userGlobals?.get().theme ?? context.projectAnnotations.initialGlobals?.theme
  return typeof theme === 'string' ? theme : 'blue'
}

export function ThemedDocsContainer({ context, children }: PropsWithChildren<DocsContainerProps>) {
  const [theme, setTheme] = useState(() => initialTheme(context))

  // Follow the toolbar when the theme changes
  useEffect(() => {
    const onGlobals = ({ globals }: { globals: Globals }) => {
      if (typeof globals.theme === 'string') setTheme(globals.theme)
    }
    context.channel.on(GLOBALS_UPDATED, onGlobals)
    return () => context.channel.off(GLOBALS_UPDATED, onGlobals)
  }, [context])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return <DocsContainer context={context}>{children}</DocsContainer>
}
