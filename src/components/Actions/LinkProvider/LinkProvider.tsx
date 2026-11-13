import { createContext, createElement, useContext, type AnchorHTMLAttributes, type ComponentType, type ReactNode, type Ref } from 'react';
import { isSitePage } from './isSitePage';

/**
 * What LinkProvider takes: a component that renders a link with the same
 * props as an `<a>`, `href` included, and a ref to the `<a>` it renders.
 * For React Router, a few lines that pass `href` on as `to`.
 */
export type LinkComponent = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { ref?: Ref<HTMLAnchorElement> }>;

const LinkContext = createContext<LinkComponent | null>(null);

export interface LinkProviderProps {
  /**
   * The component Verity renders links to the site’s own pages with, like a
   * router’s link. It must render a real `<a href>`.
   */
  component: LinkComponent;
  /** The site, or the part of it whose links go through `component` */
  children: ReactNode;
}

// Lets a site's router handle Verity's links to its own pages, so following
// one changes the page in the app instead of reloading it, and the site sees
// the change coming (Shell's pending and PageLoader). Without it, every link
// is a plain <a>.
export function LinkProvider({ component, children }: LinkProviderProps) {
  return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>;
}

type LinkAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { ref?: Ref<HTMLAnchorElement> };

// Every Verity link renders through this, so the rule lives in one place: a
// link to one of the site's pages goes through LinkProvider's component, if
// there is one; anything else is a plain <a>, with exactly the same props.
// Not exported from the library.
export function LinkAnchor(props: LinkAnchorProps) {
  const Component = useContext(LinkContext);
  // createElement, not <Component />: the component comes from the site,
  // through the context, and isn't made here
  if (Component && isSitePage(props.href, props.target, props.download)) return createElement(Component, props);
  return <a {...props} />;
}
