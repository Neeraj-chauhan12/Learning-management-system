import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-700 via-indigo-700 to-fuchsia-600 px-6 pt-28 pb-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_30%)] opacity-90" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 text-center">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/90">
            Learn anytime, anywhere
          </span>
          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Find the best courses for your next career leap.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-100/90">
            Discover, learn, and upskill with curated programs taught by expert instructors.
          </p>
        </div>

        <div className="flex w-full max-w-2xl flex-col items-center gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search courses, skills or topics"
            className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-slate-200/75 outline-none transition focus:border-white/50 focus:bg-white/20"
          />
          <button className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-950/20 transition hover:bg-slate-100">
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="rounded-full border border-white/30 bg-white/90 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Explore Courses
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
