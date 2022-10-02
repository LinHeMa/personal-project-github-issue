import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../components/Header';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export default {
  title: 'GithubIssue/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Provider store={store}>
    <Header {...args} />
  </Provider>
);

export const LoggedIn = Template.bind({});
