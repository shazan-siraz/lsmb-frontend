import { baseApi } from "../../api/baseApi";

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (data) => ({
        url: "/article/create-article",
        method: "POST",
        body: data,
      }),
      providesTags: ["article"],
    }),
    getAllArticle: builder.query({
      query: () => ({
        url: "/article",
        method: "GET",
      }),
      providesTags: ["article"],
    }),
    getSingleArticle: builder.query({
      query: (id) => ({
        url: `article/${id}`,
        method: "GET",
      }),
      providesTags: ["article"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["article"],
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useGetAllArticleQuery,
  useGetSingleArticleQuery,
  useDeleteArticleMutation,
} = articleApi;
