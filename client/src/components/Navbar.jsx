// src/components/Navbar.jsx
import { Menu, School } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const glowLineRef = useRef(null);
  const floatingRef1 = useRef(null);
  const floatingRef2 = useRef(null);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      if (glowLineRef.current) {
        gsap.to(glowLineRef.current, {
          scaleX: 1.2,
          opacity: 0.8,
          repeat: -1,
          yoyo: true,
          duration: 2.4,
          ease: "sine.inOut",
        });
      }

      if (floatingRef1.current && floatingRef2.current) {
        gsap.to([floatingRef1.current, floatingRef2.current], {
          y: (i) => (i === 0 ? -4 : 4),
          x: (i) => (i === 0 ? 6 : -6),
          repeat: -1,
          yoyo: true,
          duration: 2.2,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="h-16 fixed top-0 left-0 right-0 z-50 backdrop-blur-xl shadow-[0_0_45px_rgba(129,140,248,0.5)] border-b border-slate-800/80 bg-gradient-to-r from-slate-950/95 via-indigo-950/90 to-slate-950/95"
    >
      {/* background glow + chips */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-10 w-40 h-40 bg-fuchsia-500/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 right-16 w-48 h-48 bg-indigo-500/25 blur-3xl rounded-full" />
      </div>
      <div
        ref={glowLineRef}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-60"
      />
      <span
        ref={floatingRef1}
        className="hidden md:inline-flex absolute top-1.5 left-24 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/5 border border-white/10 text-slate-200/80"
      >
        Learn Faster
      </span>
      <span
        ref={floatingRef2}
        className="hidden md:inline-flex absolute bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/5 border border-white/10 text-slate-200/80"
      >
        Ship Smarter
      </span>

      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-6 h-full px-4">
        <div className="flex items-center gap-2 group cursor-pointer">
          <School
            size={30}
            className="text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors"
          />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl tracking-tight bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              E-Learning
            </h1>
          </Link>
        </div>

        {/* User icons and dark mode */}
        <div className="flex items-center gap-6 ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-500/80 cursor-pointer shadow-md hover:shadow-lg hover:border-fuchsia-400 transition-all">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt={user?.name || "@user"}
                      className="w-full h-full object-cover block"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-200 font-semibold">
                      CN
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-60 mt-2 bg-slate-950/95 text-slate-100 border border-slate-700 rounded-xl shadow-2xl p-2 space-y-2">
                <DropdownMenuLabel className="text-center text-slate-100 font-semibold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-t border-slate-700" />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="p-2 rounded-md hover:bg-slate-800 cursor-pointer">
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 rounded-md hover:bg-slate-800 cursor-pointer">
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-t border-slate-700" />
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="p-2 rounded-md hover:bg-red-900/40 cursor-pointer text-red-400 font-semibold"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="border-t border-slate-700" />
                    <DropdownMenuItem className="p-0 rounded-md cursor-pointer overflow-hidden">
                      <Link
                        to="/admin/dashboard"
                        className="block w-full h-full text-white text-center py-2 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500 hover:brightness-110 transition"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
          E-Learning
        </h1>
        <MobileNavbar user={user} />
      </div>
    </header>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-slate-900/90 border border-slate-700 hover:bg-slate-800"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[70%] max-w-xs flex flex-col bg-slate-950 text-slate-100 border-l border-slate-800">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
            <Link to="/" className="hover:opacity-90">
              E-Learning
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 my-4 border-slate-700" />

        <nav className="flex flex-col space-y-3 text-base font-medium items-center">
          <Link
            to="/my-learning"
            className="w-full text-center px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 transition border border-slate-700"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="w-full text-center px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 transition border border-slate-700"
          >
            Edit Profile
          </Link>
          <button
            onClick={() => {
              toast.success("Logged out");
              navigate("/login");
            }}
            className="w-full text-center px-4 py-2 rounded-md bg-red-900/40 text-red-300 hover:bg-red-900/70 transition font-medium"
          >
            Log out
          </button>
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
                className="w-full"
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
