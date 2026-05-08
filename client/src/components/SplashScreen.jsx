// src/components/SplashScreen.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const floatingLabels = ["Courses", "Progress", "Mentors"];

const SplashScreen = ({ onFinish }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const floatingRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(containerRef.current, { opacity: 0, duration: 0.35 })
        .from(
          cardRef.current,
          { y: 28, opacity: 0, scale: 0.96, duration: 0.55 },
          "-=0.1"
        )
        .from(logoRef.current, { y: 16, opacity: 0, duration: 0.42 }, "-=0.25")
        .from(
          taglineRef.current,
          { y: 12, opacity: 0, duration: 0.36 },
          "-=0.22"
        );

      gsap.to(progressRef.current, {
        width: "100%",
        duration: 2.2,
        ease: "power1.inOut",
      });

      gsap.to(floatingRefs.current, {
        y: () => gsap.utils.random(-10, 10),
        x: () => gsap.utils.random(-8, 8),
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
        stagger: 0.14,
      });

      gsap.delayedCall(2.55, () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -18,
          duration: 0.42,
          ease: "power2.in",
          onComplete: onFinish,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="soft-grid absolute inset-0 opacity-70" />
        <div className="absolute -top-32 -left-10 w-72 h-72 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_28%,transparent)]" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-3)_26%,transparent)]" />
      </div>

      <div
        ref={cardRef}
        className="ui-card relative w-[270px] sm:w-[340px] rounded-lg px-8 py-7 overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand)_28%,transparent)]" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_25%,transparent)]" />

        <div className="relative z-10 text-center">
          <h1 ref={logoRef} className="brand-text text-3xl font-black">
            E-Learning
          </h1>
          <p ref={taglineRef} className="mt-3 text-sm text-muted-foreground">
            Preparing your learning dashboard
          </p>

          <div className="mt-5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div ref={progressRef} className="brand-gradient h-full w-0" />
          </div>

          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {floatingLabels.map((item, index) => (
              <span
                key={item}
                ref={(el) => (floatingRefs.current[index] = el)}
                className="text-[11px] font-semibold px-3 py-1 rounded-full bg-secondary/70 border border-border text-secondary-foreground shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Learn - Practice - Grow
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
