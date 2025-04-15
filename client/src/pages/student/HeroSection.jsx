import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 px-4 pt-[64px] pb-15 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-2xl md:text-4xl font-extrabold mb-2 leading-tight">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-4 text-sm md:text-base">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          onSubmit={searchHandler}
          className="flex flex-col sm:flex-row items-stretch bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden max-w-xl mx-auto mb-4"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-violet-700 dark:bg-violet-800 text-white px-5 py-2 text-sm rounded-b-md sm:rounded-b-none sm:rounded-r-full hover:bg-violet-800 dark:hover:bg-violet-900"
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-violet-700 font-medium px-5 py-2 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
