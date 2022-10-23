import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import '../../.storybook/stories.css';
import { store } from '../app/store';
import Comment from '../components/IssuePage/CommentBlock';
import { GlobalStyle, ResetStyle } from '../utils/style/globalStyle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'GithubIssue/Comment',
  component: Comment,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Comment>;
const Template: ComponentStory<typeof Comment> = (args) => (
  <div className='container'>
    <Provider store={store}>
      <ResetStyle />
      <GlobalStyle />
      <Comment {...args} />
    </Provider>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  url: 'https://api.github.com/repos/LinHeMa/TEST/issues/comments/1285570603',
  html_url: 'https://github.com/LinHeMa/TEST/issues/86#issuecomment-1285570603',
  issue_url: 'https://api.github.com/repos/LinHeMa/TEST/issues/86',
  id: 1285570603,
  node_id: 'IC_kwDOIAxHds5MoEAr',
  user: {
    login: 'LinHeMa',
    id: 109965534,
    node_id: 'U_kgDOBo3w3g',
    avatar_url: 'https://avatars.githubusercontent.com/u/109965534?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/LinHeMa',
    html_url: 'https://github.com/LinHeMa',
    followers_url: 'https://api.github.com/users/LinHeMa/followers',
    following_url:
      'https://api.github.com/users/LinHeMa/following{/other_user}',
    gists_url: 'https://api.github.com/users/LinHeMa/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/LinHeMa/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/LinHeMa/subscriptions',
    organizations_url: 'https://api.github.com/users/LinHeMa/orgs',
    repos_url: 'https://api.github.com/users/LinHeMa/repos',
    events_url: 'https://api.github.com/users/LinHeMa/events{/privacy}',
    received_events_url: 'https://api.github.com/users/LinHeMa/received_events',
    type: 'User',
    site_admin: false,
  },
  created_at: '2022-10-20T13:45:10Z',
  updated_at: '2022-10-20T13:45:10Z',
  author_association: 'OWNER',
  body: '**one comments**',
  reactions: {
    url: 'https://api.github.com/repos/LinHeMa/TEST/issues/comments/1285570603/reactions',
    total_count: 0,
    '+1': 0,
    '-1': 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
};
