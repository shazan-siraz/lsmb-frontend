import { baseApi } from "../../api/baseApi";

const bankTransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBankTransaction: builder.mutation({
      query: (data) => ({
        url: "/bankTransaction/createBankTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bankTransaction"],
    }),

    getAllBankTransaction: builder.query({
      query: (email) => ({
        url: `/bankTransaction/getAllBankTransaction/${email}`,
        method: "GET",
      }),
      providesTags: ["bankTransaction"],
    }),

    updateBankTransaction: builder.mutation({
      query: (data) => ({
        url: "/bankTransaction/updateBankTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bankTransaction"],
    }),

    searchBankTxn: builder.query({
      query: ({ email, bankId, startDate, endDate }) => {
        let url = `/bankTransaction/searchBankTxn?email=${email}&startDate=${startDate}&endDate=${endDate}`;

        // If bankId exists, add it to the query string
        if (bankId) {
          url += `&bankId=${bankId}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["bankTransaction"],
    }),

    totalAddMoneyBankTxn: builder.query({
      query: (email) => ({
        url: `/bankTransaction/totalAddMoneyBankTxn/${email}`,
        method: "GET",
      }),
      providesTags: ["bankTransaction"],
    }),

    totalCashOutBankTxn: builder.query({
      query: (email) => ({
        url: `/bankTransaction/totalCashOutBankTxn/${email}`,
        method: "GET",
      }),
      providesTags: ["bankTransaction"],
    }),

    OneMonthDailyTotalBankTxn: builder.query({
      query: ({ email, month, year }) => ({
        url: `/bankTransaction/OneMonthDailyTotalBankTxn/${email}/${month}/${year}`,
        method: "GET",
      }),
      providesTags: ["bankTransaction"],
    }),
  }),
});

export const {
  useCreateBankTransactionMutation,
  useGetAllBankTransactionQuery,
  useUpdateBankTransactionMutation,
  useSearchBankTxnQuery,
  useTotalAddMoneyBankTxnQuery,
  useTotalCashOutBankTxnQuery,
  useOneMonthDailyTotalBankTxnQuery,
} = bankTransactionApi;
