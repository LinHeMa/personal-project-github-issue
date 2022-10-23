import { ComponentMeta, ComponentStory } from '@storybook/react';

import Footer from '../components/Footer/Footer';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

export default {
  title: 'GithubIssue/Footer',
  component: Footer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => (
  <div className='container'>
    <ResetStyle />
    <GlobalStyle />
    <Footer />
  </div>
);

export const DefaultFooter = Template.bind({});
DefaultFooter.args = {
  name: 'fasdf',
};
