import React, { useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useGetLectureByIdQuery, useGetLectureQuery } from '../features/api/lectureApi'
import { useGetCourseByIdQuery } from '../features/api/courseApi'

function useQuery(location) {
  return new URLSearchParams(location.search)
}

const CoursePlayer = () => {

     const { lectureId } = useParams()
     const {courseId} = useParams()
    const {data: lectureData, isLoading}=useGetLectureByIdQuery(lectureId)
    const {data: lectures} = useGetLectureQuery(courseId)
    const {data: courseData} = useGetCourseByIdQuery(courseId)
    console.log("lectureData in CoursePlayer", lectureData)
    console.log("lectures in CoursePlayer", lectures)
    console.log("courseData in CoursePlayer", courseData)



 
    
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery(location)
  const start = parseInt(query.get('start') || '0', 10)
  const iframeRef = useRef(null)


  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h2>Course Player</h2>

      {lectureData?.lecture ? (
        lectureData?.lecture?.videoUrl ? (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              ref={iframeRef}
              title="Course video"
              src={start ? `${lectureData?.lecture?.videoUrl}?start=${start}` : lectureData?.lecture?.videoUrl}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            controls
            autoPlay
            style={{ width: '100%', maxWidth: 960 }}
            src={start ? `${lectureData?.lecture?.videoUrl}#t=${start}` : lectureData?.lecture?.videoUrl }
          />
        )
      ) : (
        <p>No video id provided. Use route <code>/course-player/:videoId?start=SECONDS</code></p>
      )}
    </div>
  )
}

export default CoursePlayer
