import React from 'react'
import { FaEdit } from "react-icons/fa";


const Lecture = ({lecture,courseId,index}) => {
  return (
    <div className='flex justify-between mb-2 bg-gray-300 px-3 py-2 items-center'>
        <div className=''>
        <h1 className='text-2xl font-bold'>Lecture: {index+1} {lecture?.lectureTitle}</h1>
        </div>
       
       <div className='text-2xl'>
        <FaEdit />
       </div>
       
      
    </div>
  )
}

export default Lecture
