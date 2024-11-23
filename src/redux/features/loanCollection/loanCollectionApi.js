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

    // getAllLoan: builder.query({
    //   query: () => ({
    //     url: "/loan",
    //     method: "GET",
    //   }),
    //   providesTags: ["loan"],
    // }),

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
      providesTags: ["loanCollection"],
    }),
  }),
});

export const {
  useCreateLoanCollectionMutation,
  useTotalLoanCollectionQuery,
  useLastLoanCollectionQuery,
} = loanCollectionApi;
