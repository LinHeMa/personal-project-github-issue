import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueItem from './IssueItem';

export default {
  title: 'GithubIssue/IssueListItem',
  component: IssueItem,
} as ComponentMeta<typeof IssueItem>;

const Template: ComponentStory<typeof IssueItem> = (args) => (
  <IssueItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  status: 'open',
};
export const Closed = Template.bind({});
Default.args = {
  status: 'closed',
};
