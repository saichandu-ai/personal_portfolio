"use client";

import React, { Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneLighting } from "./SceneLighting";
import { ParticleField } from "./ParticleField";
import { GlassSphereHero } from "./GlassSphereHero";
import { SectionStructures } from "./SectionStructures";
import { useScene } from "./SceneContext";

function CameraController() {
  const { effectiveSection, mousePosition, isMobile } = useScene();
  const { camera } = useThree();

  useFrame((_, delta) => {
    let targetX = mousePosition.x * 0.35;
    let targetY = mousePosition.y * 0.25;
    let targetZ = 7.0;

    switch (effectiveSection) {
      case "home":
        targetX = mousePosition.x * 0.4;
        targetY = mousePosition.y * 0.3;
        targetZ = isMobile ? 8.2 : 6.8;
        break;
      case "about":
        // Camera moves to dynamic angle for flowing geometric formation
        targetX = -0.9 + mousePosition.x * 0.3;
        targetY = 0.4 + mousePosition.y * 0.25;
        targetZ = 6.2;
        break;
      case "education":
        // Shifts perspective toward timeline structures
        targetX = 0.8 + mousePosition.x * 0.3;
        targetY = -0.3 + mousePosition.y * 0.2;
        targetZ = 6.4;
        break;
      case "skills":
        // Closer zoom for dynamic rotating tech lattice
        targetX = -0.6 + mousePosition.x * 0.3;
        targetY = 0.2 + mousePosition.y * 0.2;
        targetZ = 5.7;
        break;
      case "projects":
        // Cinematic depth view for crystal monoliths
        targetX = 0.9 + mousePosition.x * 0.3;
        targetY = 0.5 + mousePosition.y * 0.2;
        targetZ = 5.6;
        break;
      case "certifications":
        // Centered floating view for glass shield
        targetX = -0.7 + mousePosition.x * 0.25;
        targetY = 0.1 + mousePosition.y * 0.2;
        targetZ = 6.2;
        break;
      case "journey":
        // Forward-surging angle for progressive flow
        targetX = mousePosition.x * 0.3;
        targetY = 0.6 + mousePosition.y * 0.2;
        targetZ = 5.9;
        break;
      case "contact":
        // Deep, calm, wide atmospheric angle
        targetX = mousePosition.x * 0.3;
        targetY = -0.4 + mousePosition.y * 0.2;
        targetZ = 7.2;
        break;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);
  });

  return null;
}

function SceneContent() {
  const { prefersReducedMotion } = useScene();

  return (
    <>
      <CameraController />
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,230,160,0.14),rgba(5,7,6,0))]" />
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
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-50" />
    </div>
  );
}
