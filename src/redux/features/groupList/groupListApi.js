import { baseApi } from "../../api/baseApi";

const groupListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (data) => ({
        url: "/groups/create-group",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    updateGroup: builder.mutation({
      query: (data) => ({
        url: "/groups/update-group",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    getAllGroup: builder.query({
      query: () => ({
        url: "/groups",
        method: "GET",
      }),
      providesTags: ['group'],
    }),
  }),
});

export const { useCreateGroupMutation, useGetAllGroupQuery, useUpdateGroupMutation } = groupListApi;

