import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from '@/utils/pause';


const showtimeApi = createApi({
          reducerPath: 'showtime',
          tagTypes: ['Showtime'],
          baseQuery: fetchBaseQuery({
              baseUrl: "http://45.95.173.37:6500/api",
              fetchFn: async (...args) => {
                  await pause(200);
                  return fetch(...args);
              }
          }),
          endpoints: (builder) => ({
              getShowtime: builder.query({
                  query: () => `/v1/showtime/client`,
                  providesTags: ['Showtime']
              }),            
          })
      });
      
      export const {
          useGetShowtimeQuery,
      } = showtimeApi;
      export const showtimeReducer = showtimeApi.reducer;
      export default showtimeApi;
