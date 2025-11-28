import React from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom'


const Lecture = ({lecture,courseId,index}) => {
  return (
    <div className='flex justify-between mb-2  bg-gray-300 px-3 py-2 items-center'>
        <div className=''>
        <h1 className='text-2xl font-bold'>Lecture: {index+1} {lecture?.lectureTitle}</h1>
        </div>
       
       <Link to={`/edit-lecture/${lecture?._id}`} className='text-2xl text-blue-600 hover:text-blue-800 cursor-pointer'>
        <FaEdit />
       </Link>
       
      
    </div>
  )
}

export default Lecture
