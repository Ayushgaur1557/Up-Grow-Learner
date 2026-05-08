import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
    const {data, isLoading} = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if(isLoading) return <div className="ui-card rounded-lg p-6 text-muted-foreground">Loading courses...</div>
 
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-sm text-muted-foreground">Manage course status, pricing, and edits.</p>
        </div>
        <Button onClick={() => navigate(`create`)}>
          <Plus /> Create Course
        </Button>
      </div>
      <div className="ui-card rounded-lg p-4">
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course?.coursePrice ? `Rs. ${course.coursePrice}` : "NA"}</TableCell>
              <TableCell>
                <Badge variant={course.isPublished ? "default" : "secondary"}>
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                 <Button size='sm' variant='ghost' onClick={() => navigate(`${course._id}`)}><Edit/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default CourseTable;
