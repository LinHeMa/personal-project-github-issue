import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../.storybook/stories.css';
import LabelMenu from '../components/NewIssue/LabelMenu';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { fakeIssueData } from '../components/NewIssue/fakeData/getAnIssue';
import { LabelsList } from '../sevices/api/labelApi';

const apple = {
  id: 4576400410,
  node_id: 'LA_kwDOIAxHds8AAAABEMZUGg',
  url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Apple%E2%9A%BD%EF%B8%8F',
  name: 'Apple⚽️',
  color: 'eda7b8',
  default: false,
  description: '蘋果',
};

const banana = {
  id: 4576401404,
  node_id: 'LA_kwDOIAxHds8AAAABEMZX_A',
  url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Banana%F0%9F%8E%BE',
  name: 'Banana🎾',
  color: 'C94A15',
  default: false,
  description: '',
};

const cake = {
  id: 4586116941,
  node_id: 'LA_kwDOIAxHds8AAAABEVqXTQ',
  url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Cake',
  name: 'Cake',
  color: 'BFDADC',
  default: false,
  description: '蛋糕的意思',
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/LabelMenu(s4)',
  component: LabelMenu,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LabelMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LabelMenu> = (args) => (
  <Provider store={store}>
    <div className='flex items-center justify-center'>
      <div className='w-[300px]'>
        <LabelMenu {...args} />
      </div>
    </div>
  </Provider>
);

export const NotChosen = Template.bind({});
NotChosen.args = {
  labels: fakeIssueData.labels as LabelsList[],
};
export const HasChosen = Template.bind({});
HasChosen.args = {
  labels: fakeIssueData.labels as LabelsList[],
  clickedLabelsArray: [cake],
};
export const MultiChosen = Template.bind({});
MultiChosen.args = {
  labels: fakeIssueData.labels as LabelsList[],

  clickedLabelsArray: [apple, banana, cake],
};
