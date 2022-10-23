import { ComponentMeta, ComponentStory } from '@storybook/react';
import FunctionBar from '../components/LabelContent/FunctionBar';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

export default {
  title: 'GithubIssue/FunctionBar',
  component: FunctionBar,
} as ComponentMeta<typeof FunctionBar>;

const Template: ComponentStory<typeof FunctionBar> = () => (
  <div>
    <ResetStyle />
    <GlobalStyle />
    <FunctionBar />
  </div>
);

export const DefaultFunctionBar = Template.bind({});
DefaultFunctionBar.args = {};
