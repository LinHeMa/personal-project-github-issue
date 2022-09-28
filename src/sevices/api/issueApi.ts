import { labelApi } from './labelApi';

export interface Root {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee: null | string;
  assignees: string[];
  milestone: null | string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  active_lock_reason: string;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: string | null;
  state_reason: string;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

const extendedApi = labelApi.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query<Root[], string>({
      query: () => '/LinHeMa/TEST/issues',
      providesTags: ['Issues']
    })
  }),
  overrideExisting: false
});

export const { useGetIssuesQuery } = extendedApi;
