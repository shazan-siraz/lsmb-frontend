import { baseApi } from "../../api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/createExpense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),

    updateExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/updateExpense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),

    getAllExpense: builder.query({
      query: (email) => ({
        url: `/expense/getAllExpense/${email}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),

    searchExpense: builder.query({
      query: ({ email, startDate, endDate }) => ({
        url: `/expense/searchExpense?email=${email}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),

    searchExpenseWithCategory: builder.query({
      query: ({ expenseType, startDate, endDate }) => ({
        url: `/expense/searchExpenseWithCategory?expenseType=${expenseType}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpenseQuery,
  useUpdateExpenseMutation,
  useSearchExpenseQuery,
  useSearchExpenseWithCategoryQuery,
} = expenseApi;
