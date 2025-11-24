import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Course from "../students/Course";
import { useLocation } from "react-router-dom";
import HeroSection from "../students/HeroSection";
import Courses from "../students/Courses";
import { useLoadUserQuery } from "../features/api/authApi";

const Home = () => {
  //const isLoading = false;
  const courses = [5, 6, 4, 5, 6, 5, 4, 6];
  const location = useLocation();

  const { data, isLoading,refetch } = useLoadUserQuery();

  useEffect(() => {
    if (location.pathname === "/") {
      console.log("home page");
    }
    refetch();
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <HeroSection />

      {/* Courses Section */}
      <Courses />
    </>
  );
};

export default Home;
