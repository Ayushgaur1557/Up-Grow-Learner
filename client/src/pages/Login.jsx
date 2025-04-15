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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ✅ Import ShadCN Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    type === "signup"
      ? setSignupInput({ ...signupInput, [name]: value })
      : setLoginInput({ ...loginInput, [name]: value });
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log("Submitting:", inputData);
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
      console.error("Login Error:", loginError);
      toast.error(loginError?.data?.message || "Login Failed");
    }
    
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    // 🌈 Full-page gradient background
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F0ECFF] to-[#E2D9FB] flex justify-center items-center px-4 py-12">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 bg-white/30 backdrop-blur-md text-muted-foreground rounded-lg p-1 mb-3 shadow-inner">
          <TabsTrigger
            value="signup"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#AA14EC] font-semibold"
          >
            Signup
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#AA14EC] font-semibold"
          >
            Login
          </TabsTrigger>
        </TabsList>

        {/* ✨ Signup Card */}
        <TabsContent value="signup">
          <Card className="bg-[#f8f5ff] shadow-xl transition-transform duration-300 hover:scale-[1.015]">
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Fill the form to sign up and get started!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Mohit Single"
                  required
                  className="transition-all focus:ring-2 focus:ring-[#AA14EC]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="hitmo@example.com"
                  required
                  className="transition-all focus:ring-2 focus:ring-[#AA14EC]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="main mohit hu"
                  required
                  className="transition-all focus:ring-2 focus:ring-[#AA14EC]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select
                  value={signupInput.role}
                  onValueChange={(value) =>
                    setSignupInput((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-[#AA14EC]">
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
                className="w-full bg-[#AA14EC] hover:bg-[#9012cb] transition-colors duration-300"
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                    Signing up...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ✨ Login Card */}
        <TabsContent value="login">
          <Card className="bg-[#f3f6fc] shadow-xl transition-transform duration-300 hover:scale-[1.015]">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Enter your credentials to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="muhit@example.com"
                  required
                  className="transition-all focus:ring-2 focus:ring-[#AA14EC]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="••••••••"
                  required
                  className="transition-all focus:ring-2 focus:ring-[#AA14EC]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#AA14EC] hover:bg-[#9012cb] transition-colors duration-300"
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
  );
};

export default Login;
