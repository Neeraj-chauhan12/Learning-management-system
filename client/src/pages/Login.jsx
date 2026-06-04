import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLoginMutation } from "../features/api/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const result = await login(userData).unwrap();
      toast.success(result?.message || "Login successful");
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-14">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/90 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.2)] backdrop-blur-xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Welcome Back</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">Login to your account</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Access all courses, continue your learning, and manage your profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
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
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-violet-600 hover:text-violet-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01]"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <span>Don&apos;t have an account? </span>
            <Link to="/signup" className="font-semibold text-violet-600 hover:text-violet-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

