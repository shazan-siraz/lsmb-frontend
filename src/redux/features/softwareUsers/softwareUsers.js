import { baseApi } from "../../api/baseApi";

const SoftwareUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSoftwareUsers: builder.mutation({
      query: (data) => ({
        url: "/softwareUsers/create-softwareUsers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["softwareUsers"],
    }),

    getAllSoftwareUsers: builder.query({
      query: () => ({
        url: "/softwareUsers",
        method: "GET",
      }),

      providesTags: ["softwareUsers"],
    }),

    deleteSoftwareUsers: builder.mutation({
      query: (id) => ({
        url: `/softwareUsers/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["softwareUsers"],
    }),
  }),
});

export const {
  useCreateSoftwareUsersMutation,
  useGetAllSoftwareUsersQuery,
  useDeleteSoftwareUsersMutation,
} = SoftwareUsersApi;
