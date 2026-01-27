import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:3000/api/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),

  endpoints: (builder) => ({
    courseCreate: builder.mutation({
      query: (inputData) => ({
        url: "",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["Refetch-course"],
    }),

    courseGet: builder.query({
      query: () => ({
        url: "get",
        method: "GET",
      }),
      providesTags: ["Refetch-course"],
    }),

    publishCourse:builder.query({
      query:()=>({
        url:"publish-courses",
        method:"GET",
      })
    }),

    EditCourses: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `${courseId}`,
        method: "PUT",
        body: formData,
        // headers: formData instanceof FormData ? {} : { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Refetch-course"],
    }),

    CreateLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),

    getLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/lecture`,
        method: "GET",
      }),
    }),

    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `${courseId}/lecture/${lectureId}`,
        method:"PUT",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),


    removeLecture:builder.mutation({
        query:(lectureId)=>({
            url:`lecture/${lectureId}`,
            method:"DELETE"
        })
    }),

    getLectureById:builder.query({
      query:(lectureId)=>({
        url:`lecture/${lectureId}`,
        method:"GET",
      })
    }),

    getCourseById:builder.query({
      query:(courseId)=>({
        url:`course/${courseId}`,
        method:"GET",
      })
    }),


    togglePublishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),

  }),
});

   
   

export const {
  useCourseCreateMutation,
  useEditLectureMutation,
  useGetLectureQuery,
  useCreateLectureMutation,
  useEditCoursesMutation,
  useCourseGetQuery,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useTogglePublishCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseQuery,
} = courseApi;
