import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useCourseGetQuery } from "../../features/api/courseApi";
import { FaRegEdit } from "react-icons/fa";

const CourseDetail = () => {
  const { data } = useCourseGetQuery();

  console.log("data", data?.courses);


  return (
    <>
      <div className="w-[80vw] h-screen bg-gray-200 pt-24 px-16">
        <div>
          <Link to={"/create"}>
            <button className="btn px-7 py-2 flex gap-2 items-center rounded-2xl btn-neutral">
              <IoMdAdd />
              Course Create
            </button>
          </Link>
        </div>

        <div className="flex mt-3  ">
          <h1 className="text-2xl w-[15vw] font-bold">Title</h1>
          <h1 className="text-2xl w-[15vw] font-bold">Price</h1>
          <h1 className="text-2xl w-[15vw] font-bold">Status</h1>
          <h1 className="text-2xl w-[15vw] font-bold">Action</h1>
          <h1 className="text-2xl w-[15vw] font-bold">Lectures</h1>

        </div>
        <div className=" ">
          {data?.courses?.map((data) => (
            <div className="flex my-2 " key={data._id}>
              <h1 className="w-[15vw] ">{data.courseTitle}</h1>
              <h1 className="w-[15vw]">
                {data.coursePrice ? data?.coursePrice : <p>NA</p>}
              </h1>
              <h1 className="w-[15vw] ">
                {data.Status ? (
                  <button className="btn btn-success">Success</button>
                ) : (
                  <button className="btn btn-soft bg-gray-600 text-white">Default</button>
                )}
              </h1>
              <h1 className="w-[15vw] ">
                <div className="flex items-center gap-3">
                  {!data.Action ? (
                    <Link to={`/edit/${data._id}`} className="flex items-center gap-2">
                      <FaRegEdit />
                      Edit
                    </Link>
                  ) : (
                    ""
                  )}

                
                

                  
                  
                </div>
              </h1>

                <div className="w-[15vw] ">
                      <Link to={`/course/${data._id}/lecture/create`} className="btn btn-sm  btn-outline">
                    Go To Lecture
                  </Link>
                  </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
