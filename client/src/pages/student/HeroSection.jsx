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
      className="relative px-4 pt-[72px] pb-16 text-center overflow-hidden"
    >
      {/* gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="soft-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-24 -left-10 w-72 h-72 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_22%,transparent)]" />
        <div className="absolute -bottom-32 -right-10 w-80 h-80 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-3)_20%,transparent)]" />
      </div>

      {/* floating label words */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {floatingLabels.map((item, index) => (
          <span
            key={item.text}
            ref={(el) => (floatingRefs.current[index] = el)}
            className={`absolute text-[11px] sm:text-xs font-semibold tracking-wide text-muted-foreground bg-card/60 px-3 py-1 rounded-full border border-border backdrop-blur-md ${item.pos}`}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h1
          ref={titleRef}
          className="text-foreground text-3xl md:text-5xl font-extrabold mb-2 leading-tight"
        >
          Find the{" "}
          <span className="brand-text">
            Best Courses
          </span>{" "}
          for You
        </h1>
        <p
          ref={subtitleRef}
          className="text-muted-foreground mb-4 text-sm md:text-base"
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
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-secondary/70 border border-border text-secondary-foreground backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={searchHandler}
          className="ui-card flex flex-col sm:flex-row items-stretch rounded-full overflow-hidden max-w-xl mx-auto mb-4 p-1"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, topics, or instructors..."
            className="flex-grow border-none focus-visible:ring-0 px-4 py-3 text-sm md:text-base text-foreground placeholder:text-muted-foreground bg-transparent"
          />
          <Button
            type="submit"
            className="px-6 py-3 text-sm md:text-base font-semibold rounded-full"
          >
            Search
          </Button>
        </form>

        <div ref={exploreRef}>
          <Button
            onClick={() => navigate(`/course/search?query=`)}
            className="font-medium px-5 py-2 text-sm md:text-base rounded-full"
          >
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
