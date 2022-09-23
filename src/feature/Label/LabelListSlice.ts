import { createSelector } from '@reduxjs/toolkit';
import { LabelApiSlice } from '../../sevices/api/LabelApiSlice';

interface Labels {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
  title:string
}

export const extendedLabelApiSlice = LabelApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabelList: builder.query<Labels[], string>({
      query: (name) => `/repos/${name}/TEST/labels`,
      // transformResponse: (response: { data: Labels }, meta, arg) =>
      //   response.data,
      providesTags: ['labels']
    })
  })
});

export const { useGetLabelListQuery } = extendedLabelApiSlice;
