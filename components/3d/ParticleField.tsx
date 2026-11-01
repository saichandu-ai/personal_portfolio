"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function ParticleField() {
  const { isMobile, mousePosition, activeSection, hoveredSection } = useScene();
  const pointsRef = useRef<THREE.Points>(null);

  const count = isMobile ? 180 : 380;
  const currentHover = hoveredSection ?? (isMobile ? activeSection : null);

  const [positions, colors, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const emeraldColor = new THREE.Color("#00E6A0");
    const mintColor = new THREE.Color("#8BFFD5");
    const deepColor = new THREE.Color("#087F5B");

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16;
      const x = Math.cos(theta) * radius;
      const z = (Math.random() - 0.5) * 10 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const rand = Math.random();
      const chosenColor = rand > 0.4 ? emeraldColor : rand > 0.15 ? mintColor : deepColor;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col, orig];
  }, [count]);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const time = clock.getElapsedTime();

    // Section-specific dynamic particle speed and flow factors
    let speedMult = 1.0;
    let waveMult = 1.0;
    let verticalFlow = 0;
    let progressiveFlow = 0;

    if (currentHover === "skills") {
      // Emerald particles become slightly more active
      speedMult = 2.2;
      waveMult = 1.6;
    } else if (currentHover === "education") {
      // Subtle flowing effect along timeline
      speedMult = 1.4;
      verticalFlow = 0.6;
    } else if (currentHover === "projects") {
      // Subtle light trails & depth effect
      speedMult = 1.3;
      waveMult = 1.3;
    } else if (currentHover === "journey") {
      // Progressive forward-moving motion
      speedMult = 1.8;
      progressiveFlow = 0.8;
    } else if (currentHover === "contact") {
      // Calm, elegant atmosphere
      speedMult = 0.6;
      waveMult = 0.7;
    }

    const mouseInfluenceX = mousePosition.x * 0.4;
    const mouseInfluenceY = mousePosition.y * 0.4;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];

      // Base wave displacement
      const waveY = Math.sin(time * 0.4 * speedMult + origX * 0.5) * 0.25 * waveMult;
      const waveX = Math.cos(time * 0.3 * speedMult + origY * 0.5) * 0.2 * waveMult;

      // Vertical flow for Education
      const vFlowOffset = verticalFlow * Math.sin(time * 1.5 + origX) * 0.5;

      // Progressive forward wave for Journey
      const pFlowOffset = progressiveFlow * Math.cos(time * 1.8 + origY * 0.4) * 0.7;

      posAttr.array[idx] = origX + waveX + mouseInfluenceX * 0.2 + pFlowOffset;
      posAttr.array[idx + 1] = origY + waveY + mouseInfluenceY * 0.2 + vFlowOffset;
      posAttr.array[idx + 2] = origZ + Math.sin(time * 0.25 * speedMult + i) * 0.2;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.03 * speedMult;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={currentHover === "projects" ? 0.08 : 0.065}
        vertexColors
        transparent
        opacity={currentHover === "about" || currentHover === "skills" ? 0.95 : 0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
