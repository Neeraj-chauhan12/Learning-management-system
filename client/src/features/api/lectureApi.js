import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "https://lms1-c8v4.onrender.com/api/lecture/";
//const BaseUrl = "http://localhost:3000/api/lecture/";

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  endpoints: (builder) => ({
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
      providesTags: ["Lectures"],
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
        method: "PUT",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `lecture/${lectureId}`,
        method: "DELETE",
      }),
       invalidatesTags: ["Lectures"],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `lecture/${lectureId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateLectureMutation,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useGetLectureQuery,
} = lectureApi;

