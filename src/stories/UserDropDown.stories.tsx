import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserDropDown, { dropDownMenu } from '../components/Header/UserDropDown';

export default {
  title: 'GithubIssue/UserDropDown',
  component: UserDropDown,
} as ComponentMeta<typeof UserDropDown>;

const Template: ComponentStory<typeof UserDropDown> = (args) => (
  <div className='container flex w-full justify-center'>
    <UserDropDown {...args} />
  </div>
);

export const DefaultUserDropDown = Template.bind({});
DefaultUserDropDown.args = {
  dropDownMenu: dropDownMenu,
};
