// src/pages/Login.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gsap } from "gsap";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const floatingRef1 = useRef(null);
  const floatingRef2 = useRef(null);

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    type === "signup"
      ? setSignupInput({ ...signupInput, [name]: value })
      : setLoginInput({ ...loginInput, [name]: value });
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [
    loginIsSuccess,
    registerIsSuccess,
    loginData,
    registerData,
    loginError,
    registerError,
    navigate,
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        rotationX: -18,
        transformOrigin: "50% 0%",
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // floating pills
      if (floatingRef1.current && floatingRef2.current) {
        gsap.to([floatingRef1.current, floatingRef2.current], {
          y: (i) => (i === 0 ? -10 : 10),
          x: (i) => (i === 0 ? 6 : -6),
          repeat: -1,
          yoyo: true,
          duration: 2.4,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 w-80 h-80 bg-fuchsia-500/35 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-10 w-96 h-96 bg-indigo-500/35 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-[48px] border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 flex justify-center items-center px-4 py-12"
      >
        {/* floating small pills */}
        <span
          ref={floatingRef1}
          className="hidden sm:inline-flex absolute top-24 left-10 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-50 backdrop-blur-md"
        >
          Learn. Build. Repeat.
        </span>
        <span
          ref={floatingRef2}
          className="hidden sm:inline-flex absolute bottom-24 right-10 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-50 backdrop-blur-md"
        >
          E-Learning Studio
        </span>

        <div ref={cardRef} className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-900/60 backdrop-blur-xl text-slate-300 rounded-2xl p-1 mb-4 shadow-inner border border-white/10">
              <TabsTrigger
                value="signup"
                className="rounded-xl  data-[state=active]:bg-slate-800 data-[state=active]:text-fuchsia-300 font-semibold text-sm md:text-base"
              >
                Sign up
              </TabsTrigger>
              <TabsTrigger
                value="login"
                className="rounded-xl data-[state=active]:bg-slate-800 data-[state=active]:text-fuchsia-300 font-semibold text-sm md:text-base"
              >
                Login
              </TabsTrigger>
            </TabsList>

            {/* Signup */}
            <TabsContent value="signup">
              <Card className="bg-slate-900/80 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-extrabold">
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-slate-300/90">
                    Fill in your details to start learning.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Name
                    </Label>
                    <Input
                      name="name"
                      value={signupInput.name}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Mohit Singh"
                      required
                      className="h-11 text-sm md:text-base font-medium bg-slate-900/80 border-slate-700 focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={signupInput.email}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="you@example.com"
                      required
                      className="h-11 text-sm md:text-base font-medium bg-slate-900/80 border-slate-700 focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold"
                    >
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={signupInput.password}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="••••••••"
                      required
                      className="h-11 text-sm md:text-base font-medium bg-slate-900/80 border-slate-700 focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-semibold">
                      Select Role
                    </Label>
                    <Select
                      value={signupInput.role}
                      onValueChange={(value) =>
                        setSignupInput((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger className="w-full h-11 bg-slate-900/80 border-slate-700 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm md:text-base">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="instructor">Instructor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-11 bg-fuchsia-600 hover:bg-fuchsia-700 text-sm md:text-base font-semibold transition-colors duration-300"
                    disabled={registerIsLoading}
                    onClick={() => handleRegistration("signup")}
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                        Signing up...
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Login */}
            <TabsContent value="login">
              <Card className="bg-slate-900/80 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-extrabold">
                    Welcome back
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-slate-300/90">
                    Enter your credentials to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={loginInput.email}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="you@example.com"
                      required
                      className="h-11 text-sm md:text-base font-medium bg-slate-900/80 border-slate-700 focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold"
                    >
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="••••••••"
                      required
                      className="h-11 text-sm md:text-base font-medium bg-slate-900/80 border-slate-700 focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-11 bg-fuchsia-600 hover:bg-fuchsia-700 text-sm md:text-base font-semibold transition-colors duration-300"
                    disabled={loginIsLoading}
                    onClick={() => handleRegistration("login")}
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
