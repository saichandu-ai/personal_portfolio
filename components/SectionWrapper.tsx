"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScene, SectionId } from "./3d/SceneContext";

interface SectionWrapperProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const { setHoveredSection, scrollDirection, isMobile, prefersReducedMotion } = useScene();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      }
    };
    if (window.scrollY > 20) {
      setHasScrolled(true);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute cinematic horizontal offset:
  // When scrolling down: enters from left (-55px desktop, -28px mobile) -> smoothly slides right into place
  // When scrolling up: enters from right (+55px desktop, +28px mobile) -> smoothly slides in reverse direction
  const xOffset = isMobile ? 28 : 55;
  const isScrollDown = scrollDirection === "down";

  // If this is the initial load of the top section (home) before any user scrolling,
  // display it immediately to avoid delaying first contentful paint.
  const isInitialHome = id === "home" && !hasScrolled;

  const initialVariants = prefersReducedMotion
    ? { opacity: 0, x: 0, y: 0, filter: "blur(0px)", scale: 1 }
    : isInitialHome
    ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 }
    : {
        opacity: 0,
        x: isScrollDown ? -xOffset : xOffset,
        y: 0,
        filter: "blur(8px)",
        scale: 0.99,
      };

  const inViewVariants = {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.35 : 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  };

  return (
    <section
      id={id}
      onMouseEnter={() => setHoveredSection(id)}
      onMouseLeave={() => setHoveredSection(null)}
      className={`scroll-mt-24 relative section-hover-pop my-4 sm:my-8 transition-colors duration-300 ${className}`}
    >
      <motion.div
        initial={initialVariants}
        whileInView={inViewVariants}
        viewport={{
          once: false,
          amount: 0.12,
          margin: "0px 0px -50px 0px",
        }}
        className="w-full h-full relative"
      >
        {/* Subtle Ambient Glow Aura during Reveal */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.45, 0] }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[rgba(0,230,160,0.18)] via-[rgba(139,255,213,0.12)] to-transparent blur-xl pointer-events-none -z-10"
          />
        )}
        {children}
      </motion.div>
    </section>
  );
}
