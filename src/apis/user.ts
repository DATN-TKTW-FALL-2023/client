// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const profileApi = createApi({
          reducerPath: "profile",
          tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://45.95.173.37:6500/api/v1',
    prepareHeaders: (headers, { getState }) => {
          const token = (getState() as any).auth.auth.accessToken;
          if (token) {
            headers.set("authorization", `Bearer ${token}`);
          }
    
          return headers;
        },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => 'user/profile',
    }),
  }),
});

export const { useGetUserProfileQuery } = profileApi;
export const profileReducer = profileApi.reducer;

export default profileApi;
