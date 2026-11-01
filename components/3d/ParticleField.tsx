"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function ParticleField() {
  const { isMobile, mousePosition } = useScene();
  const pointsRef = useRef<THREE.Points>(null);

  const count = isMobile ? 180 : 380;

  const [positions, colors, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const emeraldColor = new THREE.Color("#00E6A0");
    const mintColor = new THREE.Color("#8BFFD5");
    const deepColor = new THREE.Color("#087F5B");

    for (let i = 0; i < count; i++) {
      // Spread across a cylindrical volume
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

      // Color variation: 60% emerald, 25% mint, 15% deep emerald
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

    // Subtle continuous wave & mouse repulsion
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];

      // Wave displacement
      const waveY = Math.sin(time * 0.4 + origX * 0.5) * 0.25;
      const waveX = Math.cos(time * 0.3 + origY * 0.5) * 0.2;

      // Gentle mouse interaction
      const mouseInfluenceX = mousePosition.x * 0.4;
      const mouseInfluenceY = mousePosition.y * 0.4;

      posAttr.array[idx] = origX + waveX + mouseInfluenceX * 0.2;
      posAttr.array[idx + 1] = origY + waveY + mouseInfluenceY * 0.2;
      posAttr.array[idx + 2] = origZ + Math.sin(time * 0.2 + i) * 0.15;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.03;
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
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

