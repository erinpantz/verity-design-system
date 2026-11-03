// Wraps every docs page so it follows the Theme menu in the toolbar, like
// stories do. Sets data-theme, which tokens.css uses to pick Blue or Red, and
// gives Storybook's docs blocks the matching theme from verityTheme.ts.

import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks'
import { useEffect, useLayoutEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import { isVerityThemeName, verityTheme } from './verityTheme'

type Globals = Record<string, unknown>

// The theme this docs page's Storybook has. Storybook's docs context keeps the
// current settings in its store, which isn't in Storybook's public types.
function storedTheme(context: DocsContainerProps['context']): string {
  const store = (context as unknown as { store?: { userGlobals?: { get(): Globals } } }).store
  const theme = store?.userGlobals?.get().theme ?? context.projectAnnotations.initialGlobals?.theme
  return typeof theme === 'string' ? theme : 'blue'
}

export function ThemedDocsContainer({ context, children }: PropsWithChildren<DocsContainerProps>) {
  const [theme, setTheme] = useState(() => storedTheme(context))

  // Follow the toolbar when the theme changes. The message's own settings
  // aren't trusted: a story shown in its own frame on this page (inline:
  // false) starts its own Storybook, which announces the default theme when
  // it loads. So read the theme from this page's store instead.
  useEffect(() => {
    const onGlobals = () => setTheme(storedTheme(context))
    context.channel.on(GLOBALS_UPDATED, onGlobals)
    return () => context.channel.off(GLOBALS_UPDATED, onGlobals)
  }, [context])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const docsTheme = useMemo(() => verityTheme(isVerityThemeName(theme) ? theme : 'blue'), [theme])

  return (
    <DocsContainer context={context} theme={docsTheme}>
      {children}
    </DocsContainer>
  )
}
