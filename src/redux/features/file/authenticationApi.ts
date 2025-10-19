import { apiSlice } from "@/redux/api/apiSlice";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    register: builder.mutation({
      query: (data: RegisterData) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = authApi;
