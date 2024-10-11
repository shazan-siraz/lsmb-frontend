import { baseApi } from "../../api/baseApi";

const savingTransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSavingTransaction: builder.mutation({
      query: (data) => ({
        url: "/savingTransaction/create-savingTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savingTransaction"],
    }),

    getAllSavingTransaction: builder.query({
      query: () => ({
        url: "/savingTransaction",
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),
  }),
});

export const { useCreateSavingTransactionMutation, useGetAllSavingTransactionQuery } = savingTransactionApi;
