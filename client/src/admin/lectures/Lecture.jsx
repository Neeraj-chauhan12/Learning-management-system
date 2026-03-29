import React from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom'


const Lecture = ({lecture,courseId,index}) => {
  return (
    <div className='flex flex-col md:flex-row justify-between mb-2 bg-gray-300 px-3 py-2 items-center'>
        <div className='w-full'>
          <h1 className='text-lg md:text-2xl font-bold'>Lecture: {index+1} {lecture?.lectureTitle}</h1>
        </div>

       <Link to={`/course/${courseId}/lecture/${lecture?._id}/edit`} className='text-xl md:text-2xl text-blue-600 hover:text-blue-800 cursor-pointer mt-2 md:mt-0'>
        <FaEdit />
       </Link>
       
    </div>
  )
}

export default Lecture
