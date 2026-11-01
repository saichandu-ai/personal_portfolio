"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene, SectionId } from "./3d/SceneContext";
import { sectionTransitionVariants, reducedMotionVariants } from "./ui/Transitions";
import { Hero } from "./Hero";
import { About } from "./About";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Certifications } from "./Certifications";
import { Journey } from "./Journey";
import { Contact } from "./Contact";

function renderSection(section: SectionId) {
  switch (section) {
    case "home":
      return <Hero />;
    case "about":
      return <About />;
    case "education":
      return <Education />;
    case "skills":
      return <Skills />;
    case "projects":
      return <Projects />;
    case "certifications":
      return <Certifications />;
    case "journey":
      return <Journey />;
    case "contact":
      return <Contact />;
    default:
      return <Hero />;
  }
}

export function SectionTransitionView() {
  const { activeSection, direction, prefersReducedMotion, setHoveredSection } = useScene();

  return (
    <div className="relative w-full flex-1 flex flex-col justify-start overflow-x-hidden min-h-[calc(100vh-160px)] px-2 sm:px-4 md:px-6">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={activeSection}
          custom={direction}
          variants={prefersReducedMotion ? reducedMotionVariants : sectionTransitionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full flex-1 flex flex-col justify-start"
        >
          {/* Subtle Premium Section Hover Pop-Up & 3D Interactive Transformation Trigger */}
          <div
            onMouseEnter={() => setHoveredSection(activeSection)}
            onMouseLeave={() => setHoveredSection(null)}
            className="section-hover-pop w-full flex-1 flex flex-col justify-start"
          >
            {renderSection(activeSection)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
