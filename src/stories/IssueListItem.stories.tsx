import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';
import IssueItem from './IssueItem';

export default {
  title: 'GithubIssue/IssueListItem',
  component: IssueItem,
  argTypes: {
    status: {
      options: ['open', 'closed', 'notPlaned'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof IssueItem>;

const Template: ComponentStory<typeof IssueItem> = (args) => (
  <div className='container'>
    <ResetStyle />
    <GlobalStyle />
    <IssueItem {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  status: 'open',
};

