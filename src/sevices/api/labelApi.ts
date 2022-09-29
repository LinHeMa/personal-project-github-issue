import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/client';

export type LabelsList = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
  title: string;
  isLight?: boolean;
};

interface updateBody {
  new_name?: string;
  color?: string;
  description?: string;
}

type postBody = {
  name: string;
  color?: string;
  description?: string;
};

type QueryParams = {
  name: string;
  repo: string;
  lableName?: string;
  updateBody?: updateBody;
  postBody?: postBody;
  id?: number | string;
};

export function checkLight(bgcolor: string) {
  const r = parseInt(bgcolor.slice(0, 2), 16);
  const g = parseInt(bgcolor.slice(2, 4), 16);
  const b = parseInt(bgcolor.slice(4, 6), 16);
  const hsp = r * 0.3 + g * 0.6 + b * 0.1;
  if (hsp > 127.5) {
    return false;
  } else {
    return true;
  }
}

export function addLightOrDark(data: LabelsList[]) {
  const result = data.map((item) => {
    const isLight = checkLight(item.color);
    return { ...item, isLight: isLight };
  });
  return result;
}

const session = supabase.auth.session();

export const labelApi = createApi({
  reducerPath: 'labelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/repos',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${session?.provider_token}`);
      return headers;
    }
  }),
  tagTypes: ['Labels','Issues'],
  endpoints: (build) => ({
    getLabelList: build.query<LabelsList[], QueryParams>({
      query: ({ name, repo }) => `/${name}/${repo}/labels`,
      providesTags: ['Labels'],
      transformResponse: (response: LabelsList[]) => addLightOrDark(response)
    }),
    addLabelList: build.mutation<LabelsList, QueryParams>({
      query: ({ name, repo, postBody }) => ({
        url: `/${name}/${repo}/labels`,
        method: 'POST',
        body: postBody
      }),
      invalidatesTags: ['Labels']
    }),
    updateLabelList: build.mutation<LabelsList, QueryParams>({
      query: ({ name, repo, lableName, updateBody }) => ({
        url: `/${name}/${repo}/labels/${lableName}`,
        method: 'PATCH',
        body: updateBody
      }),
      invalidatesTags: ['Labels']
    }),
    deleteLabelList: build.mutation<LabelsList, QueryParams>({
      query: ({ name, repo, lableName }) => ({
        url: `/${name}/${repo}/labels/${lableName}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Labels'],  
    })
  })
});

export const {
  useGetLabelListQuery,
  useAddLabelListMutation,
  useUpdateLabelListMutation,
  useDeleteLabelListMutation
} = labelApi;
