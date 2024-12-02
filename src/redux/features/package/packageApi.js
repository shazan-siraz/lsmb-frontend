import { baseApi } from "../../api/baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    packageCreate: builder.mutation({
      query: (data) => ({
        url: "/package/create-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
    getAllPackage: builder.query({
      query: () => ({
        url: "/package",
        method: "GET",
      }),
      providesTags: ["package"],
    }),
    // deleteRegisterPackage: builder.mutation({
    //   query: (id) => ({
    //     url: `/registerPackage/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["registerPackage"]
    // }),
  }),
});

export const { usePackageCreateMutation, useGetAllPackageQuery } = packageApi;
