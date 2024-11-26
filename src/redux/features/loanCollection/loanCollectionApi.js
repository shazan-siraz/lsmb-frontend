import { baseApi } from "../../api/baseApi";

const loanCollectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLoanCollection: builder.mutation({
      query: (data) => ({
        url: "/loanCollection/create-loanCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loanCollection"],
    }),

    totalLoanCollection: builder.query({
      query: (email) => ({
        url: `/loanCollection/totalLoanCollection/${email}`,
        method: "GET",
      }),
      providesTags: ["loanCollection"],
    }),

    lastLoanCollection: builder.query({
      query: (email) => ({
        url: `/loanCollection/lastLoanCollection/${email}`,
        method: "GET",
      }),
      invalidatesTags: ["loanCollection"],
    }),

    todayLoanCollection: builder.query({
      query: (email) => ({
        url: `/loanCollection/todayLoanCollection/${email}`,
        method: "GET",
      }),
      providesTags: ["loanCollection"],
    }),

    getTotalLoanCollectionAmount: builder.query({
      query: (email) => ({
        url: `/loanCollection/getTotalLoanCollectionAmount/${email}`,
        method: "GET",
      }),
      providesTags: ["loanCollection"],
    }),
  }),
});

export const {
  useCreateLoanCollectionMutation,
  useTotalLoanCollectionQuery,
  useLastLoanCollectionQuery,
  useTodayLoanCollectionQuery,
  useGetTotalLoanCollectionAmountQuery,
} = loanCollectionApi;
