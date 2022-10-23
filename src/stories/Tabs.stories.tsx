import { ThreeBarsIcon } from '@primer/octicons-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tabs from '../components/Label/Tabs';

export default {
  title: 'GithubIssue/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <div className='container flex w-full justify-center'>
    <Tabs {...args} />
  </div>
);

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  icon: <ThreeBarsIcon />,
  text: 'Primary',
};
