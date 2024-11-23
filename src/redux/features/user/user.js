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

    blockedUserStatus: builder.mutation({
      query: (data) => ({
        url: "/user/blockedUserStatus",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useUpdateUserStatusMutation,
  useBlockedUserStatusMutation,
} = userApi;