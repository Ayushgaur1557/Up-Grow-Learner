import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const {data:lectureData} = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(()=>{
    if(lecture){
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo)
    }
  },[lecture])

  const [edtiLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
    const [removeLecture,{data:removeData, isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    console.log({ lectureTitle, uploadVideInfo, isFree, courseId, lectureId });

    await edtiLecture({
      lectureTitle,
      videoInfo:uploadVideInfo,
      isPreviewFree:isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(()=>{
    if(removeSuccess){
      toast.success(removeData.message);
    }
  },[removeSuccess])

  return (
    <Card className="shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300">
  <CardHeader className="flex justify-between items-start">
    <div>
      <CardTitle className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
        Edit Lecture
      </CardTitle>
      <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
        Make changes and click save when done.
      </CardDescription>
    </div>
    <div className="flex items-center gap-2">
      <Button
        variant="destructive"
        disabled={removeLoading}
        onClick={removeLectureHandler}
      >
        {removeLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Remove Lecture"
        )}
      </Button>
    </div>
  </CardHeader>

  <CardContent>
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm">Title</Label>
        <Input
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          type="text"
          placeholder="Ex. Introduction to Javascript"
          className="focus:ring-2 focus:ring-[#AA14EC] rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm">
          Video <span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          accept="video/*"
          onChange={fileChangeHandler}
          className="w-fit focus:outline-none file:bg-[#AA14EC] file:text-white file:rounded-md file:px-3 file:py-1 file:cursor-pointer"
        />
      </div>

      <div className="flex items-center space-x-3 mt-3">
        <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
        <Label htmlFor="airplane-mode" className="text-sm">
          Is this video FREE
        </Label>
      </div>

      {/* ✅ Video Upload Progress UI */}
      {mediaProgress && (
        <div className="my-4 space-y-2">
          <Progress value={uploadProgress} />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {uploadProgress}% uploaded
          </p>
        </div>
      )}

      {/* ✅ Save Button */}
      <div className="pt-4">
        <Button
          disabled={isLoading}
          onClick={editLectureHandler}
          className="bg-[#ba67de] hover:bg-[#9012cb] text-white transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Update Lecture"
          )}
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

  );
};

export default LectureTab;