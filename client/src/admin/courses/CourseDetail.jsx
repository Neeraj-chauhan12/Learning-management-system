import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";

const CourseDetail = () => {

  const data=[
    {
      id:1,
      Title:"react is the most use full language that it",
      Price:2563,
      Status:"Published",
      Action:"edit"

    },
     {
      id:2,
      Title:"react is the most use full language that it",
      Price:2563,
      Status:"Published",
      Action:"edit"

    },
     {
      id:3,
      Title:"react is the most use full language that it",
      Price:2563,
      Status:"Published",
      Action:"edit"

    },
     {
      id:4,
      Title:"react is the most use full language that it",
      Price:2563,
      Status:"Published",
      Action:"edit"

    },
  ]
  return (
    <>
    <div className='w-[80vw] h-screen bg-gray-200 pt-24 px-16'>

        <div>
            <Link to={"/create"}><button className="btn px-7 py-2 flex gap-2 items-center rounded-2xl btn-neutral"><IoMdAdd />Course Create</button></Link>
        </div>
         
         <div className='flex mt-3 justify-between items-center'>
          <h1 className='text-2xl font-bold'>Title</h1>
          <h1 className='text-2xl font-bold'>Price</h1>
          <h1 className='text-2xl font-bold'>Status</h1>
          <h1 className='text-2xl font-bold'>Action</h1>

         </div>
        <div className='bg-red-200 '>
          {
            data.map((data,id)=> (
              <div className='flex my-2  items-center' key={id}>
              <h1 className='w-96'>{data.Title}</h1>
              <h1 className='w-52'>{data.Price}</h1>
              <h1 className='w-52'>{data.Status}</h1>
              <h1 className='w-52'>{data.Action}</h1>

              </div>

            ))
          }
        </div>


    </div>
      
    </>
  )
}

export default CourseDetail
