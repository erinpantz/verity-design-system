import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalStack } from '../../Layout/VerticalStack';
import { Heading } from '../Heading';
import { UnorderedList, UnorderedListItem } from './UnorderedList';

const meta = {
  title: 'Text/UnorderedList',
  component: UnorderedList,
  args: {
    children: (
      <>
        <UnorderedListItem>Interviewed 12 customers who left during setup</UnorderedListItem>
        <UnorderedListItem>Mapped every step of the setup flow</UnorderedListItem>
        <UnorderedListItem>Tested three new designs with 30 people</UnorderedListItem>
      </>
    ),
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof UnorderedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitles: Story = {
  name: 'With titles',
  args: {
    children: (
      <>
        <UnorderedListItem title="Interviews">
          Talked with 12 customers who left during setup.
        </UnorderedListItem>
        <UnorderedListItem title="Journey map">Mapped every step of the setup flow.</UnorderedListItem>
        <UnorderedListItem title="Usability tests">
          Tested three new designs with 30 people.
        </UnorderedListItem>
      </>
    ),
  },
};

export const TextSizeBodyLg: Story = {
  name: 'Text size body-lg',
  args: {
    children: (
      <>
        <UnorderedListItem textSize="body-lg">Interviewed 12 customers who left during setup</UnorderedListItem>
        <UnorderedListItem textSize="body-lg">Mapped every step of the setup flow</UnorderedListItem>
        <UnorderedListItem textSize="body-lg">Tested three new designs with 30 people</UnorderedListItem>
      </>
    ),
  },
};

// Text that wraps, so you can see the marker stays on the first line
export const LongItems: Story = {
  name: 'Long items',
  args: {
    children: (
      <>
        <UnorderedListItem>
          Interviewed 12 customers who left during setup, and four who finished it, to learn where people
          got stuck and what kept the others going.
        </UnorderedListItem>
        <UnorderedListItem title="Journey map">
          Mapped every step of the setup flow, including the emails and support articles people read along
          the way, and marked where each interview’s pain points fell.
        </UnorderedListItem>
      </>
    ),
  },
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <VerticalStack gap="sm">
      <Heading level={3}>What we learned</Heading>
      <UnorderedList>
        <UnorderedListItem title="People didn’t know why we asked">
          The second step asked for a bank login with no explanation, so many people stopped there.
        </UnorderedListItem>
        <UnorderedListItem title="Errors sent people to support">
          A failed connection showed a code but no next step.
        </UnorderedListItem>
        <UnorderedListItem title="Finishing felt like nothing">
          There was no sign that setup was done, so people weren’t sure they could start.
        </UnorderedListItem>
      </UnorderedList>
    </VerticalStack>
  ),
};
