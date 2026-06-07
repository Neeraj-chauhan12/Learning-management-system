import React, { useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

function useQuery(location) {
  return new URLSearchParams(location.search)
}

const CoursePlayer = () => {
  const { videoId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery(location)
  const start = parseInt(query.get('start') || '0', 10)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!videoId) return
  }, [videoId, start])

  const isYouTubeId = videoId && !videoId.startsWith('http') && !videoId.includes('/')

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h2>Course Player</h2>

      {videoId ? (
        isYouTubeId ? (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              ref={iframeRef}
              title="Course video"
              src={`https://www.youtube.com/embed/${videoId}?start=${start}&autoplay=1`}
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
            src={start ? `${videoId}#t=${start}` : videoId}
          />
        )
      ) : (
        <p>No video id provided. Use route <code>/course-player/:videoId?start=SECONDS</code></p>
      )}
    </div>
  )
}

export default CoursePlayer
