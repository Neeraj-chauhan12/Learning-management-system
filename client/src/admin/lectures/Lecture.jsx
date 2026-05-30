import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'

const Lecture = ({lecture, courseId, index}) => {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md'>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-3'>
          <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700'>
            {index + 1}
          </span>
          <h3 className='text-base font-semibold text-slate-900 truncate'>
            {lecture?.lectureTitle || 'Untitled Lecture'}
          </h3>
        </div>
        <p className='mt-1 text-xs text-slate-500'>Lecture ID: {lecture?._id}</p>
      </div>

      <Link
        to={`/course/${courseId}/lecture/${lecture?._id}/edit`}
        className='inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100'
      >
        <FaEdit /> Edit
      </Link>
    </div>
  )
}

export default Lecture
