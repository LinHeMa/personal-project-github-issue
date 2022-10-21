import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label from '../components/label/Label';

export default {
  title: 'GithubIssue/Label',
  component: Label
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  borderColor: 'transparent',
  color: 'white',
  bgColor: '#eeeccc',
  fontSize: '12px',
  fontWeight: '500',
  isLight: false,
  text: 'Label Preview'
};
