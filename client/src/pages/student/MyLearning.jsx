import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { motion } from "framer-motion";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-4xl mx-auto my-10 px-4 md:px-0"
    >
      <h1 className="font-bold text-2xl mb-1">My Learning</h1>
      <p className="text-sm text-muted-foreground">Continue the courses you are enrolled in.</p>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="ui-card rounded-lg p-6 text-muted-foreground">
            You are not enrolled in any course.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-muted rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
