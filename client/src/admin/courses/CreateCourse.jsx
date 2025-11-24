import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdCloudUpload } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'

const CreateCourse = () => {
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'development',
    level: 'beginner',
    language: 'english',
    thumbnail: null,
    instructor: 'John Doe',
    duration: '',
    studentsEnrolled: 0,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setFormData(prev => ({
      ...prev,
      thumbnail: file
    }))

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }))
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Course title is required')
      return
    }
    if (!formData.description.trim()) {
      toast.error('Course description is required')
      return
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Valid price is required')
      return
    }
    if (!formData.duration || formData.duration <= 0) {
      toast.error('Course duration is required')
      return
    }
    if (!formData.thumbnail) {
      toast.error('Thumbnail image is required')
      return
    }

    setLoading(true)

    try {
      // Create FormData for file upload
      const fd = new FormData()
      fd.append('title', formData.title)
      fd.append('description', formData.description)
      fd.append('price', formData.price)
      fd.append('category', formData.category)
      fd.append('level', formData.level)
      fd.append('language', formData.language)
      fd.append('thumbnail', formData.thumbnail)
      fd.append('instructor', formData.instructor)
      fd.append('duration', formData.duration)

    
      toast.success('Course created successfully!')
      console.log('Form Data:', formData)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'development',
        level: 'beginner',
        language: 'english',
        thumbnail: null,
        instructor: 'John Doe',
        duration: '',
        studentsEnrolled: 0,
      })
      setPreview(null)
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create course')
      console.error('Error creating course:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Course</h1>
          <p className="text-gray-300">Fill in the details below to create an engaging course</p>
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
                name="title"
                value={formData.title}
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

            {/* Thumbnail Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Course Thumbnail *
              </label>
              
              {!preview ? (
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 hover:bg-purple-50 transition">
                  <MdCloudUpload className="mx-auto text-4xl text-purple-500 mb-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="thumbnail-input"
                  />
                  <label
                    htmlFor="thumbnail-input"
                    className="cursor-pointer text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Click to upload
                  </label>
                  <p className="text-gray-500 text-sm mt-2">
                    or drag and drop (PNG, JPG, GIF up to 5MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Course Thumbnail"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="99"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="40"
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>
            </div>

            {/* Two Column Layout - Selects */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
            </div>

            {/* Instructor */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Instructor Name
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition transform ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105'
                }`}
              >
                {loading ? 'Creating Course...' : 'Create Course'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
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
            <span className="font-semibold">💡 Tip:</span> Fill in all required fields marked with * to create your course. Make sure your thumbnail image is attractive and represents your course well!
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
