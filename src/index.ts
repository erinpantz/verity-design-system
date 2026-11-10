// Verity's public entry point: everything a site can import from
// 'verity-design-system'. The styles are a separate file the site imports
// once, 'verity-design-system/styles.css' (see README.md). The library build
// starts from library.ts, which adds the global styles to that file.
//
// Storybook-only code isn't here: VerityDocs, PropsTable, the Foundations
// pages and their helpers, the sample images, stories, and docs pages.

// Actions
export { Button } from './components/Actions/Button';
export type { ButtonProps } from './components/Actions/Button';
export { IconButton } from './components/Actions/IconButton';
export type { IconButtonProps } from './components/Actions/IconButton';
export { Link } from './components/Actions/Link';
export type { LinkProps } from './components/Actions/Link';
export { ThemeToggle } from './components/Actions/ThemeToggle';
export { Tooltip } from './components/Actions/Tooltip';
export type { TooltipProps } from './components/Actions/Tooltip';

// Content blocks
export { CaseStudyHeader } from './components/ContentBlocks/CaseStudyHeader';
export type { CaseStudyHeaderProps, CaseStudyFact } from './components/ContentBlocks/CaseStudyHeader';
export { CaseStudyHighlights } from './components/ContentBlocks/CaseStudyHighlights';
export type { CaseStudyHighlightsProps } from './components/ContentBlocks/CaseStudyHighlights';
export { Hero } from './components/ContentBlocks/Hero';
export type { HeroProps, HeroAction } from './components/ContentBlocks/Hero';
export { MediaText } from './components/ContentBlocks/MediaText';
export type { MediaTextProps } from './components/ContentBlocks/MediaText';
export { PortfolioCard } from './components/ContentBlocks/PortfolioCard';
export type { PortfolioCardProps } from './components/ContentBlocks/PortfolioCard';
export { ProblemOpportunityBlock } from './components/ContentBlocks/ProblemOpportunityBlock';
export type { ProblemOpportunityBlockProps } from './components/ContentBlocks/ProblemOpportunityBlock';
export { Quote } from './components/ContentBlocks/Quote';
export type { QuoteProps } from './components/ContentBlocks/Quote';
export { StatCard } from './components/ContentBlocks/StatCard';
export type { StatCardProps } from './components/ContentBlocks/StatCard';

// Feedback and status
export { Badge } from './components/FeedbackAndStatus/Badge';
export type { BadgeProps } from './components/FeedbackAndStatus/Badge';
export { Skeleton } from './components/FeedbackAndStatus/Skeleton';
export type { SkeletonProps } from './components/FeedbackAndStatus/Skeleton';

// Layout
export { Container } from './components/Layout/Container';
export type { ContainerProps } from './components/Layout/Container';
export { Divider } from './components/Layout/Divider';
export { Footer } from './components/Layout/Footer';
export type { FooterProps } from './components/Layout/Footer';
export { Grid } from './components/Layout/Grid';
export type { GridProps } from './components/Layout/Grid';
export { HorizontalStack } from './components/Layout/HorizontalStack';
export type { HorizontalStackProps } from './components/Layout/HorizontalStack';
export { Section } from './components/Layout/Section';
export type { SectionProps } from './components/Layout/Section';
export { Shell } from './components/Layout/Shell';
export type { ShellProps } from './components/Layout/Shell';
export { VerticalStack } from './components/Layout/VerticalStack';
export type { VerticalStackProps } from './components/Layout/VerticalStack';

// Media
export { Animation } from './components/Media/Animation';
export type { AnimationProps } from './components/Media/Animation';
export { ErinTozourLogo } from './components/Media/ErinTozourLogo';
export { Gallery } from './components/Media/Gallery';
export type { GalleryProps } from './components/Media/Gallery';
export { Icon } from './components/Media/Icon';
export type { IconProps } from './components/Media/Icon';
export { Image } from './components/Media/Image';
export type { ImageProps } from './components/Media/Image';
export { MediaBlock } from './components/Media/MediaBlock';
export type { MediaBlockProps } from './components/Media/MediaBlock';
export { Video } from './components/Media/Video';
export type { VideoProps } from './components/Media/Video';

// Navigation
export { BackLink } from './components/Navigation/BackLink';
export type { BackLinkProps } from './components/Navigation/BackLink';
export { LinkGroup } from './components/Navigation/LinkGroup';
export type { LinkGroupProps } from './components/Navigation/LinkGroup';
export { MainNav } from './components/Navigation/MainNav';
export type { MainNavProps } from './components/Navigation/MainNav';
export { NavContainer } from './components/Navigation/NavContainer';
export type { NavContainerProps } from './components/Navigation/NavContainer';
export { NavItem } from './components/Navigation/NavItem';
export type { NavItemProps } from './components/Navigation/NavItem';
export { NavOverlay } from './components/Navigation/NavOverlay';
export type { NavOverlayProps } from './components/Navigation/NavOverlay';

// Text
export { Heading } from './components/Text/Heading';
export type { HeadingProps } from './components/Text/Heading';
export { MetaItem } from './components/Text/MetaItem';
export type { MetaItemProps } from './components/Text/MetaItem';
export { Prose } from './components/Text/Prose';
export type { ProseProps } from './components/Text/Prose';
export { TextBlock } from './components/Text/TextBlock';
export type { TextBlockProps } from './components/Text/TextBlock';
export { UnorderedList, UnorderedListItem } from './components/Text/UnorderedList';
export type { UnorderedListProps, UnorderedListItemProps } from './components/Text/UnorderedList';

// Icons: the names Icon and IconButton accept
export type { IconName } from './icons/icons.generated';

// Breakpoints, for behavior that changes with the screen width. For how things
// look, use the media queries in 'verity-design-system/breakpoints.module.css'.
export { useBreakpoint, type Breakpoint } from './styles/useBreakpoint';
export { BREAKPOINTS } from './styles/breakpoints.generated';

// Themes: the current theme, switching it, and the <head> script that applies
// the saved theme before the first paint
export { useTheme, setTheme, themeScript, type Theme } from './styles/theme';
