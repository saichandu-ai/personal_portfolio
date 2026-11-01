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
  effectiveSection: SectionId;
  scrollDirection: "down" | "up";
  direction: "down" | "up";
  isTransitioning: boolean;
  navigateToSection: (section: SectionId) => void;
  goToNextSection: () => void;
  goToPrevSection: () => void;
  currentIndex: number;
  totalSections: number;
  mousePosition: { x: number; y: number; targetX: number; targetY: number };
  scrollProgress: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const SceneContext = createContext<SceneContextValue>({
  activeSection: "home",
  setActiveSection: () => {},
  hoveredSection: null,
  setHoveredSection: () => {},
  effectiveSection: "home",
  scrollDirection: "down",
  direction: "down",
  isTransitioning: false,
  navigateToSection: () => {},
  goToNextSection: () => {},
  goToPrevSection: () => {},
  currentIndex: 0,
  totalSections: SECTION_ORDER.length,
  mousePosition: { x: 0, y: 0, targetX: 0, targetY: 0 },
  scrollProgress: 0,
  isMobile: false,
  prefersReducedMotion: false,
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>("home");
  const [hoveredSection, setHoveredSectionState] = useState<SectionId | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse coords normalized to [-1, 1]
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const activeSectionRef = useRef<SectionId>("home");
  activeSectionRef.current = activeSection;

  const lastScrollYRef = useRef(0);

  // The effective section driving the 3D background in real time
  const effectiveSection: SectionId = hoveredSection ?? activeSection;

  const currentIndex = SECTION_ORDER.indexOf(activeSection);
  const totalSections = SECTION_ORDER.length;

  const navigateToSection = useCallback((targetSection: SectionId) => {
    setActiveSectionState(targetSection);
    if (typeof window !== "undefined") {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      window.history.pushState({ section: targetSection }, "", `#${targetSection}`);
    }
  }, []);

  const goToNextSection = useCallback(() => {
    const currentIdx = SECTION_ORDER.indexOf(activeSectionRef.current);
    if (currentIdx < SECTION_ORDER.length - 1) {
      navigateToSection(SECTION_ORDER[currentIdx + 1]);
    }
  }, [navigateToSection]);

  const goToPrevSection = useCallback(() => {
    const currentIdx = SECTION_ORDER.indexOf(activeSectionRef.current);
    if (currentIdx > 0) {
      navigateToSection(SECTION_ORDER[currentIdx - 1]);
    }
  }, [navigateToSection]);

  const setActiveSection = useCallback(
    (section: SectionId) => {
      setActiveSectionState(section);
    },
    []
  );

  const setHoveredSection = useCallback((section: SectionId | null) => {
    setHoveredSectionState(section);
  }, []);

  useEffect(() => {
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
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }

    // Scroll listener: tracks direction, progress, and edge thresholds
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current + 5) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollYRef.current - 5) {
        setScrollDirection("up");
      }
      lastScrollYRef.current = currentScrollY;

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(currentScrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);

      if (currentScrollY < 120) {
        setActiveSectionState("home");
      } else if (totalScroll > 0 && currentScrollY >= totalScroll - 80) {
        setActiveSectionState("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver: automatically detects active section for sticky navbar highlight
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (window.scrollY >= 120) {
          let highestRatio = -1;
          let bestSection: SectionId | null = null;
          visibleSections.forEach((ratio, id) => {
            if (ratio > highestRatio && SECTION_ORDER.includes(id as SectionId)) {
              highestRatio = ratio;
              bestSection = id as SectionId;
            }
          });

          if (bestSection) {
            setActiveSectionState(bestSection);
          }
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -30% 0px",
        threshold: [0, 0.1, 0.2, 0.4, 0.6, 0.8],
      }
    );

    const observeAll = () => {
      SECTION_ORDER.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeAll();
    const timer = setTimeout(observeAll, 300);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle browser popstate
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
      setActiveSectionState(targetSection);
      const el = document.getElementById(targetSection);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMedia);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("popstate", handlePopState);
      observer.disconnect();
    };
  }, []);

  return (
    <SceneContext.Provider
      value={{
        activeSection,
        setActiveSection,
        hoveredSection,
        setHoveredSection,
        effectiveSection,
        scrollDirection,
        direction: scrollDirection,
        isTransitioning: false,
        navigateToSection,
        goToNextSection,
        goToPrevSection,
        currentIndex,
        totalSections,
        mousePosition: mouseRef.current,
        scrollProgress,
        isMobile,
        prefersReducedMotion,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}
