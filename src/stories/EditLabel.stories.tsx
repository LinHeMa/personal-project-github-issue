import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditLabel from '../components/labelContent/EditLabel';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../../.storybook/stories.css';

export default {
  title: 'GithubIssue/Label',
  component: EditLabel
} as ComponentMeta<typeof EditLabel>;

const Template: ComponentStory<typeof EditLabel> = (args) => (
  <Provider store={store}>
    <div>
      <EditLabel {...args} />
    </div>
  </Provider>
);

export const DefaultEditLabel = Template.bind({});
DefaultEditLabel.args = {
  color: 'white',
  isLight: false
};
