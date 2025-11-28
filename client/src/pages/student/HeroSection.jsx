// src/pages/student/HeroSection.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const heroKeywords = [
  "JavaScript",
  "React",
  "Next.js",
  "Backend",
  "UI / UX",
  "Data Structures",
  "System Design",
];

const floatingLabels = [
  { text: "Level Up", pos: "top-8 left-4" },
  { text: "Ship Faster", pos: "bottom-14 right-6" },
  { text: "Think in Code", pos: "top-1/2 right-4" },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const exploreRef = useRef(null);
  const keywordsRowRef = useRef(null);
  const floatingRefs = useRef([]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.7,
          },
          "-=0.3"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          formRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          exploreRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.4,
          },
          "-=0.3"
        );

      // Auto-scrolling keywords strip
      if (keywordsRowRef.current) {
        gsap.to(keywordsRowRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 26,
          ease: "linear",
        });
      }

      // Floating bouncing words around hero
      if (floatingRefs.current.length) {
        gsap.to(floatingRefs.current, {
          y: () => gsap.utils.random(-16, 16),
          x: () => gsap.utils.random(-12, 12),
          rotate: () => gsap.utils.random(-6, 6),
          repeat: -1,
          yoyo: true,
          duration: 2.8,
          ease: "sine.inOut",
          stagger: 0.25,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-4 pt-[72px] pb-16 text-center overflow-hidden"
    >
      {/* gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-10 w-72 h-72 bg-fuchsia-400/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute -bottom-32 -right-10 w-80 h-80 bg-indigo-400/40 blur-3xl rounded-full animate-pulse" />
      </div>

      {/* floating label words */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {floatingLabels.map((item, index) => (
          <span
            key={item.text}
            ref={(el) => (floatingRefs.current[index] = el)}
            className={`absolute text-[11px] sm:text-xs font-semibold tracking-wide text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md ${item.pos}`}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h1
          ref={titleRef}
          className="text-white text-3xl md:text-5xl font-extrabold mb-2 leading-tight"
        >
          Find the{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-white to-cyan-200 bg-clip-text text-transparent">
            Best Courses
          </span>{" "}
          for You
        </h1>
        <p
          ref={subtitleRef}
          className="text-violet-100/90 dark:text-gray-200 mb-4 text-sm md:text-base"
        >
          Discover, learn, and upskill with curated content from top instructors.
        </p>

        {/* auto-scrolling keyword chips */}
        <div className="mt-4 mb-4 overflow-hidden">
          <div
            ref={keywordsRowRef}
            className="flex gap-3 whitespace-nowrap justify-center"
          >
            {[...heroKeywords, ...heroKeywords].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-white/10 border border-white/20 text-violet-50 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={searchHandler}
          className="flex flex-col sm:flex-row items-stretch bg-white/95 dark:bg-slate-900/90 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-4"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, topics, or instructors..."
            className="flex-grow border-none focus-visible:ring-0 px-4 py-3 text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
          />
          <Button
            type="submit"
            className="bg-violet-700 dark:bg-violet-800 text-white px-6 py-3 text-sm md:text-base font-semibold rounded-b-md sm:rounded-b-none sm:rounded-r-full hover:bg-violet-800 dark:hover:bg-violet-900"
          >
            Search
          </Button>
        </form>

        <div ref={exploreRef}>
          <Button
            onClick={() => navigate(`/course/search?query=`)}
            className="bg-white/10 dark:bg-gray-900/80 text-violet-50 font-medium px-5 py-2 text-sm md:text-base rounded-full hover:bg-white/20 dark:hover:bg-gray-800 transition border border-white/20"
          >
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
