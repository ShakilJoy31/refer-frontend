
import { apiSlice } from "@/redux/api/apiSlice";
import { DashboardResponse } from "@/types/userDashboard";



const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboard: builder.query<DashboardResponse, string>({
      query: (userId: string) => ({
        url: `/get-user-refer?id=${userId}`,
        method: "GET",
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { 
  useGetUserDashboardQuery 
} = purchaseApi;