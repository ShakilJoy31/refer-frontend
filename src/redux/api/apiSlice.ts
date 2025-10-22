import { appConfiguration } from "@/utils/constant/appConfiguration";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = appConfiguration.baseUrl;
const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    headers.set(
      "Authorization",
      `Bearer ${shareWithCookies("get", `token`)}`
    );
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "file",
    "auth",
    "purchase",
    "Dashboard",
  ],
});
