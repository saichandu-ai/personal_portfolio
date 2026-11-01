"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SceneProvider } from "@/components/3d/SceneContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { SectionTransitionView } from "@/components/SectionTransitionView";
import { SectionPaginationDock } from "@/components/ui/SectionPaginationDock";
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
        <main className="flex-1 flex flex-col justify-start pt-16">
          <SectionTransitionView />
        </main>
        <SectionPaginationDock />
        <Footer />
      </div>
    </SceneProvider>
  );
}
