import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../.storybook/stories.css';
import SearchBar from '../components/Header/SearchBar';

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
