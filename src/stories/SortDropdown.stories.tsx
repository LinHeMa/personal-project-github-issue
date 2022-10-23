import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import SortDropdown from '../components/LabelContent/SortDropdown';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';
export default {
  title: 'GithubIssue/SortDropdown',
  component: SortDropdown,
} as ComponentMeta<typeof SortDropdown>;

const Template: ComponentStory<typeof SortDropdown> = () => (
  <Provider store={store}>
    <div className='flex justify-center container'>
      <ResetStyle />
      <GlobalStyle />
     <span className='relative '> <SortDropdown /></span>
    </div>
  </Provider>
);

export const DefaultSortDropdown = Template.bind({});
