import { baseApi } from "../../api/baseApi";

const dpsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDps: builder.mutation({
      query: (data) => ({
        url: "/dps/create-dps",
        method: "POST",
        body: data,
      }),
    }),
    getAllDps: builder.query({
      query: () => ({
        url: "/dps",
        method: "GET",
      }),
    }),

    getSingleDps: builder.query({
      query: (id) => ({
        url: `/dps/getSingleDps/${id}`,
        method: "GET"
      })
    })

  }),
});

export const { useCreateDpsMutation, useGetAllDpsQuery, useGetSingleDpsQuery } = dpsApi;
