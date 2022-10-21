import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserDropDown, { dropDownMenu } from '../components/UserDropDown';

const style = {
  width: '100px'
};

export default {
  title: 'GithubIssue/UserDropDown',
  component: UserDropDown
} as ComponentMeta<typeof UserDropDown>;

const Template: ComponentStory<typeof UserDropDown> = (args) => (
  <UserDropDown {...args} />
);

export const DefaultUserDropDown = Template.bind({});
DefaultUserDropDown.args = {
  dropDownMenu: dropDownMenu
};
