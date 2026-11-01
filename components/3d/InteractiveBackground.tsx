"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneLighting } from "./SceneLighting";
import { ParticleField } from "./ParticleField";
import { GlassSphereHero } from "./GlassSphereHero";
import { SectionStructures } from "./SectionStructures";
import { useScene } from "./SceneContext";

function SceneContent() {
  const { prefersReducedMotion } = useScene();

  return (
    <>
      <SceneLighting />
      {!prefersReducedMotion && (
        <>
          <ParticleField />
          <GlassSphereHero />
          <SectionStructures />
        </>
      )}
    </>
  );
}

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050706]">
      {/* Subtle radial emerald gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,230,160,0.12),rgba(5,7,6,0))]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />
    </div>
  );
}

