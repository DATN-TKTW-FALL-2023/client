import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.95.173.37:6500/api/v1" }),
  endpoints: (builder) => ({
    Login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    Register: builder.mutation<any, any>({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
export const userReducer = userApi.reducer;
export default userApi;
