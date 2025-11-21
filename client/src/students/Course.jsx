import React from 'react'

const Course = () => {
  return (
    <div >
      <div className="card bg-base-100 w-96 mb-4 shadow-sm">
  <figure>
    <img
      src="https://tse1.mm.bing.net/th/id/OIP.fR8gH0lTi66bKMuj2AWdLgHaCZ?pid=Api&P=0&h=180"
      alt="React" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      React js complete Course
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>React is the very powerfull library; for the frontend and it is single page library</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">₹499</div>
      <div className="badge badge-outline bg-green-500 text-black">pay</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Course
