import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (email) => ({
        url: `/user/${email}`,
        method: "GET",
      }),

      providesTags: ["user"],
    }),

    updateUserStatus: builder.mutation({
      query: (data) => ({
        url: "/user/updateUserStatus",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["company"],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateUserStatusMutation } = userApi;
