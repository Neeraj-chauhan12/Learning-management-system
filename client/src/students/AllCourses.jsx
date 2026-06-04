import React, { useEffect } from "react";
import Course from "../components/Course";
import { useLocation } from "react-router-dom";
import { useGetAllCoursesQuery } from "../features/api/courseApi";

const AllCourses = () => {
  const location = useLocation();

  const { data, isLoading } = useGetAllCoursesQuery();
  
  useEffect(() => {
    if (location.pathname === "/") {
      console.log("home page");
    }
  }, [location.pathname]);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Popular courses
          </p>
          <h2 className="mt-4 text-4xl font-bold text-slate-950">
            Browse our most in-demand learning paths
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Choose from expert-led programs designed to help you grow faster in
            your career.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-[32px] bg-white p-6 shadow-lg shadow-slate-900/5"
              >
                <div className="mb-6 h-48 rounded-3xl bg-slate-200" />
                <div className="h-4 w-3/4 rounded bg-slate-200 mb-4" />
                <div className="h-3 w-full rounded bg-slate-200 mb-2" />
                <div className="h-3 w-5/6 rounded bg-slate-200" />
              </div>
            ))
          ) : data?.courses?.length > 0 ? (
            data?.courses?.map((data) => (
              <Course key={data?._id} data={data} />
            ))
          ) : (
            <div className="col-span-full rounded-[32px] bg-white p-10 text-center shadow-lg shadow-slate-900/5">
              <p className="text-lg font-medium text-slate-700">
                No courses found yet.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Please check back later for new learning experiences.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCourses;

