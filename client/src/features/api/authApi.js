import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";


const USER_API = "https://up-grow-learner-e5cy.vercel.app/api/v1/user/"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
       registerUser: builder.mutation({
  query: (inputData) => ({
    url: "register",
    method: "POST",
    body: inputData,
  }),
  async onQueryStarted(_, { queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      console.log('Register success:', data);
    } catch (err) {
      console.log('Register error status:', err?.error?.status);
      console.log('Register error data:', err?.error?.data);
      console.log('Register error message:', err?.error?.data?.message);
    }
  },
}),

        loginUser: builder.mutation({
  query: (inputData) => ({
    url: "login",
    method: "POST",
    body: inputData,
  }),
  async onQueryStarted(_, { queryFulfilled, dispatch }) {
    try {
      const result = await queryFulfilled;
      dispatch(userLoggedIn({ user: result.data.user }));
    } catch (err) {
     
      console.log('Login error status:', err?.error?.status);
      console.log('Login error data:', err?.error?.data);
      console.log('Login error message:', err?.error?.data?.message);
    }
  },}),
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;

