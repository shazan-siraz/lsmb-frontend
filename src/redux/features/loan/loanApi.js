import { baseApi } from "../../api/baseApi";

const loanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLoan: builder.mutation({
      query: (data) => ({
        url: "/loan/create-loan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loan"],
    }),

    getAllLoan: builder.query({
      query: () => ({
        url: "/loan",
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    getPendingLoan: builder.query({
      query: () => ({
        url: "/loan/pending-loan",
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    getActiveLoan: builder.query({
      query: () => ({
        url: "/loan/Active-loan",
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    updateLoan: builder.mutation({
      query: (data) => ({
        url: "/loan/statusUpdate-loan",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["loan"],
    }),

    getOverdueLoan: builder.query({
      query: () => ({
        url: "/loan/overdue-loan",
        method: "GET",
      }),
      invalidatesTags: ["loan"],
    }),

  }),
});

export const {
  useCreateLoanMutation,
  useGetAllLoanQuery,
  useGetPendingLoanQuery,
  useGetActiveLoanQuery,
  useUpdateLoanMutation,
  useGetOverdueLoanQuery
} = loanApi;
