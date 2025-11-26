import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useCourseCreateMutation } from "../../features/api/courseApi";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    courseTitle: "",
    description: "",
    coursePrice: "",
    category: "development",
    courseLevel: "Beginner",
  });

  const [courseCreate] = useCourseCreateMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.courseTitle.trim()) {
      toast.error("Course title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Course description is required");
      return;
    }
    if (!formData.coursePrice || formData.coursePrice <= 0) {
      toast.error("Valid price is required");
      return;
    }

    setLoading(true);

    try {
      // Send JSON payload (server expects JSON). courseController will normalize and cast types.
      const result = await courseCreate(formData).unwrap();
      toast.success(result?.message || "Course created successfully!");
      navigate("/dashboard");

      // Reset form
      setFormData({
        courseTitle: "",
        description: "",
        coursePrice: "",
        category: "development",
        courseLevel: "beginner",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create course");
      console.error("Error creating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Course
          </h1>
          <p className="text-gray-300">
            Fill in the details below to create an engaging course
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Header Background */}
          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            {/* Course Title */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Course Title *
              </label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                placeholder="e.g., Advanced React.js Development"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
            </div>

            {/* Course Description */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Course Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what students will learn in this course..."
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition resize-none"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-2 mb-8">
              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Price (₹ ) *
                </label>
                <input
                  type="number"
                  name="coursePrice"
                  value={formData.coursePrice}
                  onChange={handleInputChange}
                  placeholder="99"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Two Column Layout - Selects */}
              <div className="grid md:grid-cols-2 gap-2 mb-8">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
                  >
                    <option value="development">Development</option>
                    <option value="Dsa">Dsa</option>
                    <option value="Javascript">Javascript</option>
                    <option value="Mongodb">Mongodb</option>
                    <option value="full-stack">Full-stack</option>
                    <option value="Java">Java</option>
                    
                    <option value="React js">React js</option>
                    <option value="C & C++">C & C++</option>
                    <option value="Next js">Next js</option>
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Level
                  </label>
                  <select
                    name="courseLevel"
                    value={formData.courseLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition transform ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105"
                }`}
              >
                {loading ? "Creating Course..." : "Create Course"}
              </button>

              <button
                type="button"
                className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">💡 Tip:</span> Fill in all required
            fields marked with * to create your course. Make sure your thumbnail
            image is attractive and represents your course well!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
