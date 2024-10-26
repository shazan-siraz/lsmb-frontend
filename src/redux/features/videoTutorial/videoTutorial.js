import { baseApi } from "../../api/baseApi";

const videoTutorialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVideoTutorial: builder.mutation({
      query: (data) => ({
        url: "/videoTutorial/create-videoTutorial",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videoTutorial"],
    }),

    getAllVideoTutorial: builder.query({
      query: () => ({
        url: "/videoTutorial",
        method: "GET",
      }),

      providesTags: ["videoTutorial"],
    }),

    deleteVideoTutorial: builder.mutation({
      query: (id) => ({
        url: `/videoTutorial/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["videoTutorial"],
    }),
  }),
});

export const {
  useCreateVideoTutorialMutation,
  useGetAllVideoTutorialQuery,
  useDeleteVideoTutorialMutation,
} = videoTutorialApi;
