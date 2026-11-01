"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

export type SectionId =
  | "home"
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "journey"
  | "contact";

interface SceneContextValue {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  mousePosition: { x: number; y: number; targetX: number; targetY: number };
  scrollProgress: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const SceneContext = createContext<SceneContextValue>({
  activeSection: "home",
  setActiveSection: () => {},
  mousePosition: { x: 0, y: 0, targetX: 0, targetY: 0 },
  scrollProgress: 0,
  isMobile: false,
  prefersReducedMotion: false,
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse coords normalized to [-1, 1]
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Check mobile and reduced motion
    const checkMedia = () => {
      setIsMobile(window.innerWidth < 768);
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);
    };

    checkMedia();
    window.addEventListener("resize", checkMedia);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Scroll progress listener & section observer
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(Math.max(currentScroll / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver for active section
    const sections: SectionId[] = [
      "home",
      "about",
      "education",
      "skills",
      "projects",
      "certifications",
      "journey",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("resize", checkMedia);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <SceneContext.Provider
      value={{
        activeSection,
        setActiveSection,
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

