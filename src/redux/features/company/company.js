import { baseApi } from "../../api/baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/user/create-company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompany: builder.query({
      query: () => ({
        url: "/company",
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    getSingleCompany: builder.query({
      query: (email) => ({
        url: `/company/${email}`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
} = companyApi;
