"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function SectionStructures() {
  const { activeSection, mousePosition, isMobile } = useScene();

  const aboutGroup = useRef<THREE.Group>(null);
  const educationGroup = useRef<THREE.Group>(null);
  const skillsGroup = useRef<THREE.Group>(null);
  const projectsGroup = useRef<THREE.Group>(null);
  const certsGroup = useRef<THREE.Group>(null);
  const journeyGroup = useRef<THREE.Group>(null);
  const contactGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Helper to smoothly damp group opacity/visibility and position
    const updateGroup = (
      group: React.RefObject<THREE.Group | null>,
      isActive: boolean,
      defaultPos: [number, number, number],
      rotSpeed: number = 0.2
    ) => {
      if (!group.current) return;

      const targetY = isActive ? defaultPos[1] + mousePosition.y * 0.15 : defaultPos[1] - 3;
      const targetX = defaultPos[0] + mousePosition.x * 0.2;
      const targetScale = isActive ? (isMobile ? 0.7 : 1) : 0.001;

      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, delta);
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3, delta);
      group.current.position.z = THREE.MathUtils.damp(group.current.position.z, defaultPos[2], 3, delta);

      const currentScale = group.current.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 3, delta);
      group.current.scale.set(newScale, newScale, newScale);

      // Subtle rotation
      group.current.rotation.y += delta * rotSpeed;
      group.current.rotation.x = mousePosition.y * 0.15;
    };

    updateGroup(aboutGroup, activeSection === "about", [-2.8, 0, -1], 0.25);
    updateGroup(educationGroup, activeSection === "education", [2.6, 0, -1.5], 0.3);
    updateGroup(skillsGroup, activeSection === "skills", [-2.7, 0, -1.2], 0.35);
    updateGroup(projectsGroup, activeSection === "projects", [2.8, 0.2, -1], 0.2);
    updateGroup(certsGroup, activeSection === "certifications", [-2.5, 0, -1.5], 0.25);
    updateGroup(journeyGroup, activeSection === "journey", [0, 0, -2], 0.15);
    updateGroup(contactGroup, activeSection === "contact", [0, -0.5, -1.5], 0.2);
  });

  return (
    <group>
      {/* ABOUT: Abstract Floating Frosted Glass Octahedron & Ring */}
      <group ref={aboutGroup} position={[-2.8, -3, -1]} scale={[0.001, 0.001, 0.001]}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#087F5B"
            roughness={0.15}
            metalness={0.2}
            transmission={0.8}
            ior={1.4}
            transparent
            opacity={0.7}
            wireframe={false}
          />
        </mesh>
        <mesh scale={[1.05, 1.05, 1.05]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#00E6A0" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* EDUCATION: Timeline Axis & Floating Geometric Nodes */}
      <group ref={educationGroup} position={[2.6, -3, -1.5]} scale={[0.001, 0.001, 0.001]}>
        {/* Vertical timeline spine */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4.5, 16]} />
          <meshBasicMaterial color="#00E6A0" transparent opacity={0.5} />
        </mesh>
        {/* Node 1 */}
        <mesh position={[0, 1.4, 0]}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.8} roughness={0.2} />
        </mesh>
        {/* Node 2 */}
        <mesh position={[0, 0, 0]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#00E6A0" emissive="#087F5B" emissiveIntensity={0.9} roughness={0.2} />
        </mesh>
        {/* Node 3 */}
        <mesh position={[0, -1.4, 0]}>
          <dodecahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* SKILLS: Floating Tech Lattice & Prism Matrix */}
      <group ref={skillsGroup} position={[-2.7, -3, -1.2]} scale={[0.001, 0.001, 0.001]}>
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshPhysicalMaterial
            color="#050706"
            emissive="#00E6A0"
            emissiveIntensity={0.2}
            roughness={0.1}
            transmission={0.85}
            transparent
            opacity={0.65}
          />
        </mesh>
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color="#00E6A0" wireframe transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* PROJECTS: Cinematic Glass Prisms & Emerald Reflections */}
      <group ref={projectsGroup} position={[2.8, -3, -1]} scale={[0.001, 0.001, 0.001]}>
        <mesh rotation={[0.4, 0.3, 0.5]}>
          <cylinderGeometry args={[0.9, 0.9, 1.8, 6]} />
          <meshPhysicalMaterial
            color="#0B100D"
            emissive="#087F5B"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[0.4, 0.3, 0.5]} scale={[1.03, 1.03, 1.03]}>
          <cylinderGeometry args={[0.9, 0.9, 1.8, 6]} />
          <meshBasicMaterial color="#8BFFD5" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* CERTIFICATIONS: Floating Hexagonal Glass Shield */}
      <group ref={certsGroup} position={[-2.5, -3, -1.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.12, 6]} />
          <meshPhysicalMaterial
            color="#050706"
            emissive="#00E6A0"
            emissiveIntensity={0.25}
            roughness={0.2}
            transmission={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.04, 1.04, 1.04]}>
          <cylinderGeometry args={[1.3, 1.3, 0.12, 6]} />
          <meshBasicMaterial color="#00E6A0" wireframe transparent opacity={0.6} />
        </mesh>
      </group>

      {/* JOURNEY: Knowledge Network & Neural Nodes */}
      <group ref={journeyGroup} position={[0, -3, -2]} scale={[0.001, 0.001, 0.001]}>
        {[-1.6, -0.8, 0, 0.8, 1.6].map((xPos, idx) => (
          <group key={idx} position={[xPos, Math.sin(idx * 1.2) * 0.6, 0]}>
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? "#00E6A0" : "#8BFFD5"}
                emissive="#00E6A0"
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* CONTACT: Minimal Obsidian Atmosphere & Floating Ethereal Ring */}
      <group ref={contactGroup} position={[0, -3, -1.5]} scale={[0.001, 0.001, 0.001]}>
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[2.2, 0.025, 16, 80]} />
          <meshStandardMaterial
            color="#8BFFD5"
            emissive="#00E6A0"
            emissiveIntensity={0.7}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshBasicMaterial color="#00E6A0" wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

