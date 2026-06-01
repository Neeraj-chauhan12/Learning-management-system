import React from "react";
import { Link } from "react-router-dom";
import { useLoadUserQuery } from "../features/api/authApi";

const Course = ({ data: course }) => {
  const { data } = useLoadUserQuery();
  console.log("course data", course);

  return (
    <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="overflow-hidden rounded-t-[32px]">
        <img
          src={course?.courseThumbnail || "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=1000&q=80"}
          alt={course?.courseTitle || "Course thumbnail"}
          className="h-56 w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-950">{course?.courseTitle || "Untitled Course"}</h2>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            {course?.courseLevel || "Beginner"}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {course?.description || "Build your skills with expert-led lectures and practical projects."}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <img
            className="h-11 w-11 rounded-full object-cover"
            src={data?.user?.photoURL || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"}
            alt={data?.user?.username || "Instructor"}
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">{data?.user?.username || "Instructor"}</p>
            <p className="text-xs text-slate-500">{course?.creator?.role || "Instructor"}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
            ₹{course?.coursePrice ?? "Free"}
          </span>
          <Link
            to={`/course-detail/${course?._id}`}
            className="inline-flex rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Course;
