import { baseApi } from "../../api/baseApi";

const savingCollectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSavingCollection: builder.mutation({
      query: (data) => ({
        url: "/savingTransaction/create-savingTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savingTransaction", "membership"],
    }),

    getAllSavingCollection: builder.query({
      query: () => ({
        url: "/savingTransaction",
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),

    getTotalSavingtxnAmount: builder.query({
      query: (email) => ({
        url: `/savingTransaction/getTotalSavingtxnAmount/${email}`,
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),

    todaySavingCollection: builder.query({
      query: (email) => ({
        url: `savingTransaction/todaySavingTxn/${email}`,
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),
  }),
});

export const {
  useCreateSavingCollectionMutation,
  useGetAllSavingCollectionQuery,
  useTodaySavingCollectionQuery,
  useGetTotalSavingtxnAmountQuery
} = savingCollectionApi;
