import { baseApi } from "../../api/baseApi";

const dpsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDps: builder.mutation({
      query: (data) => ({
        url: "/dps/create-dps",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dps", "dpsCollection"],
    }),
    getAllDps: builder.query({
      query: () => ({
        url: "/dps",
        method: "GET",
      }),
      providesTags: ["dps"],
    }),

    getSingleDps: builder.query({
      query: (id) => ({
        url: `/dps/getSingleDps/${id}`,
        method: "GET",
      }),
      providesTags: ["dps"],
    }),

    getSingleDpsById: builder.query({
      query: (id) => ({
        url: `/dps/getSingleDpsById/${id}`,
        method: "GET",
      }),
      providesTags: ["dps"],
    }),

    searchDpsAccount: builder.query({
      query: ({ query, email }) => ({
        url: `/dps/searchDpsAccount?query=${query}&email=${email}`,
        method: "GET",
      }),
      providesTags: ["dps"],
    }),

  }),
});

export const {
  useCreateDpsMutation,
  useGetAllDpsQuery,
  useGetSingleDpsQuery,
  useGetSingleDpsByIdQuery,
  useSearchDpsAccountQuery
} = dpsApi;
