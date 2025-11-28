// src/components/SplashScreen.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const floatingLabels = [
  { text: "React", pos: "top-6 left-6" },
  { text: "GSAP Magic", pos: "bottom-10 right-8" },
  { text: "TypeScript Ready", pos: "top-1/2 right-4" },
];

const SplashScreen = ({ onFinish }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const floatingRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.6,
      })
        .from(
          cardRef.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          logoRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          taglineRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        );

      // Progress bar for ~6.2s
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 6.2,
        ease: "power1.inOut",
      });

      // Floating labels bounce around
      if (floatingRefs.current.length) {
        gsap.to(floatingRefs.current, {
          y: () => gsap.utils.random(-14, 14),
          x: () => gsap.utils.random(-12, 12),
          rotate: () => gsap.utils.random(-6, 6),
          repeat: -1,
          yoyo: true,
          duration: 2.6,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }

      // Total ~7 seconds then fade out and call onFinish
      gsap.delayedCall(6.8, () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -40,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            if (onFinish) onFinish();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 text-white overflow-hidden"
    >
      {/* Big gradient blobs in background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-10 w-72 h-72 bg-fuchsia-500/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 bg-indigo-500/40 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-white/5 rounded-[36px] bg-slate-900/40 backdrop-blur-3xl" />
      </div>

      <div
        ref={cardRef}
        className="relative w-[260px] sm:w-[320px] rounded-3xl bg-slate-900/85 border border-white/10 shadow-[0_0_80px_rgba(129,140,248,0.9)] px-8 py-7 backdrop-blur-2xl overflow-hidden"
      >
        {/* inner glow blobs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-400/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-sky-400/30 blur-3xl rounded-full" />

        <div className="relative z-10 text-center">
          <h1
            ref={logoRef}
            className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-fuchsia-300 via-violet-200 to-sky-300 bg-clip-text text-transparent"
          >
            E-Learning
          </h1>
          <p
            ref={taglineRef}
            className="mt-3 text-xs sm:text-sm text-slate-200/90"
          >
            Spinning up your personalized classroom experience...
          </p>

          <div className="mt-5 h-1.5 w-full rounded-full bg-slate-700/60 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-0 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400"
            />
          </div>

          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {floatingLabels.map((item, index) => (
              <span
                key={item.text}
                ref={(el) => (floatingRefs.current[index] = el)}
                className={`relative text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-white/15 text-slate-100/90 shadow-lg ${item.pos}`}
              >
                {item.text}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Loading · Animating · Optimizing
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
