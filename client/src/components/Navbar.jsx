import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import pic from "../../public/WhatsApp Image 2025-09-21 at 00.52.19_645e770d.jpg";
import { CiDark } from "react-icons/ci";
import { useLogoutUserMutation } from "../features/api/authApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  const closeSidebar = () => setShowSidebar(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      closeSidebar();
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Profile", to: "/profile" },
    ...(user?.role !== "instructor" ? [{ label: "My Learning", to: "/my-learning" }] : []),
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/95 px-6 py-4 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-white">
          <img src={pic} alt="Logo" className="h-11 w-11 rounded-2xl object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Knowledge Hub</p>
            <h1 className="text-lg font-semibold text-white">Chauhan Learning</h1>
          </div>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
              {user?.role === "instructor" && (
                <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  Dashboard
                </Link>

                 <Link
                  to="/my-courses"
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  My Courses
                </Link>
                </div>


              )}
              <button
                onClick={handleLogout}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700 md:hidden"
          onClick={() => setShowSidebar(true)}
          aria-label="Open mobile menu"
          aria-expanded={showSidebar}
        >
          <IoReorderThreeOutline className="text-2xl" />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm transform bg-slate-950 shadow-2xl shadow-slate-950/30 transition-transform duration-300 ease-out md:hidden ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col justify-between px-6 py-6">
          <div>
            <div className="flex items-center justify-between">
             
              <button
                onClick={closeSidebar}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700"
                aria-label="Close mobile menu"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>

            <div className="mt-8 space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className="block rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-4 text-base font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-900"
                >
                  {item.label}
                </Link>
              ))}

              {user?.role === "instructor" && (
                <div className="flex flex-col gap-3">
                <Link
                  to="/dashboard"
                  onClick={closeSidebar}
                  className="block rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  Dashboard
                </Link>

                  <Link
                  to="/my-courses"
                  onClick={closeSidebar}
                  className="block rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  My Courses
                </Link>


                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full rounded-3xl mt-2 bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeSidebar}
                  className="block rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-4 text-center text-base font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeSidebar}
                  className="block rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-4 text-center text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  Signup
                </Link>
              </>
            )}

           
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          showSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />
    </nav>
  );
};

export default Navbar;

