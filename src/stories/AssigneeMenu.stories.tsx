import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import AssigneeMenu from '../components/IssuePage/AssigneeMenu';
import { fakeIssueData } from '../components/IssuePage/fakeData/getAnIssue';
import { User } from '../sevices/api/issueApi';

export default {
  title: 'GithubIssue/AssigneeMenu(s4)',
  component: AssigneeMenu,
  argTypes: {
    assignees: {
      table: {
        disable: true,
      },
    },
    clickedAssignees: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof AssigneeMenu>;

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
