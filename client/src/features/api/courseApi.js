import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:3000/api/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
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
    EditCourses: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `${courseId}`,
        method: "PUT",
        body: formData,
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
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),


    removeLecture:builder.query({
        query:(lectureId)=>({
            url:`lecture/${lectureId}`,
            method:"DELETE"
        })
    })
  }),
});

export const {
  useCourseCreateMutation,
  useEditLectureMutation,
  useGetLectureQuery,
  useCreateLectureMutation,
  useEditCoursesMutation,
  useCourseGetQuery,
  useRemoveLectureQuery
} = courseApi;
