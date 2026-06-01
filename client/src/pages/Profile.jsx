import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Course from "../components/Course";
import Loading from "../students/Loading";
import { useLoadUserQuery } from "../features/api/authApi";
import UpdateProfile from "../students/UpdateProfile";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useCourseGetQuery } from "../features/api/courseApi";

const Profile = () => {
  const [model, setModel] = useState(false);
  const [username, setUserName] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const { data: instructorCourses, refetch: refetchCourses } = useCourseGetQuery();
  console.log("instructorCourses", instructorCourses);
  console.log("user data", data);

  const handlemodel = () => {
    setModel(true);
    setUserName(data?.user?.username || "");
  };

  // Determine if user is instructor
  const isInstructor = data?.user?.role === "instructor";
  const userCourses = isInstructor ? instructorCourses?.courses : data?.user?.enrollCourse;
  const coursesCount = userCourses?.length || 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-purple-600 pt-28 pb-12 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={data?.user?.photoURL || "https://img.daisyui.com/images/profile/demo/batperson@192.webp"}
                  alt="profile"
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl"
                />
              </div>

              <div className="text-white text-center sm:text-left flex-1">
                <h1 className="text-4xl font-bold mb-2">{data?.user?.username}</h1>
                <p className="text-lg text-white/90 mb-1">{data?.user?.email}</p>
                <p className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur mb-4">
                  {data?.user?.role}
                </p>
                <button
                  onClick={handlemodel}
                  className="ml-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 font-semibold text-indigo-600 shadow-lg transition hover:bg-slate-100"
                >
                  <MdEdit /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-950 mb-2">
                {isInstructor ? "Your Teaching Courses" : "Your Courses"}
              </h2>
              <p className="text-slate-600">
                {isInstructor ? "Courses you have created and are teaching" : "Courses you have enrolled in"}
              </p>
            </div>
            {isInstructor && (
              <Link
                to="/create"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-95"
              >
                + Create Course
              </Link>
            )}
          </div>

          {coursesCount === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-lg shadow-slate-900/5">
              <p className="text-lg font-medium text-slate-600">
                {isInstructor ? "You haven't created any courses yet" : "You haven't enrolled in any courses yet"}
              </p>
              <Link
                to={isInstructor ? "/create" : "/"}
                className="mt-4 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:opacity-95"
              >
                {isInstructor ? "Create Your First Course" : "Explore Courses"}
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userCourses?.map((data,id) => (
                <Course data={data} key={id} />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {model && <UpdateProfile setModel={setModel} refetch={refetch} />}
      </div>
    </>
  );
};

export default Profile;
