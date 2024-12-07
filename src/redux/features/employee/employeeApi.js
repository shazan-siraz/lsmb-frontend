import { baseApi } from "../../api/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee/create-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),
    getAllEmployee: builder.query({
      query: (email) => ({
        url: `/employee/${email}`,
        method: "GET",
      }),
      providesTags: ["employee"],
    }),
    getSingleEmployee: builder.query({
      query: (email) => ({
        url: `/employee/getSingleEmployee/${email}`,
        method: "GET",
      }),
      providesTags: ["employee"],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useCreateEmployeeMutation,
  useGetSingleEmployeeQuery,
} = employeeApi;
