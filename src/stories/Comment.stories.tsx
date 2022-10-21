import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../.storybook/stories.css';
import Button from '../components/button/Button';
import Comment from '../components/NewIssue/CommentBlock';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/Comment',
  component: Comment,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Comment>;
const Template: ComponentStory<typeof Comment> = (args) => (
  <div className='container'>
    <Comment />
  </div>
);

export const Primary = Template.bind({});
