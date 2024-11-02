import { baseApi } from "../../api/baseApi";

const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBranch: builder.mutation({
      query: (data) => ({
        url: "/user/create-branch",
        method: "POST",
        body: data,
      }),
    }),
    getAllBranch: builder.query({
      query: (email) => ({
        url: `/branch/allBranch/${email}`,
        method: "GET",
      }),
    }),
    getSingleBranch: builder.query({
      query: (email) => ({
        url: `/branch/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetSingleBranchQuery,
  useGetAllBranchQuery,
} = branchApi;
