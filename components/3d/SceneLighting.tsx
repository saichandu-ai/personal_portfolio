"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function SceneLighting() {
  const { mousePosition, activeSection } = useScene();
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const secondaryLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (cursorLightRef.current) {
      // Light follows mouse smoothly in 3D
      const targetX = mousePosition.x * 4;
      const targetY = mousePosition.y * 3;
      cursorLightRef.current.position.x = THREE.MathUtils.damp(
        cursorLightRef.current.position.x,
        targetX,
        4,
        delta
      );
      cursorLightRef.current.position.y = THREE.MathUtils.damp(
        cursorLightRef.current.position.y,
        targetY,
        4,
        delta
      );
      cursorLightRef.current.position.z = 2.5;

      // Adjust intensity slightly based on section
      let targetIntensity = 28;
      if (activeSection === "home") targetIntensity = 36;
      if (activeSection === "contact") targetIntensity = 20;

      cursorLightRef.current.intensity = THREE.MathUtils.damp(
        cursorLightRef.current.intensity,
        targetIntensity,
        3,
        delta
      );
    }

    if (secondaryLightRef.current) {
      // Counter-balance light
      secondaryLightRef.current.position.x = -mousePosition.x * 2.5;
      secondaryLightRef.current.position.y = -mousePosition.y * 2.5;
    }
  });

  return (
    <>
      {/* Deep obsidian ambient base */}
      <ambientLight color="#08140E" intensity={1.8} />

      {/* Main cursor-following emerald light */}
      <pointLight
        ref={cursorLightRef}
        color="#00E6A0"
        intensity={30}
        distance={15}
        decay={2}
        position={[0, 0, 2.5]}
      />

      {/* Secondary mint fill light */}
      <pointLight
        ref={secondaryLightRef}
        color="#8BFFD5"
        intensity={14}
        distance={18}
        decay={2}
        position={[-3, 2, -2]}
      />

      {/* Deep emerald rim light from behind */}
      <directionalLight
        color="#087F5B"
        intensity={2.5}
        position={[0, -5, -4]}
      />

      {/* Top subtle highlight */}
      <directionalLight
        color="#F5FFF9"
        intensity={1.2}
        position={[3, 5, 4]}
      />
    </>
  );
}

