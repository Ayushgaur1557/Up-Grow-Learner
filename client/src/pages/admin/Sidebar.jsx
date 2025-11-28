// src/pages/admin/Sidebar.jsx
import { ChartNoAxesColumn, Menu, SquareLibrary, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const glowRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sidebarRef.current) {
        gsap.from(sidebarRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "sine.inOut",
        });
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-md bg-slate-950/90 shadow-lg border border-slate-700"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-16 left-0 z-30 h-screen w-[250px] sm:w-[280px] 
          bg-gradient-to-b from-slate-950/98 via-indigo-950/95 to-slate-950/98 
          border-r border-slate-800 p-5 space-y-8 shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block`}
      >
        <div
          ref={glowRef}
          className="absolute -top-10 left-10 w-40 h-40 bg-fuchsia-500/20 blur-3xl rounded-full pointer-events-none"
        ></div>

        <div className="space-y-6 relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Instructor Panel
          </p>
          <SidebarLink
            to="dashboard"
            icon={ChartNoAxesColumn}
            label="Dashboard"
            active={location.pathname.includes("/admin/dashboard")}
          />
          <SidebarLink
            to="course"
            icon={SquareLibrary}
            label="Courses"
            active={location.pathname.includes("/admin/course")}
          />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-10 right-10 w-52 h-52 bg-indigo-500/25 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] border border-slate-800/60 rounded-[36px] bg-slate-900/40" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm 
      transition-all hover:translate-x-1 ${
        active
          ? "bg-slate-800 text-fuchsia-300 border border-fuchsia-500/40 shadow-lg"
          : "text-slate-200 hover:bg-slate-900/80 border border-transparent"
      }`}
  >
    <Icon size={22} />
    <span>{label}</span>
  </Link>
);
