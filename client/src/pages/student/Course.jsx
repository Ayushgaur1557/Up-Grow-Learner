import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
    <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-xl bg-card text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">

        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="px-4 py-3 space-y-2">
          <h2 className="font-semibold text-base line-clamp-2 hover:underline">
            {course.courseTitle}
          </h2>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                  alt={course.creator?.name || "@creator"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{course.creator?.name}</span>
            </div>
            <Badge className="text-xs font-medium capitalize">{course.courseLevel}</Badge>
          </div>
          <div className="text-right text-primary font-bold text-sm">
            ₹{course.coursePrice}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
