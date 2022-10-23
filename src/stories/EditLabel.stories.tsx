import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import EditLabel from '../components/LabelContent/EditLabel';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

export default {
  title: 'GithubIssue/EditLabel',
  component: EditLabel,
} as ComponentMeta<typeof EditLabel>;

const Template: ComponentStory<typeof EditLabel> = (args) => (
  <Provider store={store}>
    <div className='container mt-8'>
      <ResetStyle />
      <GlobalStyle />
      <EditLabel {...args} />
    </div>
  </Provider>
);

export const DefaultEditLabel = Template.bind({});
DefaultEditLabel.args = {
  color: 'white',
  isLight: false,
};
