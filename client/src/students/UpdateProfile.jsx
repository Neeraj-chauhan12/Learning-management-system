import React from "react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../features/api/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ setModel,refetch }) => {
  const [username, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  //const [model, setModel] = useState(false);

  const navigate=useNavigate();
  const { data, isLoading } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading }] =
    useUpdateUserMutation();

  const closeModel = () => {
    setModel(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setProfilePhoto(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated");
      //alert("Profile updated")
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
    
    closeModel();
    refetch();
  };

  return (
    <div>
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
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={
                  data?.user?.photoURL ||
                  "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                }
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
              disabled={updateUserIsLoading}
              className={`px-4 py-2 rounded text-white font-semibold transition ${
                updateUserIsLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {updateUserIsLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
