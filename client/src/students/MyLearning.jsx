import React from "react";
import Course from "../components/Course";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useLoadUserQuery } from "../features/api/authApi";

const MyLearning = () => {
 const {data}=useLoadUserQuery();
 
 const courses=data?.user?.enrollCourse || [];
 const isLoading=false;
  return (
    <>
      <Navbar /> 

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-slate-950 pt-28 pb-12 px-4">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-white mb-2">My Learning</h1>
            <p className="text-lg text-white/90">Continue learning from where you left off</p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Loading key={i} />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-lg shadow-slate-900/5">
              <p className="text-lg font-medium text-slate-600 mb-4">You are not enrolled in any courses yet</p>
              <Link
                to="/"
                className="inline-block rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:opacity-95"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Course key={index} data={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyLearning;

