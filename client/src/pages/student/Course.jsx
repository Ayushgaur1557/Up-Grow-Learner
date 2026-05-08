import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Course = ({ course }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 28,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });

      const enter = () =>
        gsap.to(el, { y: -6, duration: 0.22, ease: "power2.out" });
      const leave = () =>
        gsap.to(el, { y: 0, duration: 0.22, ease: "power2.out" });

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);

      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="w-full max-w-sm mx-auto">
      <Link to={`/course-detail/${course._id}`}>
        <Card className="w-full overflow-hidden rounded-lg p-0 transition-shadow duration-300 hover:shadow-2xl">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={course.courseThumbnail}
              alt="course"
              className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <CardContent className="px-4 py-3 space-y-2">
            <h2 className="font-semibold text-base line-clamp-2 hover:underline">
              {course.courseTitle}
            </h2>
            <div className="flex items-center justify-between text-sm gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={
                      course.creator?.photoUrl || "https://github.com/shadcn.png"
                    }
                    alt={course.creator?.name || "@creator"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="truncate text-xs md:text-sm text-muted-foreground">
                  {course.creator?.name}
                </span>
              </div>
              <Badge className="text-[10px] md:text-xs font-medium capitalize">
                {course.courseLevel}
              </Badge>
            </div>
            <div className="text-right text-primary font-bold text-sm">
              Rs. {course.coursePrice}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Course;
