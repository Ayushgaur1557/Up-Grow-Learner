// src/pages/student/Courses.jsx
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { gsap } from "gsap";

const stripKeywords = [
  "Trending",
  "New",
  "Top Rated",
  "Beginner Friendly",
  "Advanced",
  "Project Based",
];

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  const headingRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        });
      }
      if (stripRef.current) {
        gsap.to(stripRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 24,
          ease: "linear",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  if (isError)
    return <h1 className="text-center mt-10">Something went wrong.</h1>;

  return (
    <div className="bg-background/80 py-10">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2
          ref={headingRef}
          className="font-bold text-3xl text-center mb-4 text-white"
        >
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            Our Courses
          </span>
        </h2>

        {/* auto-scrolling labels / chips */}
        <div className="relative overflow-hidden mb-8">
          <div
            ref={stripRef}
            className="flex gap-3 whitespace-nowrap justify-center"
          >
            {[...stripKeywords, ...stripKeywords].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-600/70 text-slate-100/90"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-card/80 shadow rounded-xl overflow-hidden border border-border/60">
      <div className="aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
