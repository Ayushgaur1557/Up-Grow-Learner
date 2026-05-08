// src/pages/student/Profile.jsx
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
import React, { useEffect, useRef, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, isError, error, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const avatarRef = useRef(null);
  const navigate = useNavigate();

  // Extract user safely
  const user = data?.user || null;
  const enrolledCourses = user?.enrolledCourses || [];

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name || user?.name || "");
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    await updateUser(formData);
  };

  // Initial refetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Pre-fill name when user is loaded
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  // Toasts for profile update
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated.");
    }
    if (updateIsError) {
      toast.error(
        updateError?.data?.message ||
          updateError?.message ||
          "Failed to update profile"
      );
    }
  }, [updateError, updateUserData, isSuccess, updateIsError, refetch]);

  // Handle error from loadUser
  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || error?.message || "Failed to load profile"
      );
    }
  }, [isError, error]);

  // Floating avatar GSAP
  useEffect(() => {
    if (!avatarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(avatarRef.current, {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
      });
    }, avatarRef);
    return () => ctx.revert();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-center text-xl font-medium text-muted-foreground">
          Profile Loading...
        </h1>
      </div>
    );
  }

  // If user didn't load correctly (null / undefined)
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-foreground gap-4">
        <p className="text-lg">Unable to load profile.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-0 w-60 h-60 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_18%,transparent)]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-3)_16%,transparent)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-5xl mx-auto px-4 py-10 text-foreground"
      >
        <h1 className="brand-text font-extrabold text-3xl md:text-4xl text-center md:text-left mb-6">
          Profile
        </h1>

        {/* Profile Info */}
        <div className="ui-card flex flex-col md:flex-row items-center md:items-start gap-8 rounded-lg p-6 md:p-8">
          <div
            ref={avatarRef}
            className="flex flex-col items-center text-center md:text-left"
          >
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 shadow-md ring-2 ring-primary/60">
              <AvatarImage
                src={user?.photoUrl || "https://github.com/shadcn.png"}
                alt={user?.name || "User avatar"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">
              Keep your profile up to date.
            </p>
          </div>

          <div className="w-full">
            <div className="mb-2">
              <h2 className="font-semibold text-foreground">
                Name:
                <span className="ml-2 text-muted-foreground font-normal">
                  {user?.name || "—"}
                </span>
              </h2>
            </div>
            <div className="mb-2">
              <h2 className="font-semibold text-foreground">
                Email:
                <span className="ml-2 text-muted-foreground font-normal">
                  {user?.email || "—"}
                </span>
              </h2>
            </div>
            <div className="mb-2">
              <h2 className="font-semibold text-foreground">
                Role:
                <span className="ml-2 text-primary font-medium">
                  {user?.role?.toUpperCase() || "STUDENT"}
                </span>
              </h2>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="mt-3">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-popover text-popover-foreground rounded-lg shadow-2xl border border-border">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
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

            {/* My Learning CTA */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/my-learning")}
              >
                Go to My Learning
              </Button>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-10">
          <h2 className="font-semibold text-lg text-foreground mb-3">
            Courses you're enrolled in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enrolledCourses.length === 0 ? (
              <h3 className="text-muted-foreground text-sm col-span-full">
                You haven't enrolled yet. Start from{" "}
                <button
                  className="underline text-primary"
                  onClick={() => navigate("/")}
                >
                  Explore Courses
                </button>
                .
              </h3>
            ) : (
              enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
