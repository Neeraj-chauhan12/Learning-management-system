import React from 'react'

const Course = ({ course }) => {
  console.log("course", course);
  return (
    <div >
      <div className="card bg-base-100 w-96 mb-4 shadow-sm">
        <figure>
          <img
            className="h-48 w-full object-cover"
            src={course?.courseThumbnail}
            alt=''
          ></img>
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {course?.courseTitle}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{course?.description}</p>

          <div className='flex items-center justify-between gap-2'>
            <div className='flex gap-2'>
              <img className='h-10 w-8 h-full rounded-full object-cover' src={course?.creator?.photoURL } alt="" />
              <h1>{course?.creator?.username}</h1>

            </div>


            <h1 className='px-4 py-1 '>{course?.courseLevel}</h1>
          </div>

          <div className="card-actions justify-end">
            <div className="badge badge-outline">₹{course?.coursePrice}</div>
            <div className="badge badge-outline bg-green-500 text-black">pay</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course
