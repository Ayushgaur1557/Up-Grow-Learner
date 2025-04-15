import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // for displaying toast
  useEffect(()=>{
    if(isSuccess){
        toast.success(data?.message || "Course created.");
        navigate("/admin/course");
    }
  },[isSuccess, error])

  return (
    <div className="flex-1 mx-10">
      {/* 🔹 Header Section */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
          Let’s add a course
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Add some basic course details to get started.
        </p>
      </div>
  
      {/* 🔹 Form Section */}
      <div className="space-y-6">
        {/* Course Title */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-800 dark:text-gray-200">Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
            className="rounded-md focus:ring-2 focus:ring-[#AA14EC] transition-all"
          />
        </div>
  
        {/* Category Select */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-800 dark:text-gray-200">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[240px] rounded-md focus:ring-2 focus:ring-[#AA14EC]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
  
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/course")}
            className="hover:border-[#AA14EC] hover:text-[#AA14EC] transition-all"
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="bg-[#AA14EC] hover:bg-[#9012cb] text-white transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
  
};

export default AddCourse;