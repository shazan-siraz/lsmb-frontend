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

    deleteLoanCollection: builder.mutation({
      query: (data) => ({
        url: "/loanCollection/deleteLoanCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loanCollection"],
    }),

    updateLoanCollection: builder.mutation({
      query: (data) => ({
        url: "/loanCollection/update-loanCollection",
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
      query: (loanNo) => ({
        url: `/loanCollection/lastLoanCollection/${loanNo}`,
        method: "GET",
      }),
      providesTags: ["loanCollection"],
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

    getOneAccountTotalLoanCollectionAmount: builder.query({
      query: (id) => ({
        url: `/loanCollection/getOneAccountTotalLoanCollectionAmount/${id}`,
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
  useUpdateLoanCollectionMutation,
  useDeleteLoanCollectionMutation,
  useGetOneAccountTotalLoanCollectionAmountQuery
} = loanCollectionApi;
