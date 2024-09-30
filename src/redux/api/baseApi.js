import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://lsmb-backend.onrender.com/api/v1" }),
  tagTypes: [
    "group",
    "membership",
    "loan",
    "savingTransaction",
    "savingWithdraw",
  ],
  endpoints: () => ({}),
});
