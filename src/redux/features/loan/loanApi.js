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

    getSingleLoan: builder.query({
      query: (id) => ({
        url: `/loan/${id}`,
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    getPendingLoan: builder.query({
      query: (email) => ({
        url: `/loan/pending-loan/${email}`,
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    getActiveLoan: builder.query({
      query: (email) => ({
        url: `/loan/active-loan/${email}`,
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
  useGetSingleLoanQuery,
  useGetPendingLoanQuery,
  useGetActiveLoanQuery,
  useUpdateLoanMutation,
  useGetOverdueLoanQuery
} = loanApi;
