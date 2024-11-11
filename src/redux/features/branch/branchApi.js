import { baseApi } from "../../api/baseApi";

const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBranch: builder.mutation({
      query: (data) => ({
        url: "/user/create-branch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"]
    }),
    getAllBranch: builder.query({
      query: (email) => ({
        url: `/branch/allBranch/${email}`,
        method: "GET",
      }),
      providesTags: ["branch"]
    }),
    getSingleBranch: builder.query({
      query: (email) => ({
        url: `/branch/${email}`,
        method: "GET",
      }),
      providesTags: ["branch"]
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetSingleBranchQuery,
  useGetAllBranchQuery,
} = branchApi;
