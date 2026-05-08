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
      className="h-16 fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/80 bg-background/82 shadow-sm"
    >
      {/* background glow + chips */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-10 w-40 h-40 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_18%,transparent)]" />
        <div className="absolute -bottom-24 right-16 w-48 h-48 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-3)_16%,transparent)]" />
      </div>
      <div
        ref={glowLineRef}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"
      />
      <span
        ref={floatingRef1}
        className="hidden md:inline-flex absolute top-1.5 left-24 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-secondary/50 border border-border text-muted-foreground"
      >
        Learn Faster
      </span>
      <span
        ref={floatingRef2}
        className="hidden md:inline-flex absolute bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-accent/50 border border-border text-muted-foreground"
      >
        Ship Smarter
      </span>

      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-6 h-full px-4">
        <div className="flex items-center gap-2 group cursor-pointer">
          <School
            size={30}
            className="text-primary group-hover:text-[color:var(--brand-2)] transition-colors"
          />
          <Link to="/">
            <h1 className="brand-text hidden md:block font-extrabold text-2xl tracking-tight">
              E-Learning
            </h1>
          </Link>
        </div>

        {/* User icons and dark mode */}
        <div className="flex items-center gap-6 ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border cursor-pointer shadow-md hover:shadow-lg hover:border-primary transition-all">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt={user?.name || "@user"}
                      className="w-full h-full object-cover block"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground font-semibold">
                      CN
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-60 mt-2 bg-popover text-popover-foreground border border-border rounded-lg shadow-2xl p-2 space-y-2">
                <DropdownMenuLabel className="text-center font-semibold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-t border-border" />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-t border-border" />
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="p-2 rounded-md hover:bg-destructive/10 cursor-pointer text-destructive font-semibold"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="border-t border-border" />
                    <DropdownMenuItem className="p-0 rounded-md cursor-pointer overflow-hidden">
                      <Link
                        to="/admin/dashboard"
                        className="brand-gradient block w-full h-full text-primary-foreground text-center py-2 hover:brightness-105 transition"
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
        <h1 className="brand-text font-extrabold text-2xl">
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
          className="rounded-full"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[70%] max-w-xs flex flex-col bg-background text-foreground border-l border-border">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="brand-text text-xl font-bold">
            <Link to="/" className="hover:opacity-90">
              E-Learning
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 my-4" />

        <nav className="flex flex-col space-y-3 text-base font-medium items-center">
          <Link
            to="/my-learning"
            className="w-full text-center px-4 py-2 rounded-md bg-secondary/60 hover:bg-secondary transition border border-border"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="w-full text-center px-4 py-2 rounded-md bg-secondary/60 hover:bg-secondary transition border border-border"
          >
            Edit Profile
          </Link>
          <button
            onClick={() => {
              toast.success("Logged out");
              navigate("/login");
            }}
            className="w-full text-center px-4 py-2 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/15 transition font-medium"
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
