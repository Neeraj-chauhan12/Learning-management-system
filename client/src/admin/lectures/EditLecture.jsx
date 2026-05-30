import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "../../features/api/courseApi";

const EditLecture = () => {
  const { lectureId, courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uploadVideo, setUploadVideo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgess] = useState(false);
  const [uploadProgress, setUploadProgess] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const MEDIA_API = "http://localhost:3000/api/video-upload/";

  const [editLecture] = useEditLectureMutation();
  const [removeLecture] = useRemoveLectureMutation();

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setTitle(lecture.lectureTitle);
      setIsFree(lecture?.isPreviewFree);
      setUploadVideo(lecture.videoInfo);
    }
  }, [lecture]);

  const handleEditLectureData = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await editLecture({
        lectureTitle: title,
        videoInfo: uploadVideo,
        isPreviewFree: isFree,
        lectureId,
        courseId,
      }).unwrap();
      toast.success("Lecture updated successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lecture");
    } finally {
      setUpdateLoading(false);
    }
  };

  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setMediaProgess(true);
    try {
      const res = await axios.post(`${MEDIA_API}`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgess(Math.round((loaded * 100) / total));
        },
      });
      if (res.data.success) {
        setUploadVideo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        setVideoPreview(res.data.data.url);
        toast.success(res?.data?.message || "Video uploaded successfully");
        setBtnDisable(false);
      }
    } catch (error) {
      toast.error("Video upload failed");
    } finally {
      setMediaProgess(false);
    }
  };

  const handleRemoveCourse = async () => {
    setRemoveLoading(true);
    try {
      await removeLecture(lectureId).unwrap();
      toast.success("Lecture removed successfully");
      navigate(`/course/${courseId}/lecture/create`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove lecture");
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">Edit Lecture</h1>
          <p className="mt-1 text-sm text-slate-600">
            Course ID: <span className="font-mono">{courseId}</span> | Lecture ID: <span className="font-mono">{lectureId}</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/5">
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

          <form className="p-6 md:p-12 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Lecture Title *
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter lecture title"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Lecture Video
              </label>
              <div>
                {!videoPreview ? (
                  <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-12 cursor-pointer transition hover:border-indigo-500 hover:bg-indigo-50">
                    <MdCloudUpload className="text-4xl text-indigo-500" />
                    <span className="text-sm font-medium text-slate-600">Click to upload or drag and drop</span>
                    <span className="text-xs text-slate-500">MP4, WebM, etc. (Max 500MB)</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFile}
                      className="sr-only"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <video
                      controls
                      className="h-64 w-full rounded-lg bg-black object-cover"
                      src={videoPreview}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVideoPreview(null);
                        setUploadVideo(null);
                        setBtnDisable(true);
                      }}
                      className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
                    >
                      <AiOutlineClose className="text-lg" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {mediaProgress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Uploading...</span>
                  <span className="text-indigo-600 font-semibold">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Free Preview */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 transition focus:ring-indigo-500"
                />
                <div>
                  <p className="font-medium text-slate-900">Free Preview</p>
                  <p className="text-xs text-slate-600">Allow non-enrolled users to preview this lecture</p>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="order-3 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveCourse}
                disabled={removeLoading}
                className="order-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white shadow-lg shadow-red-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 sm:order-2"
              >
                {removeLoading ? "Removing..." : "Remove Lecture"}
              </button>
              <button
                onClick={handleEditLectureData}
                disabled={updateLoading}
                className="order-1 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 sm:order-3"
              >
                {updateLoading ? "Updating..." : "Update Lecture"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
