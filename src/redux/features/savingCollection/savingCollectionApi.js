import { baseApi } from "../../api/baseApi";

const savingCollectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSavingCollection: builder.mutation({
      query: (data) => ({
        url: "/savingTransaction/create-savingTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["membership"],
    }),

    getAllSavingCollection: builder.query({
      query: () => ({
        url: "/savingTransaction",
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),
  }),
});

export const { useCreateSavingCollectionMutation, useGetAllSavingCollectionQuery } = savingCollectionApi;
