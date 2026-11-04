import type { Meta, StoryObj } from '@storybook/react-vite';
import landscape from '../../../foundations/sample-images/landscape.jpg';
import screenshot from '../../../foundations/sample-images/screenshot.png';
import shapes from '../../../foundations/sample-images/shapes.jpg';
import { Section } from '../../Layout/Section';
import { Image } from '../Image';
import { MediaBlock } from '../MediaBlock';
import { Gallery } from './Gallery';

const meta = {
  title: 'Media/Gallery',
  component: Gallery,
  args: {
    layout: '2+1',
    children: (
      <>
        <MediaBlock caption="Early sketches of the new step 2.">
          <Image src={shapes} alt="Abstract shapes from an early sketch" aspectRatio="3:2" />
        </MediaBlock>
        <MediaBlock caption="A mood board for the onboarding illustrations.">
          <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" aspectRatio="3:2" />
        </MediaBlock>
        <MediaBlock caption="The final design of step 2, with the explanation added.">
          <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
        </MediaBlock>
      </>
    ),
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['2+1'] },
    children: { control: false },
  },
} satisfies Meta<typeof Gallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCaptions: Story = {
  name: 'Without captions',
  args: {
    children: (
      <>
        <MediaBlock>
          <Image src={shapes} alt="Abstract shapes from an early sketch" aspectRatio="3:2" />
        </MediaBlock>
        <MediaBlock>
          <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" aspectRatio="3:2" />
        </MediaBlock>
        <MediaBlock>
          <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
        </MediaBlock>
      </>
    ),
  },
};

export const InContext: StoryObj = {
  name: 'In context',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Section heading="Exploring the design" intro="From first sketches to the final screen." width="wide">
      <Gallery>
        <MediaBlock caption="Early sketches of the new step 2.">
          <Image src={shapes} alt="Abstract shapes from an early sketch" aspectRatio="3:2" />
        </MediaBlock>
        <MediaBlock caption="A mood board for the onboarding illustrations.">
          <Image src={landscape} alt="Hills at dusk, with the sun setting behind them" aspectRatio="3:2" />
        </MediaBlock>
        <MediaBlock caption="The final design of step 2, with the explanation added.">
          <Image src={screenshot} alt="The setup screen, on step 2 of 5: Connect your bank" />
        </MediaBlock>
      </Gallery>
    </Section>
  ),
};
