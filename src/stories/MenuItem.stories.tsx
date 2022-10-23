import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import { Menu } from '../components/CreateIssue/CreateIssueView';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/MenuItem',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = (args) => (
  <div className='container'>
    <ResetStyle />
    <GlobalStyle />
    <Provider store={store}>
      <Menu {...args} />
    </Provider>
  </div>
);

export const Primary = Template.bind({});
Primary.args = { source: { title: '標題', default: 'No one yet' } };
