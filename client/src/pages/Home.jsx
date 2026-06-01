import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Course from "../admin/Course";
import { useLocation } from "react-router-dom";
import HeroSection from "../students/StudentHome";
import Courses from "../students/Courses";
import { useLoadUserQuery } from "../features/api/authApi";

import { IoMdAdd } from "react-icons/io";
import { FaChartBar, FaUsers, FaBook, FaStar } from "react-icons/fa";
import { MdEdit, MdVisibility } from "react-icons/md";
import AdminHome from "../admin/AdminHome";
import StudentHome from "../students/StudentHome";

const Home = () => {
  const location = useLocation();
  const { data, refetch } = useLoadUserQuery();
  const isInstructor = data?.user?.role === "instructor";
  

  useEffect(() => {
    if (location.pathname === "/") {
      refetch();
    }
  }, [location.pathname]);


 
  if (isInstructor) {
    return (
      <>
        <Navbar />
        
        {/* Instructor Dashboard Hero */}
        <AdminHome />
       
      </>
    );
  }

  // Student View
  return (
    <>
      <Navbar />
      <StudentHome />
      <Courses />
    </>
  );
};

export default Home;
