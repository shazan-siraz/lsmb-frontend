import { baseApi } from "../../api/baseApi";

const dpsCollectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDpsCollection: builder.mutation({
      query: (data) => ({
        url: "/dpsCollection/create-dpsCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dpsCollection"],
    }),

    updateDpsCollection: builder.mutation({
      query: (data) => ({
        url: "/dpsCollection/updateDpsCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dpsCollection"],
    }),

    deleteDpsCollection: builder.mutation({
      query: (data) => ({
        url: "/dpsCollection/deleteDpsCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dpsCollection"],
    }),

    getAllDpsCollection: builder.query({
      query: (email) => ({
        url: `/dpsCollection/${email}`,
        method: "GET",
      }),
      providesTags: ["dpsCollection"],
    }),

    getAllDpsCollectionByOneAc: builder.query({
      query: (id) => ({
        url: `/dpsCollection/getAllDpsCollectionByOneAc/${id}`,
        method: "GET",
      }),
      providesTags: ["dpsCollection"],
    }),

    todayDpsCollection: builder.query({
      query: (email) => ({
        url: `/dpsCollection/todayDpsCollection/${email}`,
        method: "GET",
      }),
      providesTags: ["dpsCollection"],
    }),

    getTotalDpsBalaceByOneDpsAc: builder.query({
      query: (dpsId) => ({
        url: `/dpsCollection/getTotalDpsBalaceByOneDpsAc/${dpsId}`,
        method: "GET",
      }),
      providesTags: ["dpsCollection"],
    }),

    getTotalDpsCollectionBalace: builder.query({
      query: (email) => ({
        url: `/dpsCollection/getTotalDpsCollectionBalace/${email}`,
        method: "GET",
      }),
      providesTags: ["dpsCollection"],
    }),
  }),
});

export const {
  useCreateDpsCollectionMutation,
  useUpdateDpsCollectionMutation,
  useDeleteDpsCollectionMutation,
  useGetAllDpsCollectionQuery,
  useTodayDpsCollectionQuery,
  useGetTotalDpsBalaceByOneDpsAcQuery,
  useGetTotalDpsCollectionBalaceQuery,
  useGetAllDpsCollectionByOneAcQuery
} = dpsCollectionApi;
