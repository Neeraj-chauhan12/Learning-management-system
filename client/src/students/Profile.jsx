import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Course from "./Course";
import Loading from "./Loading";
import { useLoadUserQuery } from "../features/api/authApi";

const Profile = () => {
  const [model, setModel] = useState(false);
  const [name, setName] = useState("Neeraj chauhan");
  const [photoUrl, setPhotoUrl] = useState(
    "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const {data,isLoading}=useLoadUserQuery();
  console.log("hello",data)

  const handlemodel = () => {
    setModel(true)
  };

  const closeModel = () => {
    setModel(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSave = (e) => {
    e.preventDefault();
    if (selectedFile && preview) {
      setPhotoUrl(preview);
    }
    setName((n) => (n.trim() === "" ? n : n));
    closeModel();
  };

  const courses = [1,2,3,5,5];
 // const isLoading=true

  return (
    <>
      <Navbar />
      <div className="w-screen md:pl-48 bg-gray-100">
       <h1 className="text-4xl pt-28 ml-7 mb-3 font-bold text-center text-black">Profile</h1>
        <div className=" text-black flex md:flex-row flex-col gap-6 items-center">

           
           
            
          <div className="avatar">
            <div className="w-36 rounded-full overflow-hidden">
              <img src={photoUrl} alt="profile" />
            </div>
          </div>

          <div>
            <h1 className="text-black text-2xl">Name: {data?.user?.username}</h1>
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
          <h1 className="text-3xl my-5">Your courses</h1>
          <div className="flex flex-wrap gap-5">
            {
               data?.user?.enrollCourse.length===0
              ? <p className="text-black  text-2xl">you have not enroll yet</p>
              : data?.user?.enrollCourse?.map((course) => <Course course={course} key={data?.user?._id} />)}
          </div>
        </div>

        {/* Modal */}
        {model && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModel}
            />

            <form
              onSubmit={handleSave}
              className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6"
              role="dialog"
              aria-modal="true"
            >
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={preview || photoUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-sm"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModel}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
