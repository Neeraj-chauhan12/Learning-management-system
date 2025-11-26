import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const COURSE_API="http://localhost:3000/api/course/"

export const courseApi=createApi({
    reducerPath:"courseApi",
    tagTypes:["Refetch-course"],
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_API,
        credentials:'include'
    }),

    endpoints:(builder)=>({
        courseCreate:builder.mutation({
            query:(inputData)=>({
                url:"",
                method:"POST",
                body:inputData
            }),
            invalidatesTags:["Refetch-course"],
        }),
         courseGet:builder.query({
            query:()=>({
                url:"get",
                method:"GET",   
            }),
            providesTags:["Refetch-course"]
        }),

    })
})


export const {useCourseCreateMutation,useCourseGetQuery}=courseApi;