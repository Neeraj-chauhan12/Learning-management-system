import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreateLectureMutation,
  useGetLectureQuery,
} from "../../features/api/courseApi";
import Lecture from "./Lecture";

const CreateLectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [CreateLecture] = useCreateLectureMutation();
  const { data, isLoading, isError, refetch } = useGetLectureQuery(courseId);
  console.log("get lecutres", data);

  const [loading, setLoading] = useState(false);
  const [lectureTitle, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureTitle.trim()) return toast.error("Title required");
    setLoading(true);
    try {
      await CreateLecture({ lectureTitle, courseId }).unwrap();
      toast.success("Lecture created (mock)");
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">
          Let's add lectures, add some basic details for your new lecture
        </h2>
        <p className="text-sm text-gray-500 mb-4">Course ID: {courseId}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              value={lectureTitle}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600"
              }`}
            >
              {loading ? "Creating..." : "Create Lecture"}
            </button>
          </div>
        </form>
      </div>

      {/* lecture data */}

      <div className="mt-10 px-44">
        {isLoading ? (
          <p>Loading lectures</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load lectures..</p>
        ) : data.lectures.length == 0 ? (
          <p>No lecture available</p>
        ) : (
          data.lectures.map((lecture, index) => (
            <Lecture
              key={lecture._id}
              lecture={lecture}
              courseId={courseId}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLectures;
