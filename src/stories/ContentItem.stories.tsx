import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import ContentItem from '../components/LabelContent/ContentItem';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

export default {
  title: 'GithubIssue/ContentItem',
  component: ContentItem,
} as ComponentMeta<typeof ContentItem>;

const Template: ComponentStory<typeof ContentItem> = (args) => (
  <Provider store={store}>
    <div className='mt-8 container'>
      <ResetStyle />
      <GlobalStyle />
      <ContentItem {...args} />
    </div>
  </Provider>
);

export const DefaultContentItem = Template.bind({});
DefaultContentItem.args = {
  id: 1,
  url: 'www.google.com',
  name: 'Label',
  color: '#ccceee',
  description: 'description',
};
