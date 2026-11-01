"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

export type SectionId =
  | "home"
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "journey"
  | "contact";

export const SECTION_ORDER: SectionId[] = [
  "home",
  "about",
  "education",
  "skills",
  "projects",
  "certifications",
  "journey",
  "contact",
];

interface SceneContextValue {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  hoveredSection: SectionId | null;
  setHoveredSection: (section: SectionId | null) => void;
  direction: number; // 1 for forward, -1 for backward
  navigateToSection: (section: SectionId, explicitDirection?: number) => void;
  goToNextSection: () => void;
  goToPrevSection: () => void;
  currentIndex: number;
  totalSections: number;
  mousePosition: { x: number; y: number; targetX: number; targetY: number };
  scrollProgress: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isTransitioning: boolean;
}

const SceneContext = createContext<SceneContextValue>({
  activeSection: "home",
  setActiveSection: () => {},
  hoveredSection: null,
  setHoveredSection: () => {},
  direction: 1,
  navigateToSection: () => {},
  goToNextSection: () => {},
  goToPrevSection: () => {},
  currentIndex: 0,
  totalSections: SECTION_ORDER.length,
  mousePosition: { x: 0, y: 0, targetX: 0, targetY: 0 },
  scrollProgress: 0,
  isMobile: false,
  prefersReducedMotion: false,
  isTransitioning: false,
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>("home");
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse coords normalized to [-1, 1]
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const activeSectionRef = useRef<SectionId>("home");
  activeSectionRef.current = activeSection;

  const currentIndex = SECTION_ORDER.indexOf(activeSection);
  const totalSections = SECTION_ORDER.length;

  const navigateToSection = useCallback(
    (targetSection: SectionId, explicitDirection?: number) => {
      if (targetSection === activeSectionRef.current) return;

      const currentIdx = SECTION_ORDER.indexOf(activeSectionRef.current);
      const targetIdx = SECTION_ORDER.indexOf(targetSection);
      if (targetIdx === -1) return;

      const computedDir = explicitDirection ?? (targetIdx > currentIdx ? 1 : -1);

      setDirection(computedDir);
      setIsTransitioning(true);
      setActiveSectionState(targetSection);

      // Update URL hash cleanly without page reload
      if (typeof window !== "undefined") {
        window.history.pushState({ section: targetSection }, "", `#${targetSection}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 850);
    },
    []
  );

  const goToNextSection = useCallback(() => {
    const currentIdx = SECTION_ORDER.indexOf(activeSectionRef.current);
    if (currentIdx < SECTION_ORDER.length - 1) {
      navigateToSection(SECTION_ORDER[currentIdx + 1], 1);
    }
  }, [navigateToSection]);

  const goToPrevSection = useCallback(() => {
    const currentIdx = SECTION_ORDER.indexOf(activeSectionRef.current);
    if (currentIdx > 0) {
      navigateToSection(SECTION_ORDER[currentIdx - 1], -1);
    }
  }, [navigateToSection]);

  const setActiveSection = useCallback(
    (section: SectionId) => {
      navigateToSection(section);
    },
    [navigateToSection]
  );

  useEffect(() => {
    // Check mobile and reduced motion
    const checkMedia = () => {
      setIsMobile(window.innerWidth < 768);
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);
    };

    checkMedia();
    window.addEventListener("resize", checkMedia);

    // Initial check for URL hash
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "") as SectionId;
      if (SECTION_ORDER.includes(hash)) {
        setActiveSectionState(hash);
      }
    }

    // Handle browser back and forward buttons
    const handlePopState = (e: PopStateEvent) => {
      let targetSection: SectionId = "home";
      if (e.state && e.state.section && SECTION_ORDER.includes(e.state.section)) {
        targetSection = e.state.section;
      } else if (window.location.hash) {
        const hash = window.location.hash.replace("#", "") as SectionId;
        if (SECTION_ORDER.includes(hash)) {
          targetSection = hash;
        }
      }

      const currentIdx = SECTION_ORDER.indexOf(activeSectionRef.current);
      const targetIdx = SECTION_ORDER.indexOf(targetSection);
      const computedDir = targetIdx >= currentIdx ? 1 : -1;

      setDirection(computedDir);
      setActiveSectionState(targetSection);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Keyboard navigation (ArrowLeft / ArrowRight / PageUp / PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.closest("form"))
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        goToNextSection();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        goToPrevSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Scroll progress listener
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(Math.max(currentScroll / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMedia);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [goToNextSection, goToPrevSection]);

  return (
    <SceneContext.Provider
      value={{
        activeSection,
        setActiveSection,
        hoveredSection,
        setHoveredSection,
        direction,
        navigateToSection,
        goToNextSection,
        goToPrevSection,
        currentIndex,
        totalSections,
        mousePosition: mouseRef.current,
        scrollProgress,
        isMobile,
        prefersReducedMotion,
        isTransitioning,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}
