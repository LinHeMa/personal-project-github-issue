import { ArrowRightIcon, GearIcon } from '@primer/octicons-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../.storybook/stories.css';
import BiFunctionButton from '../components/Button/BiFunctionButton';

export default {
  title: 'GithubIssue/BiFunctionButton',
  component: BiFunctionButton,
} as ComponentMeta<typeof BiFunctionButton>;

const Template: ComponentStory<typeof BiFunctionButton> = (args) => (
  <div className='flex w-full items-center justify-center'>
    <BiFunctionButton {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  textLeft: 'Left Btn',
  numberLeft: 10,
  iconLeft: <GearIcon />,
  textRight: 'Right Btn',
  iconRight: <ArrowRightIcon />,
  numberRight: 99,
};
