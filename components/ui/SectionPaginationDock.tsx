"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScene, SECTION_ORDER, SectionId } from "../3d/SceneContext";

const SECTION_LABELS: Record<SectionId, string> = {
  home: "Home",
  about: "About",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  journey: "Journey",
  contact: "Contact",
};

export function SectionPaginationDock() {
  const {
    activeSection,
    navigateToSection,
    goToNextSection,
    goToPrevSection,
    currentIndex,
    totalSections,
    isTransitioning,
  } = useScene();

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;

  const prevLabel = !isFirst ? SECTION_LABELS[SECTION_ORDER[currentIndex - 1]] : "";
  const nextLabel = !isLast ? SECTION_LABELS[SECTION_ORDER[currentIndex + 1]] : "";

  return (
    <aside
      aria-label="Section Navigation Dock"
      className="fixed bottom-5 inset-x-0 z-30 pointer-events-none flex justify-center px-4"
    >
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full glass-pill bg-[#0B100D]/90 border border-[rgba(0,230,160,0.25)] shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,230,160,0.12)] backdrop-blur-2xl"
      >
        {/* Previous Section Button */}
        <button
          type="button"
          onClick={goToPrevSection}
          disabled={isFirst || isTransitioning}
          aria-label={!isFirst ? `Go to previous section: ${prevLabel}` : "Previous section (disabled)"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
            isFirst
              ? "opacity-30 cursor-not-allowed text-[#A7B5AD]"
              : "text-[#A7B5AD] hover:text-[#00E6A0] hover:bg-[rgba(0,230,160,0.1)] cursor-pointer"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-sans">{prevLabel || "Prev"}</span>
        </button>

        {/* Section Dots & Indicator */}
        <div className="flex items-center gap-1.5 px-1 sm:px-2 border-x border-[rgba(0,230,160,0.18)]">
          {SECTION_ORDER.map((id, index) => {
            const isActive = id === activeSection;
            return (
              <button
                key={id}
                type="button"
                onClick={() => navigateToSection(id)}
                disabled={isTransitioning}
                aria-label={`Jump to section ${index + 1}: ${SECTION_LABELS[id]}`}
                className="group relative p-1 cursor-pointer focus:outline-none"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-5 h-2 bg-[#00E6A0] shadow-[0_0_10px_#00E6A0]"
                      : "w-2 h-2 bg-[#A7B5AD]/40 hover:bg-[#8BFFD5]/70"
                  }`}
                />
                {/* Micro tooltip */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-[#F5FFF9] bg-[#0B100D] border border-[rgba(0,230,160,0.3)] shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {SECTION_LABELS[id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Section Counter */}
        <span className="hidden md:inline text-[11px] font-mono font-medium text-[#8BFFD5] tracking-widest pl-1">
          {String(currentIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>

        {/* Next Section Button */}
        <button
          type="button"
          onClick={goToNextSection}
          disabled={isLast || isTransitioning}
          aria-label={!isLast ? `Go to next section: ${nextLabel}` : "Next section (disabled)"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
            isLast
              ? "opacity-30 cursor-not-allowed text-[#A7B5AD]"
              : "text-[#00E6A0] hover:bg-[rgba(0,230,160,0.15)] hover:shadow-[0_0_12px_rgba(0,230,160,0.3)] cursor-pointer"
          }`}
        >
          <span className="hidden sm:inline font-sans">{nextLabel || "Next"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </motion.nav>
    </aside>
  );
}

