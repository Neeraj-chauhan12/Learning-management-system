import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRegisterMutation } from "../features/api/authApi";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      role,
    };

    try {
      const result = await register(userData).unwrap();
      toast.success(result?.message || "Signup successful");
      navigate("/");
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("student");
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Signup failed";
      toast.error(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-14">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/95 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.2)] backdrop-blur-xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Create your account</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">Start learning today</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Join our community and unlock new skills with courses built for growth.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">I am a</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-4 w-4 cursor-pointer text-fuchsia-600"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="instructor"
                    checked={role === "instructor"}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-4 w-4 cursor-pointer text-fuchsia-600"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">Instructor</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.01]"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <span>Already have an account? </span>
            <Link to="/login" className="font-semibold text-fuchsia-600 hover:text-fuchsia-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

