import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILayout } from "@/interfaces/Layout";

export const layoutApi = createApi({
  reducerPath: "layoutApi",
  tagTypes: ["layout"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getLayoutById: builder.query<any, any>({
      query: (id) => ({
        url: `/room/layout/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLayoutByIdQuery } = layoutApi;
export const layoutReducer = layoutApi.reducer;
export default layoutApi;