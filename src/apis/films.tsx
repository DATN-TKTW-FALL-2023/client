import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const filmApi = createApi({
  reducerPath: "film",
  tagTypes: ["Films"], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 120s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: "http://45.95.173.37:6500/api/v1/film",
  }),
  endpoints: (builder) => ({
    getFilms: builder.query<any, any>({
      query: (params) => ({
        url: `/client`,
        params,
      }),
      providesTags(result, _, arg) {
        if (result) {
          const final = [
            ...result.data.map(({ _id }: { _id: string }) => ({
              type: "Films" as const,
              id: _id,
            })),
            { type: "Films" as const, id: "LIST", params: JSON.stringify(arg) },
          ];
          return final;
        }
        return [{ type: "Films", id: "LIST", params: JSON.stringify(arg) }];
      },
    }),
    getFilmsById: builder.query({
      query: (id) => `/${id}/client`,
      providesTags: (result) => {
        return [{ type: "Films", id: result.data._id }];
      },
    }),
  }),
});

export const { useGetFilmsQuery, useGetFilmsByIdQuery } = filmApi;
export const filmReducer = filmApi.reducer;
export default filmApi;
