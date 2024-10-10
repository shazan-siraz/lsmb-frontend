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
        url: "/dps",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateAdminMutation, useGetAllAdminQuery } = adminApi;
