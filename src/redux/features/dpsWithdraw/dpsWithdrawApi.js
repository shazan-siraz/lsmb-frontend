import { baseApi } from "../../api/baseApi";

const dpsWithdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDpsWithdraw: builder.mutation({
      query: (data) => ({
        url: "/dpsWithdraw/create-dpsWithdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dpsWithdraw", "dps", "dpsCollection"],
    }),
    getTotalDpsWithdraw: builder.query({
      query: (email) => ({
        url: `/dpsWithdraw/getTotalDpsWithdraw/${email}`,
        method: "GET",
      }),
      providesTags: ["dpsWithdraw"],
    }),
    todayDpsWithdraw: builder.query({
      query: (email) => ({
        url: `/dpsWithdraw/todayDpsWithdraw/${email}`,
        method: "GET",
      }),
      providesTags: ["dpsWithdraw"],
    }),
    getAllDpsWithdraw: builder.query({
      query: (email) => ({
        url: `/dpsWithdraw/getAllDpsWithdraw/${email}`,
        method: "GET",
      }),
      providesTags: ["dpsWithdraw"],
    }),
  }),
});

export const {
  useCreateDpsWithdrawMutation,
  useGetTotalDpsWithdrawQuery,
  useTodayDpsWithdrawQuery,
  useGetAllDpsWithdrawQuery,
} = dpsWithdrawApi;
