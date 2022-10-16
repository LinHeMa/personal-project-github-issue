import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../.storybook/stories.css';
import { Menu } from '../components/CreateIssue/CreateIssueView';
import LabelMenu from '../components/NewIssue/LabelMenu';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { fakeIssueData } from '../components/NewIssue/fakeData/getAnIssue';
import { LabelsList } from '../sevices/api/labelApi';
import AssigneeMenu from '../components/NewIssue/AssigneeMenu';
import { User } from '../sevices/api/issueApi';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/AssigneeMenu(s4)',
  component: AssigneeMenu,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AssigneeMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AssigneeMenu> = (args) => (
  <Provider store={store}>
    <div className='flex items-center justify-center'>
      <div className='w-[400px]'>
        <AssigneeMenu {...args} />
      </div>
    </div>
  </Provider>
);

export const NotChosen = Template.bind({});
NotChosen.args = { assignees: fakeIssueData.assignees as User[] };

export const HasChosen = Template.bind({});
HasChosen.args = {
  assignees: fakeIssueData.assignees as User[],
  clickedAssignees: [fakeIssueData.assignees[0]],
};
export const MultiChosen = Template.bind({});
MultiChosen.args = {
  assignees: fakeIssueData.assignees as User[],
  clickedAssignees: fakeIssueData.assignees,
};
