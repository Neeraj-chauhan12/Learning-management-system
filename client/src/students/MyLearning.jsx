import React from "react";
import Course from "./Course";
import Navbar from "../components/Navbar";
import Loading from "./Loading";

const MyLearning = () => {
  const courses = [1, 6, 5, 4, 8];
  const isLoading = true;
  return (
    <>
      <Navbar />
      <div className="max-w-screen bg-gray-50 md:pl-32 p-3">
        <h1 className="text-black text-3xl font-semibold mb-5 pt-24">
          My Learning
        </h1>

        <div className=" flex flex-wrap gap-5">
          {isLoading ? (
            <Loading />
          ) : courses.length === 0 ? (
            "You are not enroll in any course"
          ) : (
            courses.map((_, id) => <Course key={id} />)
          )}
        </div>
      </div>
    </>
  );
};

export default MyLearning;
