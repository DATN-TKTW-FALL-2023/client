import { TResApi } from "@/interfaces/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://45.95.173.37:6500/api/v1/order",
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
    getOrderDetail: builder.query<TResApi<any>, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags(_, __, arg) {
        return [{ type: "Orders", id: arg }];
      },
    }),
    createOrder: builder.mutation({
      query(body) {
        try {
          return {
            url: "",
            method: "POST",
            body,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
      invalidatesTags: (_, error, body) =>
        error ? [] : [{ type: "Orders", id: body.idShowtime }],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailQuery } = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
