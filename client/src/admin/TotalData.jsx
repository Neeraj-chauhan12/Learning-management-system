import React from "react";
import { MdTrendingUp } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";

const TotalData = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Sales',
      value: '3',
      icon: MdTrendingUp,
      bgGradient: 'from-blue-600 to-blue-400',
      shadowColor: 'blue-500',
    },
    {
      id: 2,
      title: 'Total Revenue',
      value: '₹2,563',
      icon: MdCurrencyRupee,
      bgGradient: 'from-emerald-600 to-emerald-400',
      shadowColor: 'emerald-500',
    },
  ]

  return (
    <div className="w-full px-4 md:px-8 pt-24 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-950 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Monitor your course performance and earnings</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-10 bg-gradient-to-br from-slate-900" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <h2 className={`text-4xl font-bold bg-gradient-to-r ${stat.bgGradient} bg-clip-text text-transparent mt-2`}>
                      {stat.value}
                    </h2>
                  </div>
                  <div className={`rounded-full bg-gradient-to-br ${stat.bgGradient} p-4 shadow-lg shadow-${stat.shadowColor}/20`}>
                    <Icon className="text-2xl text-white" />
                  </div>
                </div>
                <div className="text-xs text-slate-500">Updated today</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TotalData;
