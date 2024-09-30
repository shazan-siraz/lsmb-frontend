import { baseApi } from "../../api/baseApi";

const membershipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMembership: builder.mutation({
      query: (data) => ({
        url: "/membership/create-membership",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["membership"],
    }),

    getAllMembership: builder.query({
      query: () => ({
        url: "/membership",
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    getSingleMembership: builder.query({
      query: (id) => ({
        url: `/membership/single-membership/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["membership"],
    }),
  }),
});

export const {
  useCreateMembershipMutation,
  useGetAllMembershipQuery,
  useGetSingleMembershipQuery,
} = membershipApi;
