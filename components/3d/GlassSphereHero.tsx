"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function GlassSphereHero() {
  const { effectiveSection, mousePosition, isMobile } = useScene();
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse lerp
    mousePosition.x = THREE.MathUtils.damp(mousePosition.x, mousePosition.targetX, 4, delta);
    mousePosition.y = THREE.MathUtils.damp(mousePosition.y, mousePosition.targetY, 4, delta);

    // Section-based transform targets
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1;
    let targetOpacity = 1;

    switch (effectiveSection) {
      case "home":
        targetX = mousePosition.x * 0.45;
        targetY = mousePosition.y * 0.35;
        targetZ = 0;
        targetScale = isMobile ? 0.8 : 1.15;
        targetOpacity = 1;
        break;
      case "about":
        // Moves far right background as ambient accent
        targetX = isMobile ? 2.5 : 3.8 + mousePosition.x * 0.2;
        targetY = 1.0 + mousePosition.y * 0.2;
        targetZ = -4.5;
        targetScale = 0.4;
        targetOpacity = 0.35;
        break;
      case "education":
        targetX = -3.8 + mousePosition.x * 0.2;
        targetY = -1.2;
        targetZ = -5.0;
        targetScale = 0.35;
        targetOpacity = 0.25;
        break;
      case "skills":
        targetX = 3.6 + mousePosition.x * 0.2;
        targetY = -1.5;
        targetZ = -5.0;
        targetScale = 0.3;
        targetOpacity = 0.2;
        break;
      case "projects":
        targetX = -4.0 + mousePosition.x * 0.15;
        targetY = 1.8;
        targetZ = -5.5;
        targetScale = 0.35;
        targetOpacity = 0.25;
        break;
      case "certifications":
        targetX = 3.8;
        targetY = 1.2;
        targetZ = -5.5;
        targetScale = 0.3;
        targetOpacity = 0.2;
        break;
      case "journey":
        targetX = 0;
        targetY = 3.5;
        targetZ = -6.0;
        targetScale = 0.25;
        targetOpacity = 0.15;
        break;
      case "contact":
        targetX = mousePosition.x * 0.3;
        targetY = -2.2;
        targetZ = -4.0;
        targetScale = 0.55;
        targetOpacity = 0.45;
        break;
    }

    // Smoothly damp group transform towards targets
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 2.5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 2.5, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 2.5, delta);

    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.damp(currentScale, targetScale, 2.5, delta);
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Continuous rotation of the sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.25;
      sphereRef.current.rotation.x = mousePosition.y * 0.2;
      sphereRef.current.rotation.z = -mousePosition.x * 0.2;

      const mat = sphereRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat && mat.opacity !== undefined) {
        mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 3, delta);
      }
    }

    // Rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35;
      ring2Ref.current.rotation.z += delta * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.2;
      ring3Ref.current.rotation.z -= delta * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core Emerald Glass Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshPhysicalMaterial
          color="#0B1C14"
          emissive="#00E6A0"
          emissiveIntensity={0.4}
          roughness={0.12}
          metalness={0.2}
          transmission={0.88}
          ior={1.45}
          transparent={true}
          opacity={1}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Internal glowing emerald core */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial
          color="#00E6A0"
          transparent={true}
          opacity={0.4}
          wireframe={true}
        />
      </mesh>

      {/* Floating Concentric Glass Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#8BFFD5"
          emissive="#00E6A0"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.55, 0.025, 16, 80]} />
        <meshStandardMaterial
          color="#00E6A0"
          emissive="#087F5B"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.9, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#A7B5AD"
          emissive="#00E6A0"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
