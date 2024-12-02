import { baseApi } from "../../api/baseApi";

const savingWithdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSavingWithdraw: builder.mutation({
      query: (data) => ({
        url: "/savingWithdraw/create-savingWithdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savingWithdraw"],
    }),

    getTotalSavingWithdraw: builder.query({
      query: (email) => ({
        url: `/savingWithdraw/getTotalSavingWithdraw/${email}`,
        method: "GET",
      }),
      providesTags: ["savingWithdraw"],
    }),

    getOneMemberAllSavingWithdraw: builder.query({
      query: (id) => ({
        url: `/savingWithdraw/getOneMemberAllSavingWithdraw/${id}`,
        method: "GET",
      }),
      providesTags: ["savingWithdraw"],
    }),
  }),
});

export const {
  useCreateSavingWithdrawMutation,
  useGetTotalSavingWithdrawQuery,
  useGetOneMemberAllSavingWithdrawQuery,
} = savingWithdrawApi;
