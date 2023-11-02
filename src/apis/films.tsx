import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from '@/utils/pause';


const filmApi = createApi({
          reducerPath: 'film',
          tagTypes: ['Film'],
          baseQuery: fetchBaseQuery({
              baseUrl: "http://45.95.173.37:6500/api",
              fetchFn: async (...args) => {
                  await pause(1000);
                  return fetch(...args);
              }
          }),
          endpoints: (builder) => ({
              getFilms: builder.query({
                  query: () => `/v1/film/client`,
                  providesTags: ['Film']
              }),
              getFilmsById: builder.query({
                  query: (id) => `/v1/film/${id}/client`,
                  providesTags: ['Film']
              }),
              getFilmComing: builder.query({
                  query: () => `/v1/film/client?page=1&limit=10&order=DESC&orderBy=createdAt&isRelease=false`,
                  providesTags: ['Film']
              }),
              getFilmIsShowing: builder.query({
                  query: () => `/v1/film/client?page=1&limit=10&order=DESC&orderBy=createdAt&isRelease=true`,
                  providesTags: ['Film']
              })
             
          })
      });
      
      export const {
          useGetFilmsQuery,
          useGetFilmsByIdQuery,
          useGetFilmComingQuery,
          useGetFilmIsShowingQuery

      } = filmApi;
      export const filmReducer = filmApi.reducer;
      export default filmApi;
