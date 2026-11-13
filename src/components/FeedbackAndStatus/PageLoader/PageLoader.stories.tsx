import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Button } from '../../Actions/Button';
import { Footer } from '../../Layout/Footer';
import type { FooterProps } from '../../Layout/Footer/Footer';
import FooterStories from '../../Layout/Footer/Footer.stories';
import { Section } from '../../Layout/Section';
import { Shell } from '../../Layout/Shell';
import { ReducedMotionOverride } from '../../Media/Playback/useReducedMotion';
import { Prose } from '../../Text/Prose';
import { PageLoader, type PageLoaderSection } from './PageLoader';
import { forgetVisits } from './visits';

// Each section's words, as the site might write them: plain lines, no
// ellipsis. Story-only.
const WORDS: Record<PageLoaderSection, string[]> = {
  portfolio: ['Shuffling the deck', 'Framing the shots', 'Lining up the boxes', 'Polishing the pixels'],
  profile: ['Fixing my bun', 'Tilting my head', 'Finding my glasses', 'Trimming my bangs'],
  playground: ['Balancing the boxes', 'Tipping the seesaw', 'Finding the middle', 'Stacking blocks'],
  home: ['Warming up', 'Turning the e', 'Setting the stage', 'Opening the doors'],
};

const SECTIONS: PageLoaderSection[] = ['home', 'portfolio', 'profile', 'playground'];
const NAMES: Record<PageLoaderSection, string> = {
  home: 'Home',
  portfolio: 'Portfolio',
  profile: 'Profile',
  playground: 'Playground',
};

const meta = {
  title: 'Feedback and status/PageLoader',
  component: PageLoader,
  args: { words: WORDS },
  argTypes: {
    pending: { control: 'inline-radio', options: [undefined, ...SECTIONS] },
    current: { control: false },
    words: { control: 'object' },
  },
  parameters: {
    layout: 'fullscreen',
    // On the docs page, each example gets its own frame: the loader covers the screen
    docs: { story: { inline: false, height: '32rem' } },
  },
} satisfies Meta<typeof PageLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

// Held open: a page change to Portfolio that never finishes, so the loader
// stays. Pick another section under Controls. It shows at once the first
// time, and after the delay once visited; its motion stops after 5 seconds.
export const Default: Story = {
  args: { pending: 'portfolio' },
};

// The site: click the logo or a nav link, and pick how long the page change
// takes. The first visit to each section in this tab always shows its
// loader, for 1.6 seconds; after that, only a slow change does, from 400 ms.
// “Forget visits” makes every section a first visit again. Story-only.
function Site() {
  const [current, setCurrent] = useState<PageLoaderSection>('home');
  const [pending, setPending] = useState<PageLoaderSection>();
  const [takes, setTakes] = useState(80);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  // A link to a section starts a page change to it, which takes `takes` ms
  const onClickCapture = (event: MouseEvent) => {
    const link = (event.target as Element).closest('a[href^="#"]');
    const section = link?.getAttribute('href')?.slice(1) as PageLoaderSection | undefined;
    if (!section || !SECTIONS.includes(section)) return;
    event.preventDefault();
    clearTimeout(timer.current);
    setPending(section);
    timer.current = window.setTimeout(() => {
      setCurrent(section);
      setPending(undefined);
    }, takes);
  };

  const speeds = [
    { label: 'Fast', ms: 80 },
    { label: '300 ms', ms: 300 },
    { label: '1.5 s', ms: 1500 },
    { label: '4 s', ms: 4000 },
  ];

  return (
    <div onClickCapture={onClickCapture}>
      <Shell
        current={current === 'home' ? undefined : current}
        pending={pending}
        loaderWords={WORDS}
        hrefs={{ home: '#home', portfolio: '#portfolio', profile: '#profile', playground: '#playground' }}
        footer={<Footer {...(FooterStories.args as FooterProps)} />}
      >
        <Section heading={NAMES[current]} headingLevel={1}>
          <Prose>
            <p>Click the logo or a link in the nav. A page change takes:</p>
          </Prose>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--verity-spacing-xs)' }}>
            {speeds.map(({ label, ms }) => (
              <Button key={ms} variant={takes === ms ? 'primary' : 'secondary'} onClick={() => setTakes(ms)}>
                {label}
              </Button>
            ))}
          </div>
          <div>
            <Button variant="secondary" onClick={forgetVisits}>
              Forget visits
            </Button>
          </div>
        </Section>
      </Shell>
    </div>
  );
}

export const InTheSite: Story = {
  name: 'In the site',
  render: () => <Site />,
  parameters: { docs: { story: { inline: false, height: '40rem' } } },
};

// With reduce motion on, whatever the computer is set to: every visit waits
// for the delay, so only a slow page change shows it, with one still pose
// and one word. Pick 1.5 s or 4 s to see it.
export const ReduceMotion: Story = {
  name: 'Reduce motion',
  render: () => (
    <ReducedMotionOverride.Provider value={true}>
      <Site />
    </ReducedMotionOverride.Provider>
  ),
  parameters: { docs: { story: { inline: false, height: '40rem' } } },
};
