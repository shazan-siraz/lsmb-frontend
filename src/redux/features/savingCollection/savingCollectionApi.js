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

    updateSavingTransaction: builder.mutation({
      query: (data) => ({
        url: "savingTransaction/updateSavingTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savingTransaction"],
    }),

    deleteSavingTransaction: builder.mutation({
      query: (data) => ({
        url: "savingTransaction/deleteSavingTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savingTransaction"],
    }),

    getTotalSavingAmountByOneMember: builder.query({
      query: (id) => ({
        url: `savingTransaction/getTotalSavingAmountByOneMember/${id}`,
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),

    getUniqueMemberSavings: builder.query({
      query: (email) => ({
        url: `savingTransaction/getUniqueMemberSavings/${email}`,
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),

    getSingleMemberSavingTransaction: builder.query({
      query: (id) => ({
        url: `savingTransaction/getSingleMemberSavingTransaction/${id}`,
        method: "GET",
      }),
      providesTags: ["savingTransaction"],
    }),

    oneMonthDailyTotalSavingTxn: builder.query({
      query: ({ email, month, year }) => ({
        url: `savingTransaction/oneMonthDailyTotalSavingTxn/${email}/${month}/${year}`,
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
  useGetTotalSavingtxnAmountQuery,
  useUpdateSavingTransactionMutation,
  useDeleteSavingTransactionMutation,
  useGetTotalSavingAmountByOneMemberQuery,
  useGetUniqueMemberSavingsQuery,
  useGetSingleMemberSavingTransactionQuery,
  useOneMonthDailyTotalSavingTxnQuery,
} = savingCollectionApi;
