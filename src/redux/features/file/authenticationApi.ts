import { apiSlice } from "@/redux/api/apiSlice";
import { LoginData, RegisterData, UpdateUserData, UserData } from "@/types/authenticationInterface";


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

    // Query to get user by ID
    getUserById: builder.query<{
      status: string;
      data: {
        user: UserData;
      };
    }, string>({
      query: (userId: string) => ({
        url: `/get-user-by-id?id=${userId}`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // Mutation to update user by ID
    updateUserById: builder.mutation<{
      status: string;
      data: {
        user: UserData;
      };
    }, { userId: string; userData: UpdateUserData }>({
      query: ({ userId, userData }) => ({
        url: `/update-user-by-id/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["auth"],
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation, // Export the new mutation
} = authApi;