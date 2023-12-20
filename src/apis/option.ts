import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const optionApi = createApi({
  reducerPath: "option",
  tagTypes: ["option"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://45.95.173.37:6500/api/v1" }),
  endpoints: (builder) => ({
    optionByKey: builder.query({
      query: (data) => ({
        url: `/option/keys?key=${data}`,
        method: "GET",
      }),
    }),
    
})
})
export const {
    useOptionByKeyQuery
} = optionApi;

export const optionReducer = optionApi.reducer;
export default optionApi;
