import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FunctionBar from '../components/labelContent/FunctionBar';

const style = {
  width: '100px'
};

export default {
  title: 'GithubIssue/FunctionBar',
  component: FunctionBar
} as ComponentMeta<typeof FunctionBar>;

const Template: ComponentStory<typeof FunctionBar> = () => <FunctionBar />;

export const DefaultFunctionBar = Template.bind({});
DefaultFunctionBar.args = {};
