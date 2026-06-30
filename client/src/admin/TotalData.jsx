import React from "react";
import { MdTrendingUp } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { useCourseGetQuery } from "../features/api/courseApi";

const TotalData = () => {
  const { data: instructorCourses, isLoading: coursesLoading } =
    useCourseGetQuery();
  

  const count = instructorCourses?.courses
    .map((course) => course.enrolledStudents.length)
    .reduce((acc, curr) => acc + curr, 0);

  const totalRevenue = instructorCourses?.courses
    .map((course) => course.coursePrice * course.enrolledStudents.length)
    .reduce((acc, curr) => acc + curr, 0);

  const stats = [
    {
      id: 1,
      title: "Total Sales",
      value: `${count}`,
      icon: MdTrendingUp,
      bgColor: "bg-slate-900",
      iconColor: "text-white",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "₹" + totalRevenue,
      icon: MdCurrencyRupee,
      bgColor: "bg-slate-900",
      iconColor: "text-white",
    },
  ];

  if (coursesLoading) {
    return (
      <div className="w-full px-4 md:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600">
            Monitor your course performance and earnings
          </p>
        </div>
        <div className="flex items-center justify-center h-48">
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 pt-24 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-950 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          Monitor your course performance and earnings
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-10 bg-slate-900" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>
                    <h2 className="text-4xl font-bold text-slate-950 mt-2">
                      {stat.value}
                    </h2>
                  </div>
                  <div
                    className={`rounded-full ${stat.bgColor} p-4 shadow-lg shadow-slate-500/20`}
                  >
                    <Icon className={`text-2xl ${stat.iconColor}`} />
                  </div>
                </div>
                <div className="text-xs text-slate-500">Updated today</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TotalData;
