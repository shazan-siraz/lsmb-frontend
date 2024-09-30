import { baseApi } from "../../api/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: () => ({
        url: "/employee",
        method: "GET",
      }),
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee/create-employee",
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const { useGetAllEmployeeQuery, useCreateEmployeeMutation } =
  employeeApi;
