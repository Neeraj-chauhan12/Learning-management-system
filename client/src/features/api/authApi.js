import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Userlogin, Userlogout } from "../AuthSlice";

const USER_API = "http://localhost:3000/api/users/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(Userlogin({ user: result.data.user }));
        } catch (error) {
          console.log(error.message);
        }
      },
    }),

    register: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
     
    }),

    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),

       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(Userlogin({ user: result.data.user }));
        } catch (error) {
          console.log(error.message);
        }
      },
    }),


    LogoutUser:builder.mutation({
        query:()=>({

            url:"logout",
            method:"GET",
        }),

         async onQueryStarted(arg, { _, dispatch }) {
        try {
        //   const result = await queryFulfilled;
          dispatch(Userlogout());
        } catch (error) {
          console.log(error.message);
        }
      },
    }),

    updateUser: builder.mutation({
      query: (FormData) => ({
        url: "profile/update",
        method: "PUT",
        body: FormData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useLogoutUserMutation
} = authApi;
