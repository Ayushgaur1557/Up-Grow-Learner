// src/layout/MainLayout.jsx
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <Navbar />
      <div className="flex-1 mt-16 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainLayout;
