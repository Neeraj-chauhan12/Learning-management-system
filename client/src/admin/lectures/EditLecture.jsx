import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdCloudUpload } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { useEditLectureMutation, useUpdateLectureMutation } from '../../features/api/courseApi'

const EditLecture = () => {
  const { lectureId, courseId } = useParams()
  const navigate = useNavigate()
  const [title,setTitle]=useState("");
  const [uploadVideo,setUploadVideo]=useState(null);
  const [isFree,setIsFree]=useState(false);
  const [mediaProgress,setMediaProgess]=useState(false);
  const [uploadProgress,setUploadProgess]=useState(0);
  const [btnDisable,setBtnDisable]=useState(true)
  const loading=false;
 

  const MEDIA_API="http://localhost:3000/api/video-upload"

  const [updateLecture] = useEditLectureMutation();

  const handleUpdateLectureData=async(e)=>{
    e.preventDefault()
    // if(!title.trim()) return toast.error("Title required")
    // if(!uploadVideo) return toast.error("Video file required")
      try {
    await updateLecture({
      lectureTitle:title,
      videoInfo:uploadVideo,
      isPreviewFree:isFree,
      lectureId
    }).unwrap( );
      toast.success("Lecture updated successfully")
      } catch (error) {
        console.error(error)
        toast.error("Failed to update lecture")
        
      }
    }

 
  const [videoPreview, setVideoPreview] = useState(null)
  const handleVideoFile =async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file')
      return
    }
    if (file.size > 500 * 1024 * 1024) {
      toast.error('Max file size 500MB')
      return
    }
    
    if(file){
        const formData=new FormData();
        formData.append("file",file)
        setMediaProgess(true);

        try {
            const res=await axios.post(`${MEDIA_API}/`,formData,{
                onUploadProgress:({loaded,total})=>{
                    setUploadProgess(Math.round((loaded*100)/total))
                }
            })

            if(res.data.success){
                console.log(res)
                setUploadVideo({videUrl:res.data.data.url,publicId:res.data.data.public_id})
                toast.success(res?.data?.message || "video uploaded successfully")
                setBtnDisable(false)
            }
            
        } catch (error) {
            toast.error("video upload failed");
            
        }finally{
            setMediaProgess(false)
        }
    }
   
  }



  const handleRemoveCourse = () => {
    if (window.confirm('Remove this lecture from the course?')) {
      toast.success('Lecture removed from course')
      // TODO: call backend API to remove lecture from course
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Edit Lecture</h1>
          <p className="text-gray-300 text-sm">Course ID: {courseId} | Lecture ID: {lectureId}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

          <form  className="p-8 md:p-12 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Lecture Title *</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                placeholder="Enter lecture title"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
            </div>

          


            {/* Video Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Lecture Video</label>
              <div>
                {!videoPreview ? (
                  <label className="flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition">
                    <MdCloudUpload className="text-purple-500 mr-3 text-2xl" />
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <input type="file" accept="video/*" onChange={handleVideoFile} className="sr-only" />
                  </label>
                ) : (
                  <div className="relative">
                    <video controls className="w-full h-48 bg-black rounded-lg">
                      <source src={videoPreview} />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                     
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>

             <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Is This Lecture Free?</label>
                <div className="flex items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={isFree}
                    onChange={(e)=>{setIsFree(e.target.value)}}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-sm text-gray-600">{isFree ? 'Yes, Free' : 'No, Paid'}</span>
                </div>
              </div>


{/* progress */}
              <div>
                <progress className="progress progress-success w-full" value={uploadProgress} max="100"></progress>
                <h1>{uploadProgress}% uploaded</h1>
              </div>
          

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <button
               onClick={(e)=>handleUpdateLectureData(e)}
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {loading ? 'Updating...' : 'Update Lecture'}
              </button>

              <button
                type="button"
                onClick={handleRemoveCourse}
                className="py-3 px-6 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
              >
                Remove Course
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="py-3 px-6 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
