import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MarkdownView from '../components/CreateIssue/MarkdownView';
import MarkdownItem from '../components/CreateIssue/MarkdownItem';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'GithubIssue/MarkdownView',
  component: MarkdownItem,
} as ComponentMeta<typeof MarkdownView>;

const Template: ComponentStory<typeof MarkdownView> = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <div className='flex flex-col p-8 pb-[200px] md:container md:mx-auto  md:flex-row'>
        <MarkdownView {...args} />
      </div>
    </Provider>
  </BrowserRouter>
);

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  hasInput: true,
};
