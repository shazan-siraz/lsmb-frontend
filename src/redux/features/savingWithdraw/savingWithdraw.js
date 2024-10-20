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
  }),
});

export const { useCreateSavingWithdrawMutation } = savingWithdrawApi;
