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
      query: (email) => ({
        url: `/membership/getAllMember/${email}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    getAllSavingMembership: builder.query({
      query: (email) => ({
        url: `/membership/getAllSavingMember/${email}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    getSingleMembership: builder.query({
      query: (id) => ({
        url: `/membership/single-membership/${id}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    getTotalShareAmountAndProcessFees: builder.query({
      query: (email) => ({
        url: `/membership/getTotalShareAmountAndProcessFees/${email}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    searchMember: builder.query({
      query: ({ query, email }) => ({
        url: `/membership/searchMember?query=${query}&email=${email}`,
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
  useGetAllSavingMembershipQuery,
  useGetTotalShareAmountAndProcessFeesQuery,
  useSearchMemberQuery,
} = membershipApi;
