import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Course from "./Course";
import Loading from "./Loading";
import { useLoadUserQuery } from "../features/api/authApi";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  const [model, setModel] = useState(false);
  const [username, setUserName] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();

  const handlemodel = () => {
    setModel(true);
    setUserName(data?.user?.username || "");
  };

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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-950 mb-2">Your Courses</h2>
            <p className="text-slate-600">Courses you have enrolled in</p>
          </div>

          {data?.user?.enrollCourse.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-lg shadow-slate-900/5">
              <p className="text-lg font-medium text-slate-600">You haven't enrolled in any courses yet</p>
              <Link
                to="/"
                className="mt-4 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:opacity-95"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.user?.enrollCourse?.map((course) => (
                <Course course={course} key={course?._id} />
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
