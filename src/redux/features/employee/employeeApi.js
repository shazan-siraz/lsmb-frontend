import { baseApi } from "../../api/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee/create-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employee"]
    }),
    getAllEmployee: builder.query({
      query: () => ({
        url: "/employee",
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
  }),
});

export const { useGetAllEmployeeQuery, useCreateEmployeeMutation } =
  employeeApi;
