import { baseApi } from "../../api/baseApi";

const fdrApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFdr: builder.mutation({
      query: (data) => ({
        url: "/fdr/create-fdr",
        method: "POST",
        body: data,
      }),
    }),
    getAllFdr: builder.query({
      query: () => ({
        url: "/fdr",
        method: "GET",
      }),
    }),
    getSingleFdr: builder.query({
      query: (id) => ({
        url: `/fdr/getSingleFdr/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateFdrMutation, useGetAllFdrQuery, useGetSingleFdrQuery } =
  fdrApi;
