import { baseApi } from "../../api/baseApi";

const registerPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRegisterPackage: builder.mutation({
      query: (data) => ({
        url: "/registerPackage/create-registerPackage",
        method: "POST",
        body: data,
      }),
    }),
    getAllRegisterPackage: builder.query({
      query: () => ({
        url: "/registerPackage",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateRegisterPackageMutation, useGetAllRegisterPackageQuery } = registerPackageApi;