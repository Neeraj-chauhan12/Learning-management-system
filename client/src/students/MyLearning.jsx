import React from "react";
import Course from "../components/Course";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const courses = [1, 6, 5, 4, 8];
  const isLoading = false; // Changed to false for demo, should be based on actual loading state

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-purple-600 pt-28 pb-12 px-4">
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
                className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:opacity-95"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((_, id) => (
                <Course key={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyLearning;
