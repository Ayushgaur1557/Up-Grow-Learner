import { ChartNoAxesColumn, Menu, SquareLibrary, X } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors">
      {/* 📱 Toggle Button (Mobile only) */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-md bg-background shadow-md border border-border"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 🟪 Sidebar */}
      <div
        className={`
          fixed top-16 left-0 z-30 h-screen w-[250px] sm:w-[300px]
          transition-transform duration-300 ease-in-out
          bg-background border-r border-border
          p-5 space-y-8
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <div className="space-y-4">
          <Link
            to="dashboard"
            className="flex items-center gap-3 hover:text-primary font-medium transition-all hover:translate-x-1"
          >
            <ChartNoAxesColumn size={22} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="course"
            className="flex items-center gap-3 hover:text-primary font-medium transition-all hover:translate-x-1"
          >
            <SquareLibrary size={22} />
            <span>Courses</span>
          </Link>
        </div>
      </div>

      {/* ✅ Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
