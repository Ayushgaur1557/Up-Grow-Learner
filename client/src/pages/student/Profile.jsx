import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <h1 className="text-center mt-10 text-xl font-medium">Profile Loading...</h1>;

  const user = data && data.user;

  return (
    // 🌈 Beautiful full-page gradient
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f3e8ff] to-[#e8eafc]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="font-bold text-3xl text-center md:text-left text-[#AA14EC] mb-6">
          PROFILE
        </h1>

        {/* ✨ Profile Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/70 rounded-xl shadow-lg p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 shadow-md ring-2 ring-[#AA14EC]">
              <AvatarImage
                src={user?.photoUrl || "https://github.com/shadcn.png"}
                alt={user?.name}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="w-full">
            <div className="mb-2">
              <h2 className="font-semibold text-gray-800">
                Name:
                <span className="ml-2 text-gray-600 font-normal">{user.name}</span>
              </h2>
            </div>
            <div className="mb-2">
              <h2 className="font-semibold text-gray-800">
                Email:
                <span className="ml-2 text-gray-600 font-normal">{user.email}</span>
              </h2>
            </div>
            <div className="mb-2">
              <h2 className="font-semibold text-gray-800">
                Role:
                <span className="ml-2 text-[#AA14EC] font-medium">
                  {user.role.toUpperCase()}
                </span>
              </h2>
            </div>

            {/* 🛠 Edit Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="mt-3 bg-[#AA14EC] hover:bg-[#9012cb] transition-colors"
                >
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-xl shadow-xl">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Profile Photo</Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={updateUserIsLoading}
                    onClick={updateUserHandler}
                    className="bg-[#AA14EC] hover:bg-[#9012cb]"
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 📚 Courses */}
        <div className="mt-10">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">
            Courses you're enrolled in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.enrolledCourses.length === 0 ? (
              <h3 className="text-gray-600 text-sm col-span-full">
                You haven't enrolled yet
              </h3>
            ) : (
              user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
