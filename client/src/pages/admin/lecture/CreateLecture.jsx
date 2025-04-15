import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
          Let's add lectures
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Add some basic details for your new lecture below.
        </p>
      </div>
  
      {/* Form + Buttons */}
      <div className="space-y-6">
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Title"
            className="mt-1 focus:ring-2 focus:ring-[#AA14EC] rounded-md"
          />
        </div>
  
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hover:border-[#AA14EC] transition-all"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="bg-[#AA14EC] hover:bg-[#9012cb] text-white transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
  
        {/* Lectures Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Lectures</h2>
          <div className="space-y-4">
            {lectureLoading ? (
              <p className="text-gray-500">Loading lectures...</p>
            ) : lectureError ? (
              <p className="text-red-500">Failed to load lectures.</p>
            ) : lectureData.lectures.length === 0 ? (
              <p className="text-gray-500">No lectures available yet.</p>
            ) : (
              lectureData.lectures.map((lecture, index) => (
                <div
                  key={lecture._id}
                  className="rounded-md border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-[#1a1a1a] shadow-sm"
                >
                  <Lecture
                    lecture={lecture}
                    courseId={courseId}
                    index={index}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CreateLecture;