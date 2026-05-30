import React from 'react';

const Loading = () => {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 overflow-hidden">
      <div className="space-y-4">
        {/* Thumbnail skeleton */}
        <div className="h-56 w-full animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-100" />
        
        {/* Title skeleton */}
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gradient-to-r from-slate-200 to-slate-100" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gradient-to-r from-slate-200 to-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gradient-to-r from-slate-200 to-slate-100" />
        </div>
        
        {/* Instructor skeleton */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-11 w-11 animate-pulse rounded-full bg-gradient-to-r from-slate-200 to-slate-100" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-24 animate-pulse rounded bg-gradient-to-r from-slate-200 to-slate-100" />
            <div className="h-2 w-20 animate-pulse rounded bg-gradient-to-r from-slate-200 to-slate-100" />
          </div>
        </div>
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between gap-3 pt-4">
          <div className="h-10 w-20 animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-100" />
          <div className="h-10 w-32 animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
