import { CodeIcon } from '@primer/octicons-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../.storybook/stories.css';
import DoubleButton from '../components/Button/DoubleButton';

export default {
  title: 'GithubIssue/DoubleButton',
  component: DoubleButton
} as ComponentMeta<typeof DoubleButton>;

const Template: ComponentStory<typeof DoubleButton> = (args) => (
  <DoubleButton {...args} />
);

export const DefaultDoubleButton = Template.bind({});
DefaultDoubleButton.args = {
  icon: <CodeIcon />,
  text: 'code',
  number: 2,
  hasDropDown: false
};
