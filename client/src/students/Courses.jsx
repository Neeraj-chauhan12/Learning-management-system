import React, { useEffect } from "react";
import Course from "./Course";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Courses = () => {
  const isLoading = false;
  const courses=[5,6,4,5,6,5,4,6]

  const location=useLocation();
  //const {user,isAuthenticated}=useSelector(state=>state.auth)
   useEffect(()=>{
     if(location.pathname==="/"){
      console.log("home page")
     }
   },[location.pathname])
 
  
  return (
    <>
  <Navbar />
    <div className="max-w-7xl  bg-gray-50 mx-auto pt-20 p-6">
       <div className="flex justify-center items-center">
    <h1 className="text-3xl font-bold my-5" >Our Courses</h1>
       </div>
      
      
       
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
              {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => (
            
            <div key={index} className="flex  w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
             ))
      ) : (

        courses.map((_,id)=>(
             <Course key={id} />

        ))
       
        
      )}

        </div>
    
    
        


     
        
    </div>
    </>
  );
};

export default Courses;
