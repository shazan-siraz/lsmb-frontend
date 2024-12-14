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

    getAllDpsCollection: builder.query({
      query: (email) => ({
        url: `/dpsCollection/${email}`,
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
      query: (dpsAcNo) => ({
        url: `/dpsCollection/getTotalDpsBalaceByOneDpsAc/${dpsAcNo}`,
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
  useGetAllDpsCollectionQuery,
  useTodayDpsCollectionQuery,
  useGetTotalDpsBalaceByOneDpsAcQuery,
  useGetTotalDpsCollectionBalaceQuery
} = dpsCollectionApi;
