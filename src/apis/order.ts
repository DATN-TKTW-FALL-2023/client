import { TResApi } from "@/interfaces/common";
import { TCancelOrder, TOrder } from "@/interfaces/order";
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
    getOrderDetail: builder.query<TResApi<TOrder>, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags(_, __, arg) {
        return [{ type: "Orders", id: arg }];
      },
    }),

    getListOrder: builder.query<any, any>({
      query: (params) => ({
        url: `/my-order`,
        params,
      }),
      providesTags(result, _, arg) {
        if (result) {
          const final = [
            ...result.data.map(({ _id }: { _id: string }) => ({
              type: "Orders" as const,
              id: _id,
            })),
            { type: "Orders" as const, id: "LIST", params: JSON.stringify(arg) },
          ];
          return final;
        }
        return [{ type: "Orders", id: "LIST", params: JSON.stringify(arg) }];
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
    cancelOrder: builder.mutation<any, TCancelOrder>({
      query(body) {
        try {
          return {
            url: "/cancel",
            method: "PATCH",
            body,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
      invalidatesTags: (_, error, body) =>
        error ? [] : [{ type: "Orders", id: body.order }],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailQuery,useGetListOrderQuery, useCancelOrderMutation } = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
