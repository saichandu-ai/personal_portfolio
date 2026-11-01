"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SceneProvider } from "@/components/3d/SceneContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Dynamically import Three.js background with ssr: false to prevent hydration mismatches
const InteractiveBackground = dynamic(
  () => import("@/components/3d/InteractiveBackground"),
  { ssr: false }
);

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <SceneProvider>
      {/* Initial Cinematic Loading Experience */}
      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}

      {/* Real-time Interactive Three.js Background System */}
      <InteractiveBackground />

      {/* Main Portfolio Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <SectionWrapper id="home">
            <Hero />
          </SectionWrapper>
          <SectionWrapper id="about">
            <About />
          </SectionWrapper>
          <SectionWrapper id="education">
            <Education />
          </SectionWrapper>
          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>
          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>
          <SectionWrapper id="certifications">
            <Certifications />
          </SectionWrapper>
          <SectionWrapper id="journey">
            <Journey />
          </SectionWrapper>
          <SectionWrapper id="contact">
            <Contact />
          </SectionWrapper>
        </main>
        <Footer />
      </div>
    </SceneProvider>
  );
}
