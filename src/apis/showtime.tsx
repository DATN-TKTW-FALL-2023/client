import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const showtimeApi = createApi({
  reducerPath: "showtime",
  tagTypes: ["Showtimes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://45.95.173.37:6500/api/v1/showtime",
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getShowtime: builder.query({
      query: (params) => ({
        url: `/client`,
        params,
      }),
      providesTags(result, _, arg) {
        if (result) {
          const final = [
            ...result.data.map(({ _id }: { _id: string }) => ({
              type: "Showtimes" as const,
              id: _id,
            })),
            {
              type: "Showtimes" as const,
              id: "LIST",
              params: JSON.stringify(arg),
            },
          ];
          return final;
        }
        return [{ type: "Showtimes", id: "LIST", params: JSON.stringify(arg) }];
      },
    }),
  }),
});

export const { useGetShowtimeQuery } = showtimeApi;
export const showtimeReducer = showtimeApi.reducer;
export default showtimeApi;
