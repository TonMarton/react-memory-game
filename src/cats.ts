import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat } from './types';
import { shuffle } from './utils';

export const catsApi = createApi({
  reducerPath: 'catAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1/images',
  }),
  endpoints: (builder) => ({
    getCatImages: builder.query<Cat[], number>({
      query: (limit: number) => `search?limit=${limit}`,
      transformResponse: (cats: Array<{ url: string }>) =>
        shuffle(
          cats.flatMap((cat: { url: string }) => [
            { id: cat.url.concat('-0'), url: cat.url },
            { id: cat.url.concat('-1'), url: cat.url },
          ]),
        ),
    }),
  }),
});

export const { useGetCatImagesQuery } = catsApi;
