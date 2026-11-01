"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScene, SectionId } from "./3d/SceneContext";

interface SectionWrapperProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const { setHoveredSection, scrollDirection, prefersReducedMotion } = useScene();

  // Entrance variants based on scrollDirection and reduced motion preferences
  const initialVariants = prefersReducedMotion
    ? { opacity: 0, x: 0, y: 0, scale: 1 }
    : {
        opacity: 0,
        x: scrollDirection === "down" ? 30 : -30,
        y: 16,
        scale: 0.985,
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
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: prefersReducedMotion ? 0.35 : 0.7,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        viewport={{ once: true, amount: 0.08 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

