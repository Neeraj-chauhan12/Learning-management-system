import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { MdCloudUpload } from 'react-icons/md'
import { useCourseGetQuery } from '../../features/api/courseApi'

const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useCourseGetQuery()

  const existing = useMemo(() => {
    const list = data?.courses || []
    return list.find(c => c._id === id) || {}
  }, [data, id])

  const [formData, setFormData] = useState({
    courseTitle: '',
    description: '',
    coursePrice: '',
    category: 'development',
    courseLevel: 'beginner',
    thumbnailUrl: '',
  })

  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (existing && Object.keys(existing).length > 0) {
      setFormData({
        courseTitle: existing.courseTitle || '',
        description: existing.description || existing?.courseDescription || '',
        coursePrice: existing.coursePrice || '',
        category: existing.category || 'development',
        courseLevel: existing.courseLevel || existing.level || 'beginner',
        thumbnailUrl: existing.thumbnail || existing.photoURL || '',
      })
      setPreview(existing.thumbnail || existing.photoURL || '')
    }
  }, [existing])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('Max 5MB')
      return
    }
    setFile(f)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(f)
  }

  const handleRemoveImage = () => {
    setFile(null)
    setPreview('')
    setFormData(prev => ({ ...prev, thumbnailUrl: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.courseTitle.trim()) return toast.error('Title required')
    if (!formData.description.trim()) return toast.error('Description required')
    if (!formData.coursePrice) return toast.error('Price required')

    setLoading(true)
    try {
      // TODO: call API update endpoint. Using mock for now.
      // Build FormData if file exists
      const fd = new FormData()
      fd.append('courseTitle', formData.courseTitle)
      fd.append('description', formData.description)
      fd.append('coursePrice', formData.coursePrice)
      fd.append('category', formData.category)
      fd.append('courseLevel', formData.courseLevel)
      if (file) fd.append('thumbnail', file)

      // Example: await updateCourse({id, body: fd}).unwrap()
      toast.success('Course updated successfully')
      navigate('/admin/courses')
    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || 'Failed to update course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Course</h1>
          <p className="text-gray-600">Update course details and thumbnail</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Title</label>
              <input name="courseTitle" value={formData.courseTitle} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input name="coursePrice" type="number" value={formData.coursePrice} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (hrs)</label>
                <input name="duration" value={formData.duration || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select name="courseLevel" value={formData.courseLevel} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={formData.status || 'draft'} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
              <div className="mt-2">
                {!preview ? (
                  <label className="flex items-center justify-center px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-indigo-400">
                    <MdCloudUpload className="text-indigo-500 mr-3" />
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                  </label>
                ) : (
                  <div className="relative">
                    <img src={preview} alt="thumbnail" className="w-full h-48 object-cover rounded-md" />
                    <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2">
                      <AiOutlineClose />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={() => navigate('/admin/courses')} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" disabled={loading} className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {loading ? 'Updating...' : 'Update Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCourse
