import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRegisterMutation } from "../features/api/authApi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [
    register,
    {
     data,
     error,
     isLoading,
     isSuccess
    }

  ]=useRegisterMutation();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    const inputData=userData;
    const action=register;
    await action(inputData)
    console.log("input",userData)
    

   
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-xs text-purple-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/" className="text-purple-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
