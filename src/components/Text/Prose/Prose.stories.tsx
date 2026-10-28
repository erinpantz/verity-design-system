import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '../../Layout/Container';
import { Prose } from './Prose';

// Each story writes plain HTML inside Prose, the same HTML that Markdown produces
const meta = {
  title: 'Text/Prose',
  component: Prose,
  args: {
    children: (
      <>
        <h2>Research and discovery</h2>
        <p>
          We started with the people who left. Twelve customers who stopped during setup talked us
          through where they got stuck, and four who finished told us what kept them going.
        </p>
        <p>
          The same moment came up again and again: the second step, which asked for a bank login with no
          explanation.
        </p>
        <h3>What people told us</h3>
        <p>Most people didn’t distrust the product. They distrusted the step.</p>
        <blockquote>
          <p>“I didn’t know why you needed it, so I closed the tab.”</p>
        </blockquote>
      </>
    ),
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lists: Story = {
  args: {
    children: (
      <>
        <p>We tested three changes to the second step:</p>
        <ul>
          <li>A sentence explaining why we ask for a bank login</li>
          <li>
            A “Skip for now” link, so people could finish setup and connect later, which turned out to be
            the change that mattered most
          </li>
          <li>The bank’s logo next to the login, so people knew where their details went</li>
        </ul>
        <p>Then we rolled them out in order:</p>
        <ol>
          <li>The explanation, to everyone</li>
          <li>The skip link, to half of new customers</li>
          <li>The logos, once the bank partners approved them</li>
        </ol>
      </>
    ),
  },
};

export const InlineCodeAndLinks: Story = {
  name: 'Inline code and links',
  args: {
    children: (
      <>
        <p>
          The flow logged a <code>setup_abandoned</code> event at each step, so we could see exactly where
          people left. The <a href="#research">research summary</a> has the full numbers.
        </p>
        <ul>
          <li>
            Step two’s error, <code>BANK_AUTH_TIMEOUT</code>, showed no next step
          </li>
          <li>
            Support’s <a href="#articles">help articles</a> covered it, but nobody found them
          </li>
        </ul>
      </>
    ),
  },
};

// A case study write-up in a Container, starting with its title
export const InContext: Story = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Container>
      <Prose>
        <h1>Redesigning the onboarding flow</h1>
        <p>
          Half of new customers left before they connected their first account. This is how we found out
          why, and what we changed.
        </p>
        <h2>The problem</h2>
        <p>
          Setup had five steps. The second asked for a bank login with no explanation, and that’s where
          most people stopped.
        </p>
        <blockquote>
          <p>“I didn’t know why you needed it, so I closed the tab.”</p>
        </blockquote>
        <h2>What we changed</h2>
        <ul>
          <li>Explained why we ask for a bank login, in one sentence</li>
          <li>Added a “Skip for now” link</li>
          <li>Showed the bank’s logo next to the login</li>
        </ul>
        <h3>The results</h3>
        <p>
          Three in four new customers finished setup, up from one in two, and setup tickets dropped by 60
          percent.
        </p>
      </Prose>
    </Container>
  ),
};
