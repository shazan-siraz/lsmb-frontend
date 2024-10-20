import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
    }),
    getSingleAdmin: builder.query({
      query: (email) => ({
        url: `/admin/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useGetSingleAdminQuery,
} = adminApi;
