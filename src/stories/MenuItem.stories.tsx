import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../.storybook/stories.css';
import { Menu } from '../components/CreateIssue/CreateIssueView';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/CreateIssueView',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
Primary.args = { source: { title: 'title', default: 'No one yet' } };
