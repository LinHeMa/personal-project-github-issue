import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../.storybook/stories.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Emoji from '../components/NewIssue/Emoji';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/Emoji(s4)',
  component: Emoji,
  argTypes: {
    type: {
      options: [
        '+1',
        '-1',
        'laugh',
        'hooray',
        'confused',
        'heart',
        'rocket',
        'eyes',
      ],
      control: { type: 'radio' }, // Automatically inferred when 'options' is defined
    },
    number: {
      options: [3, 33, 333],
      control: { type: 'radio' },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Emoji>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Emoji> = (args) => (
  <Provider store={store}>
    <div className='flex items-center justify-center'>
      <div className='w-fit'>
        <Emoji {...args} />
      </div>
    </div>
  </Provider>
);

export const NotChosen = Template.bind({});
NotChosen.args = {
  type: '+1',
  number: 3,
};
