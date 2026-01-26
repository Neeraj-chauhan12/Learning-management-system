import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useCourseGetQuery } from "../../features/api/courseApi";
import { FaRegEdit } from "react-icons/fa";


const CourseDetail = () => {
  const { data } = useCourseGetQuery();

  return (
    <div className="w-full min-h-screen bg-gray-200 pt-24 px-4 md:px-16">
      <div className="mb-4">
        <Link to={"/create"}>
          <button className="btn px-5 py-2 flex gap-2 items-center rounded-2xl btn-neutral">
            <IoMdAdd />
            Course Create
          </button>
        </Link>
      </div>

      <div className="hidden md:grid md:grid-cols-5 gap-4 mt-3 mb-2 font-semibold text-lg">
        <div>Title</div>
        <div>Price</div>
        <div>Status</div>
        <div>Action</div>
        <div>Lectures</div>
      </div>

      <div className="space-y-3">
        {data?.courses?.map((c) => (
          <div
            className="bg-white rounded p-3 md:grid md:grid-cols-5 gap-4 items-center"
            key={c._id}
          >
            <div className="font-medium">{c.courseTitle}</div>
            <div>{c.coursePrice ? c.coursePrice : <span className="text-gray-500">NA</span>}</div>
            <div>
              {c?.isPublished ? (
                <button className="btn btn-success">Published</button>
              ) : (
                <button className="btn btn-soft bg-gray-600 text-white">Unpublished</button>
              )}
            </div>
            <div>
              {!c.Action && (
                <Link to={`/edit/${c._id}`} className="flex items-center gap-2 text-blue-600">
                  <FaRegEdit />
                  <span>Edit</span>
                </Link>
              )}
            </div>
            <div>
              <Link to={`/course/${c._id}/lecture/create`} className="btn btn-sm btn-outline">
                Go To Lecture
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
        

