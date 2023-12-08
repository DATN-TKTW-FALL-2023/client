import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.95.173.37:6500/api/v1" }),
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    Register: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    ForgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: { email },
      }),
    }),
    ResetPassword: builder.mutation({
      query: ({ newPassword, confirmPassword, token }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: { newPassword, confirmPassword, token },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation, // Thêm vào đây
} = userApi;

export const userReducer = userApi.reducer;
export default userApi;
