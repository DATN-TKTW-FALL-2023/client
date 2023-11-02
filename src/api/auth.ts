import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "@/interfaces/User";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    Login: builder.mutation<IUser,IUser>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    Register: builder.mutation<IUser,IUser>({
      query: (data)=>({
        url: `auth/register`,
        method:"POST",
        body: data,
      })
    })
  }),
});

export const { useLoginMutation,useRegisterMutation } = userApi;
export const userReducer = userApi.reducer;
export default userApi;
