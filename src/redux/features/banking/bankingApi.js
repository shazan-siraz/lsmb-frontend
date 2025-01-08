import { baseApi } from "../../api/baseApi";

const bankingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanking: builder.mutation({
      query: (data) => ({
        url: "/banking/createBanking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banking"],
    }),

    updateBanking: builder.mutation({
      query: (data) => ({
        url: "/banking/updateBanking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banking"],
    }),

    getAllBanking: builder.query({
      query: (email) => ({
        url: `/banking/getAllBanking/${email}`,
        method: "GET",
      }),
      providesTags: ["banking"],
    }),
  }),
});

export const {
  useCreateBankingMutation,
  useGetAllBankingQuery,
  useUpdateBankingMutation,
} = bankingApi;
