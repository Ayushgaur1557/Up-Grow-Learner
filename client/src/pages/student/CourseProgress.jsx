// src/pages/student/CourseProgress.jsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const progressBarRef = useRef(null);

  const courseDetails = data?.data?.courseDetails;
  const progress = data?.data?.progress || [];
  const completed = data?.data?.completed || false;
  const totalLectures = courseDetails?.lectures?.length || 0;
  const completedLectures = progress.filter((p) => p.viewed).length;
  const completionPercent = Math.round(
    totalLectures ? (completedLectures / totalLectures) * 100 : 0
  );

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message);
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData, refetch]);

  useEffect(() => {
    if (!progressBarRef.current) return;
    gsap.to(progressBarRef.current, {
      width: `${completionPercent}%`,
      duration: 0.7,
      ease: "power3.out",
    });
  }, [completionPercent]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseTitle } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const currentLectureId = currentLecture?._id || initialLecture._id;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-7xl mx-auto p-4 relative"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-8 left-0 w-56 h-56 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_18%,transparent)]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-3)_16%,transparent)]" />
      </div>

      {/* Header */}
      <div className="flex justify-between mb-4 items-center gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {courseTitle}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Keep going – you’re almost there!
          </p>
        </div>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="flex items-center gap-2"
        >
          {completed ? (
            <>
              <CheckCircle className="h-4 w-4" /> <span>Completed</span>
            </>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      {/* course-level progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1 text-xs text-muted-foreground">
          <span>
            Progress: {completedLectures}/{totalLectures} lectures
          </span>
          <span>{completionPercent}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            ref={progressBarRef}
            className="brand-gradient h-full w-0"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="ui-card flex-1 md:w-3/5 h-fit rounded-lg p-4"
        >
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg border border-border"
              onPlay={() => handleLectureProgress(currentLectureId)}
            />
          </div>
          <div className="mt-3">
            <h3 className="font-medium text-lg text-foreground">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) => lec._id === currentLectureId
                ) + 1
              }: ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </motion.div>

        {/* Lecture Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-border md:pl-4 pt-4 md:pt-0"
        >
          <h2 className="font-semibold text-xl mb-4 text-foreground">
            Course Lectures
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[70vh] pr-1">
            {courseDetails?.lectures.map((lecture) => (
              <motion.div
                key={lecture._id}
                whileHover={{ scale: 1.01 }}
                className="mb-3"
              >
                <Card
                  className={`hover:cursor-pointer transition transform ${
                    lecture._id === currentLectureId
                      ? "border-primary/60 shadow-lg"
                      : "border-border"
                  }`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2
                          size={24}
                          className="text-green-400 mr-2"
                        />
                      ) : (
                        <CirclePlay
                          size={24}
                          className="text-muted-foreground mr-2"
                        />
                      )}
                      <div>
                        <CardTitle className="text-sm md:text-base font-medium text-foreground">
                          {lecture.lectureTitle}
                        </CardTitle>
                      </div>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant={"outline"}
                        className="bg-green-900/40 text-green-300 border-green-500/60 text-[10px]"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseProgress;
