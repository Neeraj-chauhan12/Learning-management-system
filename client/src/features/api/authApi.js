import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const USER_API="http://localhost:3000/api/users"

export const authApi=createApi({
    reducerPath: 'authApi',
    baseQuery:fetchBaseQuery ({
        baseUrl: USER_API,
        credentials:'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (inputData) => ({
                url:"login",
                method: 'POST',
                body: inputData,
            }),
        }),

         register: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method: 'POST',
                body: inputData,
            }),
            async onQueryStarted(arg,{dispatch, queryFulfilled, }) {
                try {
                const result=await queryFulfilled;
                    dispatch({user:result.data.user})
                    
                } catch (error) {
                    console.log(error.message)
                    
                }
            }
        }),
        
    })
 
 
})

export const {useLoginMutation, useRegisterMutation} = authApi;