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
  assignees: Assignee[];
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

export interface Assignee {
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

type query = {
  labels?: string;
  assignee?: string;
  sort?: string;
  filter?: string;
  state?: string;
  page?: string;
  token?: string | null;
};

type getListAssignees = {
  token?:string|null
}
export interface postbody {
  title: string;
  body: string;
  assignees: string[] | null;
  labels: string[] | null;
}
export interface postQuery {
  name: string;
  repo: string;
  title: string;
  body: postbody;
  token?: string | null;
}

const issueApi = labelApi.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query<Root[], query>({
      query: (query) => {
        return {
          url: `/LinHeMa/TEST/issues?&${query.labels}${query.assignee}${query.sort}${query.filter}${query.state}${query.page}`,
          headers: {
            Authorization: `Bearer ${query.token}`,
          },
          cache: 'no-cache',
        };
      },

      providesTags: ['Issues'],
    }),
    getListAssignees: build.query<User[], string>({
      query: (token) => {
        return {
          url: '/LinHeMa/TEST/assignees',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-cache',
        };
      },
      providesTags: ['Issues'],
    }),
    createIssue: build.mutation<postQuery, Partial<postQuery>>({
      query({ name, repo, body, token }) {
        return {
          url: `/${name}/${repo}/issues`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-cache',
          body,
        };
      },
      invalidatesTags: [{ type: 'Issues' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIssuesQuery,
  useGetListAssigneesQuery,
  useCreateIssueMutation,
} = issueApi;
