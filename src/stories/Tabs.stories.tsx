import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tabs from '../components/label/Tabs';
import React from 'react';
import { ThreeBarsIcon } from '@primer/octicons-react';

export default {
  title: 'GithubIssue/Tabs',
  component: Tabs
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  icon: <ThreeBarsIcon />,
  text: 'Three bars'
};
