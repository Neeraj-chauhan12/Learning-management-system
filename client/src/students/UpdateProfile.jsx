import React, { useState } from "react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../features/api/authApi";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

const UpdateProfile = ({ setModel, refetch }) => {
  const [username, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading }] =
    useUpdateUserMutation();

  const closeModel = () => {
    setModel(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePhoto(file);
    } else if (file) {
      toast.error("Please select an image file");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username || data?.user?.username);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    
    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated successfully");
      closeModel();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      {/* Modal Card */}
      <form
        onSubmit={handleSave}
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Background */}
        <div className="h-1 bg-indigo-600" />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-950">Edit Profile</h2>
            <button
              type="button"
              onClick={closeModel}
              className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
              aria-label="Close"
            >
              <RxCross2 className="text-xl" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={data?.user?.username || "Enter your name"}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      data?.user?.photoURL ||
                      "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                    }
                    alt="profile preview"
                    className="h-24 w-24 rounded-full border-4 border-slate-100 object-cover"
                  />
                  <label className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-indigo-500 p-2 text-white cursor-pointer transition hover:bg-indigo-600">
                    <MdEdit className="text-lg" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Upload photo</p>
                  <p className="text-xs text-slate-600 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModel}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateUserIsLoading}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95"
            >
              {updateUserIsLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;

