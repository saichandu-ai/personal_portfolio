"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function SceneLighting() {
  const { mousePosition, effectiveSection } = useScene();
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const secondaryLightRef = useRef<THREE.PointLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  // Section currently driving the 3D lighting (hovered section overrides active scrolled section)
  const currentSection = effectiveSection;

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    if (cursorLightRef.current) {
      // Light follows mouse smoothly in 3D
      let targetX = mousePosition.x * 4;
      let targetY = mousePosition.y * 3;
      let targetZ = 2.5;
      let targetIntensity = 28;
      let lightColorHex = "#00E6A0";

      // Base active section intensity
      if (currentSection === "home") targetIntensity = 36;
      if (currentSection === "contact") targetIntensity = 22;

      // Section-specific lighting transformations
      if (currentSection === "about") {
        // Emerald lighting becomes more prominent
        targetIntensity = 54;
        lightColorHex = "#00FFB2";
        targetZ = 2.8;
      } else if (currentSection === "education") {
        // Soft focus repositioned toward timeline geometries
        targetIntensity = 42;
        targetX = mousePosition.x * 3 + 1.2;
        targetZ = 2.2;
        lightColorHex = "#00E6A0";
      } else if (currentSection === "skills") {
        // Dynamic pulsating emerald energy
        targetIntensity = 44 + Math.sin(time * 3) * 8;
        lightColorHex = "#5CFFCC";
        targetZ = 2.4;
      } else if (currentSection === "projects") {
        // Cinematic emerald light trails & depth effect
        targetIntensity = 48;
        targetZ = 3.2;
        lightColorHex = "#00E6A0";
      } else if (currentSection === "certifications") {
        // Refined floating illumination
        targetIntensity = 38;
        targetZ = 2.2;
        lightColorHex = "#8BFFD5";
      } else if (currentSection === "journey") {
        // Progressive moving beam
        targetIntensity = 46;
        targetX = Math.sin(time * 1.5) * 2.5;
        targetZ = 2.6;
        lightColorHex = "#00E6A0";
      } else if (currentSection === "contact") {
        // Premium finishing atmosphere (calm, deep, elegant emerald)
        targetIntensity = 32;
        targetZ = 2.0;
        lightColorHex = "#8BFFD5";
      }

      // Smooth interpolation for cursor light
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
      cursorLightRef.current.position.z = THREE.MathUtils.damp(
        cursorLightRef.current.position.z,
        targetZ,
        3,
        delta
      );

      cursorLightRef.current.intensity = THREE.MathUtils.damp(
        cursorLightRef.current.intensity,
        targetIntensity,
        3.5,
        delta
      );

      cursorLightRef.current.color.lerp(new THREE.Color(lightColorHex), delta * 3);
    }

    if (secondaryLightRef.current) {
      // Counter-balance light reacts to section
      let secTargetIntensity = 14;
      if (currentSection === "skills") secTargetIntensity = 22;
      if (currentSection === "projects") secTargetIntensity = 26;
      if (currentSection === "contact") secTargetIntensity = 10;

      secondaryLightRef.current.position.x = -mousePosition.x * 2.5;
      secondaryLightRef.current.position.y = -mousePosition.y * 2.5;
      secondaryLightRef.current.intensity = THREE.MathUtils.damp(
        secondaryLightRef.current.intensity,
        secTargetIntensity,
        3,
        delta
      );
    }

    if (ambientLightRef.current) {
      let ambientTarget = 1.8;
      if (currentSection === "about") ambientTarget = 2.4;
      if (currentSection === "contact") ambientTarget = 1.5;

      ambientLightRef.current.intensity = THREE.MathUtils.damp(
        ambientLightRef.current.intensity,
        ambientTarget,
        3,
        delta
      );
    }

    if (directionalLightRef.current) {
      let dirTarget = 2.5;
      if (currentSection === "projects") dirTarget = 4.2; // Dramatic rim reflections on crystals
      if (currentSection === "skills") dirTarget = 3.2;

      directionalLightRef.current.intensity = THREE.MathUtils.damp(
        directionalLightRef.current.intensity,
        dirTarget,
        3,
        delta
      );
    }
  });

  return (
    <>
      {/* Deep obsidian ambient base */}
      <ambientLight ref={ambientLightRef} color="#08140E" intensity={1.8} />

      {/* Main cursor-following emerald light */}
      <pointLight
        ref={cursorLightRef}
        color="#00E6A0"
        intensity={30}
        distance={16}
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
        ref={directionalLightRef}
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
