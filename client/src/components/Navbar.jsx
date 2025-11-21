import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import pic from "../../public/WhatsApp Image 2025-09-21 at 00.52.19_645e770d.jpg";
import { CiDark } from "react-icons/ci";

const Navbar = () => {
  const user = false;
  const role="instructor";
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSlideBar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <nav className="w-full bg-gray-900 fixed top-0 left-0 right-0 py-4 px-8 flex items-center z-10 justify-between shadow-md">
      <div className="text-2xl font-bold text-white flex gap-3 tracking-wide">
        <img
          className="md:h-16 md:w-16 h-7 w-7 rounded-full object-contain "
          src={pic}
          alt=""
        />
        <div className="flex md:justify-center justify-start items-center">
          <h1 className="md:text-2xl text-sm">Chauhan KnowledgeHub</h1>
        </div>
      </div>

      <div>
        {/* for desktop */}
        {user ? (
          <div className="hidden md:block md:flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="md:gap-9  md:flex hidden ">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn w-8 rounded-full ">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      className="w-full rounded-full"
                      src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                    />
                  </div>
                </div>
              </div>
              <div
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
               
                <Link to={"/profile"}>My Account</Link>
                <Link to={"/my-learning"}>My learning</Link>
                <Link to={"#"}>Log out</Link>
                <Link to={"#"}>Dashboard</Link>
              </div>
            </div>
            <div className="">
              <button className="text-4xl  text-black bg-gray-300 rounded-full">
                <CiDark />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* mobile */}
      <button
          onClick={handleSlideBar}
        
        className="md:hidden text-3xl text-white"
      >
        <IoReorderThreeOutline />
      </button>

      {/* Mobile Sidebar */}
      {showSidebar && role==="instructor" && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeSidebar}
          />
          
          {/* Sidebar Panel */}
          <div className="absolute left-0 top-0 h-full w-64 bg-gray-900 shadow-lg z-50 animate-in slide-in-from-left duration-300">
            {/* Close Button */}
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition"
            >
              <RxCross2 />
            </button>

            {/* Sidebar Content */}
            <div className="pt-16 px-6 space-y-4">
              {user ? (
                <>
                  <Link
                    to="/"
                    className="block px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700"
                    onClick={closeSidebar}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700"
                    onClick={closeSidebar}
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-white hover:bg-gray-800 rounded transition duration-200"
                    onClick={closeSidebar}
                  >
                   My Account
                  </Link>
                  <Link
                    to="/my-learning"
                    className="block px-4 py-3 text-white hover:bg-gray-800 rounded transition duration-200"
                    onClick={closeSidebar}
                  >
                   My learning
                   
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-3 text-white hover:bg-gray-800 rounded transition duration-200"
                    onClick={closeSidebar}
                  >
                    Log out
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-3 text-white hover:bg-gray-800 rounded transition duration-200"
                    onClick={closeSidebar}
                  >
                    Dashboard
                  </Link>
                 
                  <button className="w-full mt-4 text-2xl text-black bg-gray-300 rounded-full p-3 hover:bg-gray-400 transition">
                    <CiDark />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
