import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaChartBar, FaUsers, FaBook, FaStar } from "react-icons/fa";
import { MdEdit, MdVisibility } from "react-icons/md";
import {
  useCourseGetQuery,
  useGetAllCoursesQuery,
} from "../features/api/courseApi";
import { useLoadUserQuery } from "../features/api/authApi";

const AdminHome = () => {
  const { data, isLoading, refetch } = useLoadUserQuery();
  const { data: instructorCourses, isLoading: coursesLoading } =useCourseGetQuery();
  const { data: allCourses } = useGetAllCoursesQuery();
  const isInstructor = data?.user?.role === "instructor";
  const courses = instructorCourses?.courses || [];
  const publishedCourses = courses.filter((c) => c.isPublished);
  const unpublishedCourses = courses.filter((c) => !c.isPublished);
  const totalEnrolled = courses.reduce(
    (sum, course) => sum + (course.enrolledStudents?.length || 0),
    0,
  );
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-slate-950 pt-28 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] opacity-90">
                Welcome back
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold">
                Hey, {data?.user?.username}!
              </h1>
              <p className="mt-3 text-lg text-white/80 max-w-2xl">
                Manage your courses, track student progress, and grow your
                teaching presence.
              </p>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-indigo-600 shadow-xl transition hover:bg-slate-100 whitespace-nowrap"
            >
              <IoMdAdd className="text-xl" />
              Create Course
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 mb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Courses */}
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Courses
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {courses.length}
                </p>
              </div>
              <FaBook className="text-4xl text-indigo-500 opacity-20" />
            </div>
          </div>

          {/* Published Courses */}
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Published</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {publishedCourses.length}
                </p>
              </div>
              <MdVisibility className="text-4xl text-emerald-500 opacity-20" />
            </div>
          </div>

          {/* Total Students */}
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Students
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {totalEnrolled}
                </p>
              </div>
              <FaUsers className="text-4xl text-cyan-500 opacity-20" />
            </div>
          </div>

          {/* Drafts */}
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Drafts</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {unpublishedCourses.length}
                </p>
              </div>
              <FaChartBar className="text-4xl text-amber-500 opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl bg-white p-8 shadow-lg shadow-slate-900/5">
          <h2 className="text-2xl font-bold text-slate-950 mb-6">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              to="/create"
              className="rounded-xl bg-indigo-600 p-6 text-white transition hover:opacity-95 group"
            >
              <IoMdAdd className="text-3xl mb-3 group-hover:scale-110 transition" />
              <p className="font-semibold">Create New Course</p>
              <p className="text-sm text-white/75 mt-1">
                Start teaching your expertise
              </p>
            </Link>
            <Link
              to="/dashboard"
              className="rounded-xl border-2 border-slate-200 p-6 text-slate-950 transition hover:bg-slate-50 group"
            >
              <MdEdit className="text-3xl mb-3 text-slate-600 group-hover:scale-110 transition" />
              <p className="font-semibold">View Dashboard</p>
              <p className="text-sm text-slate-600 mt-1">
                Manage all your courses
              </p>
            </Link>
            <Link
              to="/profile"
              className="rounded-xl border-2 border-slate-200 p-6 text-slate-950 transition hover:bg-slate-50 group"
            >
              <FaStar className="text-3xl mb-3 text-slate-600 group-hover:scale-110 transition" />
              <p className="font-semibold">Edit Profile</p>
              <p className="text-sm text-slate-600 mt-1">
                Update your information
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-slate-950">Your Courses</h2>
            <Link
              to="/dashboard"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              View All →
            </Link>
          </div>
          <p className="text-slate-600">
            Manage and edit your published and draft courses
          </p>
        </div>

        {coursesLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white p-6 shadow-lg"
              >
                <div className="h-48 rounded-xl bg-slate-200 mb-4" />
                <div className="h-4 w-3/4 rounded bg-slate-200 mb-3" />
                <div className="h-3 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="group rounded-2xl bg-white overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="relative overflow-hidden bg-slate-800 h-40">
                  <img
                    src={
                      course.courseThumbnail ||
                      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={course.courseTitle}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-60" />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        course.isPublished
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-950 line-clamp-2">
                    {course.courseTitle}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-1">
                    {course.category}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      {course.enrolledStudents?.length || 0} students
                    </span>
                    <span className="font-semibold text-indigo-600">
                      ₹{course.coursePrice || 0}
                    </span>
                  </div>
                  <Link
                    to={`/edit/${course._id}`}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-50 py-2 font-medium text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <MdEdit /> Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            <FaBook className="mx-auto text-5xl text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-600">No courses yet</p>
            <p className="text-slate-500 mt-2">
              Start by creating your first course
            </p>
            <Link
              to="/create"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:opacity-95"
            >
              <IoMdAdd /> Create Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;

