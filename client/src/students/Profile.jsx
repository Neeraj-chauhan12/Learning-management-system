import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Course from "./Course";
import Loading from "./Loading";
import { useLoadUserQuery } from "../features/api/authApi";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const [model, setModel] = useState(false);
  const [username, setUserName] = useState("");

  const { data, isLoading } = useLoadUserQuery();

  const handlemodel = () => {
    setModel(true);
    setUserName(data?.user?.username || "");
  };

  

  return (
    <>
      <Navbar />
      <div className="w-screen md:pl-48 bg-gray-100">
        <h1 className="text-4xl pt-28 md:ml-7 mb-3 font-bold md:text-justify text-center text-black">
          Profile
        </h1>
        <div className=" text-black flex md:flex-row flex-col gap-6 items-center">
          <div className="avatar">
            <div className="w-36 rounded-full overflow-hidden">
              <img
                src={
                  data?.user?.photoURL ||
                  "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                }
                alt="profile"
              />
            </div>
          </div>

          <div className="md:text-justify text-center">
            <h1 className="text-black text-2xl">
              Name: {data?.user?.username}
            </h1>
            <h1 className="text-black text-2xl">Email: {data?.user?.email}</h1>
            <h1 className="text-black text-2xl">Role: {data?.user?.role}</h1>
            <button
              onClick={handlemodel}
              className="bg-black border-2 border-gray-800 mt-2 px-3 py-2 rounded-2xl text-white"
            >
              Edit profile
            </button>
          </div>
        </div>

        <div className=" ">
          <h1 className="md:text-3xl  text-4xl font-bold my-5 md:text-justify text-center">Your courses</h1>
          <div className="flex flex-wrap gap-5">
            {data?.user?.enrollCourse.length === 0 ? (
              <p className="text-black md:text-justify text-center md:ml-0 ml-24 text-2xl">you have not enroll yet</p>
            ) : (
              data?.user?.enrollCourse?.map((course) => ( 
                <Course course={course} key={data?.user?._id} />
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        {model && <UpdateProfile setModel={setModel} />}
      </div>
    </>
  );
};

export default Profile;
