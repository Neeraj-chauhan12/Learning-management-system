import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useCourseGetQuery } from "../../features/api/courseApi";
import { FaRegEdit } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";

const CourseDetail = () => {
  const { data, isLoading } = useCourseGetQuery();

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 px-4 md:px-8 pb-12">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">My Courses</h1>
          <p className="text-slate-600 mt-1">Manage and organize your courses</p>
        </div>
        <Link to="/create">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95">
            <IoMdAdd className="text-xl" />
            Create Course
          </button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/5">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Course Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Lectures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 w-32 rounded bg-slate-200" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-slate-200" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-slate-200" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-12 rounded bg-slate-200" /></td>
                    <td className="px-6 py-4"><div className="h-9 w-28 rounded-lg bg-slate-200" /></td>
                  </tr>
                ))
              ) : data?.courses?.length > 0 ? (
                data.courses.map((course) => (
                  <tr key={course._id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{course.courseTitle}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{course.coursePrice || "NA"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        course?.isPublished
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {course?.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {!course.Action && (
                        <Link to={`/edit/${course._id}`} className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition font-medium">
                          <FaRegEdit /> Edit
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/course/${course._id}/lecture/create`} className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
                        <FaChalkboardUser /> Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <p className="text-slate-600 font-medium">No courses found. Create one to get started!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-200">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse p-4 space-y-3">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-200" />
              </div>
            ))
          ) : data?.courses?.length > 0 ? (
            data.courses.map((course) => (
              <div key={course._id} className="p-4 space-y-3">
                <h3 className="font-semibold text-slate-900">{course.courseTitle}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-slate-500">Price</p>
                    <p className="font-medium">₹{course.coursePrice || "NA"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Status</p>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      course?.isPublished
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {course?.isPublished ? "Published" : "Unpublished"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link to={`/edit/${course._id}`} className="flex-1 rounded-lg bg-indigo-50 py-2 text-center text-sm font-medium text-indigo-600 transition hover:bg-indigo-100">
                    Edit
                  </Link>
                  <Link to={`/course/${course._id}/lecture/create`} className="flex-1 rounded-lg bg-slate-100 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                    Lectures
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-600 font-medium">No courses found. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
        

