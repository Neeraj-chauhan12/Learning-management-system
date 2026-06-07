import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useGetLectureByIdQuery, useGetLectureQuery } from '../features/api/lectureApi'
import { useGetCourseByIdQuery } from '../features/api/courseApi'
import Navbar from '../components/Navbar'
import { FaLock, FaPlayCircle, FaChevronRight, FaCircle } from 'react-icons/fa'
import { MdAccessTime, MdGroup, MdUpdate, MdOutlineSchool } from 'react-icons/md'

function useQuery(location) {
  return new URLSearchParams(location.search)
}

const extractYouTubeEmbedUrl = (url) => {
  if (!url) return null

  const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  return null
}

const CoursePlayer = () => {
  const { courseId, lectureId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const query = useQuery(location)
  const start = parseInt(query.get('start') || '0', 10)

  const { data: lectureData, isLoading: lectureLoading } = useGetLectureByIdQuery(lectureId)
  const { data: courseData, isLoading: courseLoading } = useGetCourseByIdQuery(courseId)
  const { data: lectureList } = useGetLectureQuery(courseId)

  if (lectureLoading || courseLoading) {
    return (
      <div className="min-h-screen bg-slate-900 py-28 px-4 text-center text-white">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-slate-950/90 px-8 py-16 shadow-2xl shadow-slate-950/40">
          <p className="text-lg font-medium text-cyan-300">Loading your course player</p>
          <p className="mt-4 text-slate-300">Please wait while we prepare the lecture and course details.</p>
        </div>
      </div>
    )
  }

  const course = courseData?.course
  const currentLecture = lectureData?.lecture
  const lectures = lectureList?.lectures || []

  const videoUrl = currentLecture?.videoUrl || currentLecture?.videoInfo?.videoUrl || ''
  const youtubeEmbed = videoUrl ? extractYouTubeEmbedUrl(videoUrl) : null
  const embedUrl = youtubeEmbed ? `${youtubeEmbed}?start=${start}&autoplay=1&rel=0&modestbranding=1` : null

  const activeIndex = lectures.findIndex((item) => item?._id === lectureId)
  const activeLectureNumber = activeIndex >= 0 ? activeIndex + 1 : null

  const handleLectureClick = (lecture) => {
    if (lecture?.locked) {
      return
    }
    navigate(`/course/${courseId}/learn/${lecture._id}`)
  }

  const courseThumbnail = course?.courseThumbnail || 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=1200&q=80'

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="pt-28 pb-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 text-white shadow-2xl shadow-slate-900/20">
            <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
              <div className="relative p-8 sm:p-12">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 backdrop-blur">
                  <FaPlayCircle className="h-5 w-5 text-cyan-300" />
                  Now Playing
                </div>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                  {currentLecture?.lectureTitle || 'Loading Lecture...'}
                </h1>
                <p className="mt-4 max-w-2xl text-slate-200 sm:text-lg">
                  {currentLecture?.description || course?.courseDescription || 'Watch the lecture and keep learning with curated course content.'}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Course</p>
                    <p className="mt-2 text-xl font-semibold">{course?.courseTitle || 'Untitled Course'}</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Instructor</p>
                    <p className="mt-2 text-xl font-semibold">{course?.creator?.username || 'Unknown Instructor'}</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-slate-950/90 p-8 sm:p-12">
                <img
                  src={courseThumbnail}
                  alt={course?.courseTitle || 'Course image'}
                  className="absolute inset-0 h-full w-full object-cover opacity-30"
                />
                <div className="relative space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Course summary</p>
                    <h2 className="text-3xl font-semibold text-white">{course?.courseTitle || 'Course Preview'}</h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/80 p-5">
                      <p className="text-sm text-slate-300">Level</p>
                      <p className="mt-2 text-lg font-semibold text-white">{course?.courseLevel || 'Beginner'}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/80 p-5">
                      <p className="text-sm text-slate-300">Category</p>
                      <p className="mt-2 text-lg font-semibold text-white">{course?.category || 'General'}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/80 p-5">
                      <p className="text-sm text-slate-300">Students</p>
                      <p className="mt-2 text-lg font-semibold text-white">{course?.enrolledStudents?.length || 0}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/80 p-5">
                      <p className="text-sm text-slate-300">Updated</p>
                      <p className="mt-2 text-lg font-semibold text-white">{course?.updatedAt?.slice(0, 10) || 'Unknown'}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-300">Price</p>
                        <p className="mt-2 text-3xl font-semibold text-white">₹{course?.coursePrice ?? 'Free'}</p>
                      </div>
                      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                        {lectures.length} lessons
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div className="overflow-hidden rounded-[32px] bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-500">Lecture #{activeLectureNumber ?? '—'}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">{currentLecture?.lectureTitle || 'Loading lecture...'}</h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Type</p>
                      <p className="mt-2 font-semibold text-slate-900">{currentLecture?.isPreviewFree ? 'Preview' : 'Full Access'}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Status</p>
                      <p className="mt-2 font-semibold text-slate-900">{currentLecture?.locked ? 'Locked' : 'Unlocked'}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 text-center">
                      <p className="text-sm text-slate-500">Start</p>
                      <p className="mt-2 font-semibold text-slate-900">{start ? `${start}s` : '0s'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950 shadow-2xl shadow-slate-950/20">
                  {videoUrl ? (
                    embedUrl ? (
                      <div className="relative pb-[56.25%]">
                        <iframe
                          title="Course Video"
                          src={embedUrl}
                          className="absolute inset-0 h-full w-full"
                          frameBorder="0"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video
                        controls
                        autoPlay
                        className="h-full w-full min-h-[420px] bg-black"
                        src={videoUrl}
                      />
                    )
                  ) : (
                    <div className="flex min-h-[420px] items-center justify-center bg-slate-900 px-6 text-center text-slate-300">
                      <div>
                        <p className="text-xl font-semibold">No video available for this lecture.</p>
                        <p className="mt-2 text-sm text-slate-400">Please check the course content or select another lecture.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm text-slate-500">Lecture Description</p>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                      {currentLecture?.description || 'No description added for this lecture yet.'}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm text-slate-500">Course Overview</p>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                      {course?.description || course?.courseDescription || 'This course contains engaging lectures, practical exercises, and expert guidance.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[32px] bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">All Lectures</p>
                    <p className="mt-1 text-sm text-slate-500">Select any lesson to continue learning.</p>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
                    {lectures.length} lessons
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {lectures.map((lecture, idx) => {
                    const isActive = lecture?._id === lectureId
                    return (
                      <button
                        key={lecture?._id || idx}
                        type="button"
                        onClick={() => handleLectureClick(lecture)}
                        className={`w-full rounded-3xl border px-5 py-4 text-left transition ${
                          isActive
                            ? 'border-cyan-500 bg-cyan-50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        } ${lecture?.locked ? 'cursor-not-allowed opacity-70' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-950">Lesson {idx + 1}: {lecture?.lectureTitle}</p>
                            <p className="mt-2 text-sm text-slate-500">
                              {lecture?.isPreviewFree ? 'Free preview available' : lecture?.locked ? 'Locked content' : 'Full lesson available'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            {lecture?.locked ? <FaLock /> : <FaChevronRight />}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="overflow-hidden rounded-[32px] bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600">
                    <MdOutlineSchool className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Course by</p>
                    <p className="text-lg font-semibold text-slate-950">{course?.creator?.username || 'Instructor'}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">₹{course?.coursePrice ?? 'Free'}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Course level</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{course?.courseLevel || 'Beginner'}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{course?.category || 'General'}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[32px] bg-white p-6 shadow-xl shadow-slate-900/5">
                <p className="text-base font-semibold text-slate-950">Quick stats</p>
                <div className="mt-6 grid gap-4">
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4">
                    <p className="text-sm text-slate-500">Lessons</p>
                    <p className="font-semibold text-slate-900">{lectures.length}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4">
                    <p className="text-sm text-slate-500">Students</p>
                    <p className="font-semibold text-slate-900">{course?.enrolledStudents?.length || 0}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4">
                    <p className="text-sm text-slate-500">Updated</p>
                    <p className="font-semibold text-slate-900">{course?.updatedAt?.slice(0, 10) || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer
