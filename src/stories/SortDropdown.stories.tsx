import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SortDropdown from '../components/labelContent/SortDropdown';
import '../../.storybook/stories.css';

export default {
  title: 'GithubIssue/SortDropdown',
  component: SortDropdown
} as ComponentMeta<typeof SortDropdown>;

const Template: ComponentStory<typeof SortDropdown> = () => <SortDropdown />;

export const DefaultSortDropdown = Template.bind({});
