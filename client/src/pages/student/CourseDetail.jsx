// src/pages/student/CourseDetail.jsx
import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  const chipRowRef = useRef(null);

  useEffect(() => {
    if (!chipRowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(chipRowRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "linear",
      });
    }, chipRowRef);

    return () => ctx.revert();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const chips = [
    "Hands-on projects",
    "Lifetime access",
    "Certificate of completion",
    "HD video",
    "Downloadable resources",
  ];

  return (
    <div className="space-y-5 relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-0 w-56 h-56 bg-fuchsia-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/25 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white"
      >
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-3">
          <h1 className="font-extrabold text-2xl md:text-3xl tracking-tight">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg text-slate-200">
            {course?.subTitle || "Course Sub-title"}
          </p>
          <p className="text-sm md:text-base text-slate-300">
            Created by{" "}
            <span className="text-fuchsia-300 underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <BadgeInfo size={16} />
              <p>Last updated {course?.createdAt.split("T")[0]}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20">
              Students enrolled: {course?.enrolledStudents.length}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20">
              Level: {course?.courseLevel}
            </span>
          </div>
        </div>
      </motion.div>

      {/* scrolling chips */}
      <div className="overflow-hidden max-w-7xl mx-auto px-4 md:px-8 mt-3">
        <div
          ref={chipRowRef}
          className="flex gap-3 whitespace-nowrap text-xs md:text-sm"
        >
          {[...chips, ...chips].map((chip, idx) => (
            <span
              key={`${chip}-${idx}`}
              className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-100"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="w-full lg:w-1/2 space-y-5"
        >
          <h1 className="font-bold text-xl md:text-2xl text-slate-100">
            Description
          </h1>
          <p
            className="text-sm leading-relaxed text-slate-200/90 bg-slate-950/50 rounded-xl p-4 border border-slate-800"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <Card className="bg-slate-950/80 border border-slate-800 text-slate-100">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription className="text-slate-300">
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-fuchsia-400">
                    {lecture.isPreviewFree ? (
                      <PlayCircle size={16} />
                    ) : (
                      <Lock size={16} />
                    )}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="w-full lg:w-1/3"
        >
          <Card className="shadow-2xl bg-slate-950/90 border border-slate-800">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 overflow-hidden rounded-lg border border-slate-700">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0]?.videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="font-semibold mb-1 text-slate-100">
                {course.lectures[0]?.lectureTitle || "Lecture 1"}
              </h1>
              <Separator className="my-2 bg-slate-700" />
              <h1 className="text-lg md:text-xl font-semibold mb-1 text-slate-100">
                Course Price
              </h1>
              <p className="text-2xl font-bold text-fuchsia-300">
                ₹{course.coursePrice}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
