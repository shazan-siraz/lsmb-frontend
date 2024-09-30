import { baseApi } from "../../api/baseApi";

const savingTransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSavingTransaction: builder.mutation({
      query: (data) => ({
        url: "/savingTransaction/create-savingTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savingTransaction"],
    }),

    // getAllMembership: builder.query({
    //   query: () => ({
    //     url: "/membership",
    //     method: "GET",
    //   }),
    //   providesTags: ["membership"],
    // }),
  }),
});

export const { useCreateSavingTransactionMutation } = savingTransactionApi;
