import { TResApi } from "@/interfaces/common";
import { TBookingSeat, TCancelBooking, TShowtime } from "@/interfaces/showtime";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const showtimeApi = createApi({
  reducerPath: "showtime",
  tagTypes: ["Showtimes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://45.95.173.37:6500/api/v1/showtime",
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
    getShowtimeDetail: builder.query<TResApi<TShowtime>, string>({
      query: (id) => ({
        url: `/${id}/client`,
      }),
      providesTags(_, __, arg) {
        return [{ type: "Showtimes", id: arg }];
      },
    }),
    bookingSeat: builder.mutation<any, TBookingSeat>({
      query(body) {
        try {
          return {
            url: "/booking",
            method: "POST",
            body,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
      invalidatesTags: (_, error, body) =>
        error ? [] : [{ type: "Showtimes", id: body.idShowtime }],
    }),
    cancelBooking: builder.mutation<any, TCancelBooking>({
      query(body) {
        try {
          return {
            url: "/cancel",
            method: "POST",
            body,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
      invalidatesTags: (_, error, body) =>
        error ? [] : [{ type: "Showtimes", id: body.idShowtime }],
    }),
  }),
});

export const {
  useGetShowtimeQuery,
  useGetShowtimeDetailQuery,
  useBookingSeatMutation,
  useCancelBookingMutation,
} = showtimeApi;
export const showtimeReducer = showtimeApi.reducer;
export default showtimeApi;
