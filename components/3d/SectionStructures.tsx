"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function SectionStructures() {
  const { effectiveSection, mousePosition, isMobile } = useScene();

  const aboutGroup = useRef<THREE.Group>(null);
  const aboutOcta1Ref = useRef<THREE.Mesh>(null);
  const aboutOcta2Ref = useRef<THREE.Mesh>(null);
  const aboutRing1Ref = useRef<THREE.Mesh>(null);
  const aboutRing2Ref = useRef<THREE.Mesh>(null);

  const educationGroup = useRef<THREE.Group>(null);
  const eduSpineRef = useRef<THREE.Mesh>(null);
  const eduNode1Ref = useRef<THREE.Mesh>(null);
  const eduNode2Ref = useRef<THREE.Mesh>(null);
  const eduNode3Ref = useRef<THREE.Mesh>(null);

  const skillsGroup = useRef<THREE.Group>(null);
  const skillsCubeRef = useRef<THREE.Mesh>(null);
  const skillsIcosaRef = useRef<THREE.Mesh>(null);

  const projectsGroup = useRef<THREE.Group>(null);
  const projectPrism1Ref = useRef<THREE.Mesh>(null);
  const projectPrism2Ref = useRef<THREE.Mesh>(null);

  const certsGroup = useRef<THREE.Group>(null);
  const certShieldRef = useRef<THREE.Mesh>(null);
  const certToken1Ref = useRef<THREE.Mesh>(null);
  const certToken2Ref = useRef<THREE.Mesh>(null);

  const journeyGroup = useRef<THREE.Group>(null);

  const contactGroup = useRef<THREE.Group>(null);
  const contactRingRef = useRef<THREE.Mesh>(null);
  const contactCoreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    // Helper to smoothly damp group transform
    const updateGroup = (
      group: React.RefObject<THREE.Group | null>,
      isActive: boolean,
      defaultPos: [number, number, number],
      scaleSize: number = 1.25,
      rotSpeed: number = 0.25
    ) => {
      if (!group.current) return;

      const targetScale = isActive ? (isMobile ? scaleSize * 0.75 : scaleSize) : 0.001;
      const targetY = isActive ? defaultPos[1] + mousePosition.y * 0.2 : defaultPos[1] - 4;
      const targetX = defaultPos[0] + mousePosition.x * 0.25;
      const targetZ = defaultPos[2];

      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, delta);
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3, delta);
      group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 3, delta);

      const currentScale = group.current.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 3, delta);
      group.current.scale.set(newScale, newScale, newScale);

      // Smooth continuous rotational animation
      group.current.rotation.y += delta * rotSpeed;
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        mousePosition.y * 0.2,
        3,
        delta
      );
    };

    // 1. ABOUT: Flowing geometric formation (dual octahedrons & orbital rings)
    updateGroup(aboutGroup, effectiveSection === "about", [isMobile ? 0 : 2.0, 0.2, -0.5], 1.3, 0.3);
    if (aboutOcta1Ref.current && aboutOcta2Ref.current) {
      aboutOcta1Ref.current.rotation.y += delta * 0.4;
      aboutOcta1Ref.current.rotation.z = Math.sin(time * 1.5) * 0.3;
      aboutOcta2Ref.current.rotation.y -= delta * 0.35;
      aboutOcta2Ref.current.rotation.x = Math.cos(time * 1.2) * 0.3;
    }
    if (aboutRing1Ref.current && aboutRing2Ref.current) {
      aboutRing1Ref.current.rotation.z += delta * 0.6;
      aboutRing2Ref.current.rotation.x += delta * 0.5;
    }

    // 2. EDUCATION: Vertical timeline formation with spread nodes
    updateGroup(educationGroup, effectiveSection === "education", [isMobile ? 0 : 2.2, 0, -0.5], 1.25, 0.2);
    if (eduNode1Ref.current && eduNode2Ref.current && eduNode3Ref.current) {
      eduNode1Ref.current.position.y = 1.8 + Math.sin(time * 2) * 0.1;
      eduNode1Ref.current.rotation.y += delta * 0.5;

      eduNode2Ref.current.position.z = Math.sin(time * 2.2) * 0.2;
      eduNode2Ref.current.rotation.x += delta * 0.6;

      eduNode3Ref.current.position.y = -1.8 - Math.sin(time * 2) * 0.1;
      eduNode3Ref.current.rotation.y += delta * 0.5;
    }

    // 3. SKILLS: Dynamic rotating 3D tech lattice (cube + orbiting icosahedron)
    updateGroup(skillsGroup, effectiveSection === "skills", [isMobile ? 0 : -2.0, 0.2, -0.5], 1.2, 0.4);
    if (skillsCubeRef.current && skillsIcosaRef.current) {
      skillsCubeRef.current.rotation.x += delta * 0.5;
      skillsCubeRef.current.rotation.y += delta * 0.6;

      // Orbiting icosahedron
      skillsIcosaRef.current.position.x = Math.cos(time * 1.6) * 1.8;
      skillsIcosaRef.current.position.z = Math.sin(time * 1.6) * 1.8;
      skillsIcosaRef.current.position.y = Math.sin(time * 2) * 0.5;
      skillsIcosaRef.current.rotation.y += delta * 0.8;
    }

    // 4. PROJECTS: Cinematic depth prisms with parallax drift
    updateGroup(projectsGroup, effectiveSection === "projects", [isMobile ? 0 : 2.0, 0.1, -0.5], 1.35, 0.25);
    if (projectPrism1Ref.current && projectPrism2Ref.current) {
      projectPrism1Ref.current.rotation.y += delta * 0.5;
      projectPrism1Ref.current.position.z = Math.sin(time * 1.5) * 0.4;

      projectPrism2Ref.current.rotation.y -= delta * 0.4;
      projectPrism2Ref.current.position.z = -Math.sin(time * 1.5) * 0.4;
    }

    // 5. CERTIFICATIONS: Refined floating hexagonal glass shield & tokens
    updateGroup(certsGroup, effectiveSection === "certifications", [isMobile ? 0 : -2.0, 0.1, -0.5], 1.25, 0.2);
    if (certShieldRef.current) {
      certShieldRef.current.position.y = Math.sin(time * 1.8) * 0.2;
      certShieldRef.current.rotation.y += delta * 0.3;
    }
    if (certToken1Ref.current && certToken2Ref.current) {
      certToken1Ref.current.position.y = 1.3 + Math.sin(time * 2 + 1) * 0.2;
      certToken2Ref.current.position.y = -1.3 - Math.sin(time * 2 + 1) * 0.2;
    }

    // 6. LEARNING JOURNEY: Progressive forward depth network
    updateGroup(journeyGroup, effectiveSection === "journey", [0, 0.3, -1.0], 1.3, 0.15);
    if (journeyGroup.current) {
      journeyGroup.current.children.forEach((child, idx) => {
        const mesh = child as THREE.Group;
        // Progressive forward wave in Z space
        mesh.position.z = Math.sin(time * 2.2 + idx * 0.8) * 0.8;
      });
    }

    // 7. CONTACT: Calm, elegant arrangement
    updateGroup(contactGroup, effectiveSection === "contact", [0, -0.4, -0.8], 1.3, 0.15);
    if (contactRingRef.current && contactCoreRef.current) {
      contactRingRef.current.rotation.x = Math.PI / 2.7 + Math.sin(time * 0.8) * 0.08;
      contactRingRef.current.rotation.y += delta * 0.12;

      const pulseScale = 1 + Math.sin(time * 1.5) * 0.1;
      contactCoreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <group>
      {/* 1. ABOUT: Flowing Geometric Formation */}
      <group ref={aboutGroup} position={[2.0, -4, -0.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={aboutOcta1Ref} position={[0, 0.4, 0]}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshPhysicalMaterial
            color="#087F5B"
            emissive="#00E6A0"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.3}
            transmission={0.85}
            ior={1.45}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh scale={[1.04, 1.04, 1.04]} position={[0, 0.4, 0]}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshBasicMaterial color="#8BFFD5" wireframe transparent opacity={0.6} />
        </mesh>

        <mesh ref={aboutOcta2Ref} position={[0.9, -0.7, 0.4]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshPhysicalMaterial
            color="#00E6A0"
            emissive="#087F5B"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh ref={aboutRing1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.0, 0.035, 16, 80]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.9} />
        </mesh>

        <mesh ref={aboutRing2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.35, 0.025, 16, 80]} />
          <meshStandardMaterial color="#00E6A0" emissive="#087F5B" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* 2. EDUCATION: Timeline Spine & Floating Geometric Nodes */}
      <group ref={educationGroup} position={[2.2, -4, -0.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={eduSpineRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 5.5, 16]} />
          <meshBasicMaterial color="#00E6A0" transparent opacity={0.85} />
        </mesh>

        {/* Node 1 */}
        <mesh ref={eduNode1Ref} position={[0, 1.8, 0]}>
          <dodecahedronGeometry args={[0.52, 0]} />
          <meshStandardMaterial
            color="#8BFFD5"
            emissive="#00E6A0"
            emissiveIntensity={1.0}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Node 2 */}
        <mesh ref={eduNode2Ref} position={[0, 0, 0]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#00E6A0"
            emissive="#087F5B"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Node 3 */}
        <mesh ref={eduNode3Ref} position={[0, -1.8, 0]}>
          <dodecahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial
            color="#8BFFD5"
            emissive="#00E6A0"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* 3. SKILLS: Dynamic Rotating 3D Tech Lattice (Cube & Orbiting Core) */}
      <group ref={skillsGroup} position={[-2.0, -4, -0.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={skillsCubeRef}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshPhysicalMaterial
            color="#050706"
            emissive="#00E6A0"
            emissiveIntensity={0.4}
            roughness={0.1}
            transmission={0.88}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh scale={[1.03, 1.03, 1.03]}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshBasicMaterial color="#8BFFD5" wireframe transparent opacity={0.7} />
        </mesh>

        {/* Orbiting Icosahedron */}
        <mesh ref={skillsIcosaRef} position={[1.8, 0, 0]}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#8BFFD5"
            emissive="#00E6A0"
            emissiveIntensity={1.1}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 4. PROJECTS: Cinematic Crystal Prisms */}
      <group ref={projectsGroup} position={[2.0, -4, -0.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={projectPrism1Ref} position={[0, 0.3, 0]} rotation={[0.4, 0.3, 0.5]}>
          <cylinderGeometry args={[1.0, 1.0, 2.2, 6]} />
          <meshPhysicalMaterial
            color="#0B100D"
            emissive="#087F5B"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.3}
            transmission={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0.4, 0.3, 0.5]} scale={[1.04, 1.04, 1.04]}>
          <cylinderGeometry args={[1.0, 1.0, 2.2, 6]} />
          <meshBasicMaterial color="#00E6A0" wireframe transparent opacity={0.65} />
        </mesh>

        <mesh ref={projectPrism2Ref} position={[-1.2, -0.8, -0.6]} rotation={[-0.3, 0.5, -0.2]}>
          <cylinderGeometry args={[0.65, 0.65, 1.6, 6]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.9} />
        </mesh>
      </group>

      {/* 5. CERTIFICATIONS: Refined Floating Hexagonal Glass Shield */}
      <group ref={certsGroup} position={[-2.0, -4, -0.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={certShieldRef} rotation={[Math.PI / 2.3, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.16, 6]} />
          <meshPhysicalMaterial
            color="#050706"
            emissive="#00E6A0"
            emissiveIntensity={0.5}
            roughness={0.15}
            transmission={0.88}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0, 0]} scale={[1.05, 1.05, 1.05]}>
          <cylinderGeometry args={[1.5, 1.5, 0.16, 6]} />
          <meshBasicMaterial color="#8BFFD5" wireframe transparent opacity={0.8} />
        </mesh>

        {/* Floating Accent Tokens */}
        <mesh ref={certToken1Ref} position={[1.4, 1.3, 0.2]}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#00E6A0" emissive="#00E6A0" emissiveIntensity={0.9} />
        </mesh>
        <mesh ref={certToken2Ref} position={[-1.4, -1.3, 0.2]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#087F5B" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* 6. LEARNING JOURNEY: Progressive Forward Depth Network */}
      <group ref={journeyGroup} position={[0, -4, -1.0]} scale={[0.001, 0.001, 0.001]}>
        {[-2.2, -1.1, 0, 1.1, 2.2].map((xPos, idx) => (
          <group key={idx} position={[xPos, Math.sin(idx * 1.3) * 0.7, 0]}>
            <mesh>
              <sphereGeometry args={[0.38, 20, 20]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? "#00E6A0" : "#8BFFD5"}
                emissive="#00E6A0"
                emissiveIntensity={1.1}
                roughness={0.2}
              />
            </mesh>
            {/* Pulsing ring around node */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.6, 0.02, 12, 32]} />
              <meshBasicMaterial color="#8BFFD5" transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 7. CONTACT: Calm, Elegant Arrangement */}
      <group ref={contactGroup} position={[0, -4, -0.8]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={contactRingRef} rotation={[Math.PI / 2.7, 0.1, 0]}>
          <torusGeometry args={[2.5, 0.038, 16, 96]} />
          <meshStandardMaterial
            color="#8BFFD5"
            emissive="#00E6A0"
            emissiveIntensity={0.9}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh ref={contactCoreRef}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshPhysicalMaterial
            color="#087F5B"
            emissive="#00E6A0"
            emissiveIntensity={0.6}
            roughness={0.15}
            transmission={0.85}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}
