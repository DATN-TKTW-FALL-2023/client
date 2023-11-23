import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const vnpayApi = createApi({
  reducerPath: "vnpay",
  tagTypes: ["vnpays"], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 120s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: "http://45.95.173.37:6500/api/v1/vnpay",
    fetchFn: async (...args) => {
      return fetch(...args);
    },
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUrl: builder.mutation({
      query(body) {
        try {
          return {
            url: "/create-payment-url",
            method: "POST",
            body,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  }),
});

export const { useCreateUrlMutation } = vnpayApi;
export const vnpayReducer = vnpayApi.reducer;
export default vnpayApi;
