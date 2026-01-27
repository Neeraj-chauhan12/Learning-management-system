import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import { useCourseGetQuery, useEditCoursesMutation, useGetCourseByIdQuery, useTogglePublishCourseMutation } from "../../features/api/courseApi";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useCourseGetQuery();
  const [EditCourses] = useEditCoursesMutation();

  const { data: courseData,refetch } = useGetCourseByIdQuery(id);
  console.log("course data:", courseData?.course?.isPublished);

  const [togglePublishCourse] = useTogglePublishCourseMutation();


  const existing = useMemo(() => {
    const list = data?.courses || [];
    return list.find((c) => c._id === id) || {};
  }, [data, id]);

  const [formData, setFormData] = useState({
    courseTitle: "",
    description: "",
    coursePrice: "",
    category: "development",
    courseLevel: "beginner",
    thumbnailUrl: "",
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("course id:", id)

  useEffect(() => {
    if (existing && Object.keys(existing).length > 0) {
      setFormData({
        courseTitle: existing.courseTitle || "",
        description: existing.description || existing?.courseDescription || "",
        coursePrice: existing.coursePrice || "",
        category: existing.category || "development",
        courseLevel: existing.courseLevel || existing.level || "beginner",
        thumbnailUrl: existing.thumbnail || existing.photoURL || "",
      });
      setPreview(existing.thumbnail || existing.photoURL || "");
    }
  }, [existing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview("");
    setFormData((prev) => ({ ...prev, thumbnailUrl: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseTitle.trim()) return toast.error("Title required");
    if (!formData.description.trim())
      return toast.error("Description required");
    if (!formData.coursePrice) return toast.error("Price required");

    setLoading(true);
    try {
      // TODO: call API update endpoint. Using mock for now.
      // Build FormData if file exists
      const fd = new FormData();
      fd.append("courseTitle", formData.courseTitle);
      fd.append("description", formData.description);
      fd.append("coursePrice", formData.coursePrice);
      fd.append("category", formData.category);
      fd.append("courseLevel", formData.courseLevel);
      if (file) fd.append("thumbnail", file);

      await EditCourses({ courseId: id, formData }).unwrap();







      // Example: await updateCourse({id, body: fd}).unwrap()
      toast.success("Course updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };


  const publishStatusHandler = async (action) => {
    try {
      const res = await togglePublishCourse({ courseId: id, query: action })
      if (res?.data) {
        console.log("Publish status updated:", res?.data);
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update publish status");

    }
  }

  // const isPublish=true;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Course</h1>
          <p className="text-gray-600">Update course details and thumbnail</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-bold">Add detail information regarding course</h1>
              <div className="flex items-center gap-2">
                <Link to={`/create-lecture/${id}`} className="btn text-sm">
                  Go to lecture page
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="w-full md:w-1/3">
                <h2 className="card-title">Basic Course Information</h2>
                <p className="text-sm text-gray-500">Make changes to your courses here. Click save when you're done</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button disabled={courseData?.course?.lectures?.length === 0} onClick={() => publishStatusHandler(courseData?.course?.isPublished ? "false" : "true")} className="btn text-sm">
                  {courseData?.course?.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button className="btn text-sm">
                  Remove Course
                </button>
              </div>
            </div>








            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                className="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  name="coursePrice"
                  type="number"
                  value={formData.coursePrice}
                  onChange={handleInputChange}
                  className="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <select
                  name="courseLevel"
                  value={formData.courseLevel}
                  onChange={handleInputChange}
                  className="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

            </div>



            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <div className="mt-2">
                {!preview ? (
                  <label className="flex items-center justify-center px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-indigo-400">
                    <MdCloudUpload className="text-indigo-500 mr-3" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="thumbnail"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {loading ? "Updating..." : "Update Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
