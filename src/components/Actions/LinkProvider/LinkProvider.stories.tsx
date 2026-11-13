import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState, type ComponentProps, type MouseEvent } from 'react';
import { PortfolioCard } from '../../ContentBlocks/PortfolioCard';
import type { PageLoaderSection } from '../../FeedbackAndStatus/PageLoader';
import { Footer } from '../../Layout/Footer';
import { Section } from '../../Layout/Section';
import { Shell } from '../../Layout/Shell';
import { NavCard } from '../../Navigation/NavCard';
import { LinkGroup } from '../../Navigation/LinkGroup';
import { Prose } from '../../Text/Prose';
import { Button } from '../Button';
import { Link } from '../Link';
import { LinkProvider, type LinkComponent } from './LinkProvider';

const meta = {
  title: 'Actions/LinkProvider',
  component: LinkProvider,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, height: '44rem' } },
  },
} satisfies Meta<typeof LinkProvider>;

export default meta;

// The section an address is in: a case study is Portfolio
function sectionOf(href: string): PageLoaderSection {
  if (href.startsWith('/profile')) return 'profile';
  if (href.startsWith('/playground')) return 'playground';
  if (href.startsWith('/portfolio') || href.startsWith('/case-studies')) return 'portfolio';
  return 'home';
}

// The site, with a LinkProvider whose component stands in for a router: it
// logs each address that goes through it and changes the page in the story,
// instead of navigating. Links that stay plain <a>s are logged too, and not
// followed. Modifier clicks (Cmd or Ctrl, Shift, the middle button) are left
// to the browser, as a router's link does, so they still open a new tab.
// Story-only.
function Site() {
  const [log, setLog] = useState<string[]>([]);
  const [current, setCurrent] = useState<PageLoaderSection>('home');
  const [pending, setPending] = useState<PageLoaderSection>();
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const add = (line: string) => setLog((lines) => [line, ...lines].slice(0, 6));

  // Made once, so React keeps the same component between renders
  const [RouterLink] = useState<LinkComponent>(() => {
    function StoryRouterLink(props: ComponentProps<LinkComponent>) {
      return (
        <a
          {...props}
          data-story-router=""
          onClick={(event) => {
            props.onClick?.(event);
            const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
            if (event.defaultPrevented || modified) return;
            event.preventDefault();
            const href = props.href ?? '';
            window.dispatchEvent(new CustomEvent('story-route', { detail: href }));
          }}
        />
      );
    }
    return StoryRouterLink;
  });

  // The stand-in router: a page change that takes 300 ms
  useEffect(() => {
    const onRoute = (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      add(`Through LinkProvider: ${href}`);
      const section = sectionOf(href);
      clearTimeout(timer.current);
      setPending(section);
      timer.current = window.setTimeout(() => {
        setCurrent(section);
        setPending(undefined);
      }, 300);
    };
    window.addEventListener('story-route', onRoute);
    return () => window.removeEventListener('story-route', onRoute);
  }, []);

  // Plain links: logged, not followed (a plain click only)
  const onClickCapture = (event: MouseEvent) => {
    const link = (event.target as Element).closest('a[href]');
    if (!link || link.hasAttribute('data-story-router')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    add(`Plain <a>: ${link.getAttribute('href')}`);
  };

  return (
    <div onClickCapture={onClickCapture}>
      <LinkProvider component={RouterLink}>
        <Shell
          current={current === 'home' ? undefined : current}
          pending={pending}
          hrefs={{ home: '/', portfolio: '/portfolio', profile: '/profile', playground: '/playground' }}
          footer={
            <Footer
              callToAction={{
                heading: 'Let’s work together',
                text: 'Have a project in mind? Book a 30-minute call.',
                buttonLabel: 'Book a call',
                href: 'https://calendly.com/example/30min',
                opensInNewTab: true,
              }}
              linkGroups={
                <>
                  <LinkGroup label="Pages">
                    <Link href="/portfolio">Portfolio</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/resume.pdf">Resume</Link>
                  </LinkGroup>
                  <LinkGroup label="Connect">
                    <Link href="mailto:hello@example.com">Email</Link>
                    <Link href="https://www.linkedin.com/" opensInNewTab>
                      LinkedIn
                    </Link>
                  </LinkGroup>
                </>
              }
              copyrightName="Erin Tozour"
            />
          }
        >
          <Section heading="Links and routing" headingLevel={1}>
            <Prose>
              <p>
                Click any link. Links to the site’s own pages go through LinkProvider (here, logged and shown as a
                page change); everything else stays a plain link.
              </p>
            </Prose>
            <div
              aria-live="polite"
              style={{
                padding: 'var(--verity-padding-sm)',
                borderRadius: 'var(--verity-border-radius-md)',
                background: 'var(--verity-color-background-subtle)',
                fontFamily: 'var(--verity-typography-code-default-font-family)',
                minBlockSize: 'var(--verity-size-96)',
              }}
            >
              {log.length ? log.map((line, i) => <div key={`${i}-${line}`}>{line}</div>) : 'Nothing clicked yet'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--verity-spacing-md)' }}>
              <Button href="/profile">Meet Erin</Button>
              <Button variant="secondary" href="/resume.pdf">
                Resume (PDF)
              </Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', gap: 'var(--verity-spacing-md)' }}>
              <PortfolioCard href="/case-studies/care-notes" heading="Saving admin time" company="Care app" year="2025" />
              <NavCard page="profile" label="Profile" href="/profile" />
            </div>
          </Section>
        </Shell>
      </LinkProvider>
    </div>
  );
}

// Shell inside a LinkProvider: click a nav item, a card, a button, or the
// Footer's links, and the log says which went through it
export const Default: StoryObj = {
  render: () => <Site />,
};
