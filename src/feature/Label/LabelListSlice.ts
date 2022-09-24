import { createSelector } from '@reduxjs/toolkit';
import { LabelApiSlice } from '../../sevices/api/LabelApiSlice';
import _ from 'lodash';
import { env } from 'process';

type LabelsList = {
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
type QueryParams = {
  name: string;
  repo: string;
  lableName?: string;
  updateBody?: updateBody;
};

function checkLight(bgcolor: string) {
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

function addLightOrDark(data: LabelsList[]) {
  const result = data.map((item) => {
    const isLight = checkLight(item.color);
    return { ...item, isLight: isLight };
  });
  return result;
}

export const extendedLabelApiSlice = LabelApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabelList: builder.query<LabelsList[], QueryParams>({
      query: ({ name, repo }) => `/${name}/${repo}/labels`,
      transformResponse: (response: LabelsList[]) => addLightOrDark(response),
      providesTags: ['labels']
    }),
    updateLabelList: builder.mutation<LabelsList, QueryParams>({
      query: ({ name, repo, lableName, updateBody }) => ({
        url: `/${name}/${repo}/labels/${lableName}`,
        method: 'PATCH',
        headers: {
          accept: 'application/vnd.github+json',
          Authorization: `Bearer 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`
        },
        body: updateBody
      }),
      invalidatesTags: ['labels']
    })
  })
});

export const { useGetLabelListQuery, useUpdateLabelListMutation } =
  extendedLabelApiSlice;
