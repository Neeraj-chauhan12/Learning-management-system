import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Lecture from "./Lecture";
import { IoMdAdd } from "react-icons/io";
import { useCreateLectureMutation, useGetLectureQuery } from "../../features/api/lectureApi";

const CreateLectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [CreateLecture] = useCreateLectureMutation();
  const { data, isLoading, isError, refetch } = useGetLectureQuery(courseId);

  const [loading, setLoading] = useState(false);
  const [lectureTitle, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureTitle.trim()) return toast.error("Title required");
    setLoading(true);
    try {
      await CreateLecture({ lectureTitle, courseId }).unwrap();
      toast.success("Lecture created successfully");
      refetch();
      setTitle("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Form Section */}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Create Lecture</h1>
            <p className="mt-1 text-slate-600">Add lecture content to your course</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/5">
          <div className="border-b border-slate-200 bg-slate-100 p-6">
            <h2 className="text-xl font-semibold text-slate-950">Add New Lecture</h2>
            <p className="mt-1 text-sm text-slate-600">Course ID: {courseId}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Lecture Title *
              </label>
              <input
                type="text"
                name="title"
                value={lectureTitle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to React Hooks"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
              >
                <IoMdAdd /> {loading ? "Creating..." : "Create Lecture"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lectures List */}
      <div className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-950 mb-6">Course Lectures</h2>
        
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-700 border border-red-200">
            Failed to load lectures
          </div>
        ) : data?.lectures?.length === 0 ? (
          <div className="rounded-lg bg-slate-50 p-8 text-center border border-slate-200">
            <p className="text-slate-600 font-medium">No lectures yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLectures;

