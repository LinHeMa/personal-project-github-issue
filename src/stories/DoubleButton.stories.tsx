import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DoubleButton from '../components/button/DoubleButton';
import { CodeIcon } from '@primer/octicons-react';
import '../../.storybook/stories.css';

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
