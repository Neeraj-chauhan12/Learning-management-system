import React from 'react'

const Loading = () => {
    const courses=[1,5,3,5,6,5]
  return (
    <>

    <div className='flex gap-10 mt-5 flex-wrap'>
        {
        courses.map((_,id)=>(
            <div key={id} className="flex w-96 flex-col gap-4">
  <div className="flex items-center gap-4">
    <div className="skeleton h-16 w-28 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-4 w-20"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  </div>
  <div className="skeleton h-32 w-full"></div>
</div>
        ))
        }
    </div>
      
    </>
  )
}

export default Loading
