import { baseApi } from "../../api/baseApi";

const leaderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDailyCreditAndDebit: builder.query({
      query: (email) => ({
        url: `/leaderBoard/getDailyCreditAndDebit/${email}`,
        method: "GET",
      }),
      providesTags: ["loanCollection"],
    }),
  }),
});

export const { useGetDailyCreditAndDebitQuery } = leaderApi;
