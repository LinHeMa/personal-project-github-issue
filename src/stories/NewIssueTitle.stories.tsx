import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import { fakeIssueData } from '../components/IssuePage/fakeData/getAnIssue';
import Title from '../components/IssuePage/Title';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

export default {
  title: 'GithubIssue/NewIssue',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <div className='container mx-auto'>
        <Title {...args} />
      </div>
    </BrowserRouter>
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  ...fakeIssueData,
  labels: [
    {
      id: 4576400410,
      node_id: 'LA_kwDOIAxHds8AAAABEMZUGg',
      url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Apple%E2%9A%BD%EF%B8%8F',
      name: 'Apple⚽️',
      color: 'eda7b8',
      default: false,
      description: '蘋果',
    },
    {
      id: 4576401404,
      node_id: 'LA_kwDOIAxHds8AAAABEMZX_A',
      url: 'https://api.github.com/repos/LinHeMa/TEST/labels/Banana%F0%9F%8E%BE',
      name: 'Banana🎾',
      color: 'C94A15',
      default: false,
      description: '',
    },
  ],
};
