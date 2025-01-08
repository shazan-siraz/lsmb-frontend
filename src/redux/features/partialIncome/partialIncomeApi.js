import { baseApi } from "../../api/baseApi";

const partialIncomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPartialIncome: builder.mutation({
      query: (data) => ({
        url: "/partialIncome/createPartialIncome",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["partialIncome"],
    }),

    updatePartialIncome: builder.mutation({
      query: (data) => ({
        url: "/partialIncome/updatePartialIncome",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["partialIncome"],
    }),

    getAllPartialIncome: builder.query({
      query: (email) => ({
        url: `/partialIncome/getAllPartialIncome/${email}`,
        method: "GET",
      }),
      providesTags: ["partialIncome"],
    }),

    totalPartialIncome: builder.query({
      query: (email) => ({
        url: `/partialIncome/totalPartialIncome/${email}`,
        method: "GET",
      }),
      providesTags: ["partialIncome"],
    }),
  }),
});

export const {
  useCreatePartialIncomeMutation,
  useUpdatePartialIncomeMutation,
  useGetAllPartialIncomeQuery,
  useTotalPartialIncomeQuery,
} = partialIncomeApi;
