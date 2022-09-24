import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LabelApiSlice = createApi({
  // reducerPath: 'LabelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos' }),
  tagTypes: ['labels','issue'],
  endpoints: (builder) => ({})
});
