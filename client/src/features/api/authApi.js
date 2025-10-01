import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const USER_API=""
export const authApi=createApi({
    reducerPath: 'authApi',
    baseQuery:fetchBaseQuery ({
        baseUrl: USER_API,
        credentials:'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation('login', {
            query: (inputData) => ({
                url:"login",
                method: 'POST',
                body: JSON.stringify(inputData),
            }),
        }),

            register: builder.mutation('register', {
            query: (inputData) => ({
                url:"register",
                method: 'POST',
                body: JSON.stringify(inputData),
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