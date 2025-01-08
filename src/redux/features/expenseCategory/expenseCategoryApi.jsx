import { baseApi } from "../../api/baseApi";

const expenseCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenseCategory: builder.mutation({
      query: (data) => ({
        url: "/expenseCategory/createExpenseCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expenseCategory"],
    }),

    updateExpenseCategory: builder.mutation({
      query: (data) => ({
        url: "/expenseCategory/updateExpenseCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expenseCategory"],
    }),

    getAllExpenseCategory: builder.query({
      query: (email) => ({
        url: `/expenseCategory/getAllExpenseCategory/${email}`,
        method: "GET",
      }),
      providesTags: ["expenseCategory"],
    }),
  }),
});

export const {
  useCreateExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
} = expenseCategoryApi;
