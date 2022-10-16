import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../.storybook/stories.css';
import Title from '../components/NewIssue/Title';
import { fakeIssueData } from '../components/NewIssue/fakeData/getAnIssue';

export default {
  title: 'GithubIssue/NewIssue(S4)',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
  <div className='container mx-auto'>
    <Title {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  ...fakeIssueData,
  labels: [
    {
      id: 4576400410,
      node_id: 'LA_kwDOIAxHds8AAAABEMZUGg',
      url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Apple%E2%9A%BD%EF%B8%8F',
      name: 'Apple⚽️',
      color: 'eda7b8',
      default: false,
      description: '蘋果',
    },
    {
      id: 4576401404,
      node_id: 'LA_kwDOIAxHds8AAAABEMZX_A',
      url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Banana%F0%9F%8E%BE',
      name: 'Banana🎾',
      color: 'C94A15',
      default: false,
      description: '',
    },
  ],
};
