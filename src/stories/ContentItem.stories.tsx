import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContentItem from '../components/labelContent/ContentItem';
import '../../.storybook/stories.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export default {
  title: 'GithubIssue/ContentItem',
  component: ContentItem
} as ComponentMeta<typeof ContentItem>;

const Template: ComponentStory<typeof ContentItem> = (args) => (
  <Provider store={store}>
    <ContentItem {...args} />
  </Provider>
);

export const DefaultContentItem = Template.bind({});
DefaultContentItem.args = {
  id: 1,
  url: 'www.google.com',
  name: 'Label',
  color: '#ccceee',
  description: 'description'
};
