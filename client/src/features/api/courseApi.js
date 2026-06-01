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

    publishCourse: builder.query({
      query: () => ({
        url: "publish-courses",
        method: "GET",
      }),
    }),

    GetAllCourses: builder.query({
      query: () => ({
        url: "all",
        method: "GET",
      }),
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

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}`,
        method: "GET",
      }),
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
  useEditCoursesMutation,
  useCourseGetQuery,
  useTogglePublishCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseQuery,
  useGetAllCoursesQuery,
} = courseApi;
