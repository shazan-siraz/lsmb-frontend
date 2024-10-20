import { baseApi } from "../../api/baseApi";

const superAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSuperAdmin: builder.mutation({
      query: (data) => ({
        url: "/user/create-superAdmin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["superAdmin"],
    }),

    getSingleSuperAdmin: builder.query({
      query: (email) => ({
        url: `/superAdmin/${email}`,
        method: "GET",
      }),

      providesTags: ["superAdmin"],
    }),
  }),
});

export const { useCreateSuperAdminMutation, useGetSingleSuperAdminQuery } = superAdminApi;
