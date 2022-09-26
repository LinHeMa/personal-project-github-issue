import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchBar from '../components/SearchBar';
import '../../.storybook/stories.css';

export default {
  title: 'GithubIssue/SearchBar',
  component: SearchBar
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = () => (
  <div
    style={{ width: '200px', backgroundColor: 'black', borderRadius: '6px' }}
  >
    <SearchBar />
  </div>
);

export const DefaultSearchBar = Template.bind({});
DefaultSearchBar.args = {};
