import React from "react";

const TotalData = () => {
  return (
    <div className="h-screen w-[80vw]  px-14 pt-24">
      <div className="flex gap-10">
        <div className="card bg-base-100 h-32 w-64 shadow-lg">
          <div className="card-body">
            <div className="card-actions flex flex-col px-3 py-2 ">
                <h1 className="font-bold">Total Sales</h1>
                <h1 className="text-2xl font-bold text-blue-500">3</h1>
            </div>
          </div>
        </div>

       <div className="card bg-base-100 h-32 w-64 shadow-lg">
          <div className="card-body ">
            <div className="card-actions flex flex-col px-3 py-2">
                <h1 className="font-bold">Total Revenue</h1>
                <h1 className="font-bold text-blue-500">2563₹</h1>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default TotalData;
