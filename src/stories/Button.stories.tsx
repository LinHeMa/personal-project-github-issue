import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../.storybook/stories.css';
import Button from '../components/Button/Button';

export default {
  title: 'GithubIssue/Button',
  component: Button,
  argTypes: {
    bgColor: {
      options: ['pink', 'White', 'skyBlue'],
      control: 'radio',
    },
    popup: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div className='flex w-full items-center justify-center'>
    <Button {...args} />
  </div>
);



export const Primary = Template.bind({});
Primary.args = {
  text: 'Button Preview',
  number: 10,
  hasDropDown: false,
  bgColor: '#f6f8fa',
  color: '#000000',
  hoverBgColor: '#f3f4f6',
  fontSize: '14px',
};
