"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";

export function SectionStructures() {
  const { activeSection, hoveredSection, mousePosition, isMobile } = useScene();

  const aboutGroup = useRef<THREE.Group>(null);
  const aboutRingRef = useRef<THREE.Mesh>(null);
  const aboutOctaRef = useRef<THREE.Mesh>(null);

  const educationGroup = useRef<THREE.Group>(null);
  const eduNode1Ref = useRef<THREE.Mesh>(null);
  const eduNode2Ref = useRef<THREE.Mesh>(null);
  const eduNode3Ref = useRef<THREE.Mesh>(null);

  const skillsGroup = useRef<THREE.Group>(null);
  const skillsCubeRef = useRef<THREE.Mesh>(null);
  const skillsIcosaRef = useRef<THREE.Mesh>(null);

  const projectsGroup = useRef<THREE.Group>(null);
  const projectPrismRef = useRef<THREE.Mesh>(null);

  const certsGroup = useRef<THREE.Group>(null);
  const certShieldRef = useRef<THREE.Mesh>(null);

  const journeyGroup = useRef<THREE.Group>(null);
  const contactGroup = useRef<THREE.Group>(null);
  const contactRingRef = useRef<THREE.Mesh>(null);

  // Determine current hovered state
  const currentHover = hoveredSection ?? (isMobile ? activeSection : null);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    // Helper to smoothly damp group transform
    const updateGroup = (
      group: React.RefObject<THREE.Group | null>,
      isActive: boolean,
      isHovered: boolean,
      defaultPos: [number, number, number],
      rotSpeed: number = 0.2
    ) => {
      if (!group.current) return;

      let targetY = isActive ? defaultPos[1] + mousePosition.y * 0.15 : defaultPos[1] - 3;
      let targetX = defaultPos[0] + mousePosition.x * 0.2;
      let targetZ = defaultPos[2];
      let targetScale = isActive ? (isMobile ? 0.7 : 1) : 0.001;

      // Dynamic hover arrangement adjustments
      if (isActive && isHovered) {
        targetScale *= 1.14; // Subtle pop forward in 3D
        targetZ += 0.45; // Move closer to camera for depth
        rotSpeed *= 2.2; // Increase rotational fluidity
      }

      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, delta);
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3, delta);
      group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 3, delta);

      const currentScale = group.current.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 3, delta);
      group.current.scale.set(newScale, newScale, newScale);

      // Subtle rotation
      group.current.rotation.y += delta * rotSpeed;
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        mousePosition.y * 0.15,
        3,
        delta
      );
    };

    const isAboutHovered = currentHover === "about";
    const isEduHovered = currentHover === "education";
    const isSkillsHovered = currentHover === "skills";
    const isProjectsHovered = currentHover === "projects";
    const isCertsHovered = currentHover === "certifications";
    const isJourneyHovered = currentHover === "journey";
    const isContactHovered = currentHover === "contact";

    updateGroup(aboutGroup, activeSection === "about", isAboutHovered, [-2.8, 0, -1], 0.25);
    updateGroup(educationGroup, activeSection === "education", isEduHovered, [2.6, 0, -1.5], 0.3);
    updateGroup(skillsGroup, activeSection === "skills", isSkillsHovered, [-2.7, 0, -1.2], 0.35);
    updateGroup(projectsGroup, activeSection === "projects", isProjectsHovered, [2.8, 0.2, -1], 0.2);
    updateGroup(certsGroup, activeSection === "certifications", isCertsHovered, [-2.5, 0, -1.5], 0.25);
    updateGroup(journeyGroup, activeSection === "journey", isJourneyHovered, [0, 0, -2], 0.15);
    updateGroup(contactGroup, activeSection === "contact", isContactHovered, [0, -0.5, -1.5], 0.2);

    // 1. ABOUT: Dynamic rotation and changed arrangement on hover
    if (aboutOctaRef.current) {
      const targetRotZ = isAboutHovered ? Math.sin(time * 1.5) * 0.3 : 0;
      aboutOctaRef.current.rotation.z = THREE.MathUtils.damp(
        aboutOctaRef.current.rotation.z,
        targetRotZ,
        3,
        delta
      );
    }
    if (aboutRingRef.current) {
      aboutRingRef.current.rotation.z += delta * (isAboutHovered ? 1.2 : 0.3);
    }

    // 2. EDUCATION: Smooth repositioning of timeline geometries on hover
    if (eduNode1Ref.current && eduNode2Ref.current && eduNode3Ref.current) {
      const targetSpread = isEduHovered ? 1.8 : 1.4;
      eduNode1Ref.current.position.y = THREE.MathUtils.damp(
        eduNode1Ref.current.position.y,
        targetSpread,
        3,
        delta
      );
      eduNode3Ref.current.position.y = THREE.MathUtils.damp(
        eduNode3Ref.current.position.y,
        -targetSpread,
        3,
        delta
      );

      // Subtle forward tilt
      const targetZOffset = isEduHovered ? Math.sin(time * 2) * 0.2 : 0;
      eduNode2Ref.current.position.z = THREE.MathUtils.damp(
        eduNode2Ref.current.position.z,
        targetZOffset,
        3,
        delta
      );
    }

    // 3. SKILLS: Transform into dynamic arrangement on hover
    if (skillsCubeRef.current && skillsIcosaRef.current) {
      if (isSkillsHovered) {
        skillsCubeRef.current.rotation.x += delta * 0.7;
        skillsCubeRef.current.rotation.y += delta * 0.8;
        // Icosahedron orbits around cube
        skillsIcosaRef.current.position.x = Math.cos(time * 2) * 0.8;
        skillsIcosaRef.current.position.z = Math.sin(time * 2) * 0.8;
      } else {
        skillsCubeRef.current.rotation.x += delta * 0.2;
        skillsIcosaRef.current.position.x = THREE.MathUtils.damp(
          skillsIcosaRef.current.position.x,
          0,
          3,
          delta
        );
        skillsIcosaRef.current.position.z = THREE.MathUtils.damp(
          skillsIcosaRef.current.position.z,
          0,
          3,
          delta
        );
      }
    }

    // 4. PROJECTS: Cinematic depth rotation and movement
    if (projectPrismRef.current) {
      const rotMultiplier = isProjectsHovered ? 1.8 : 0.6;
      projectPrismRef.current.rotation.y += delta * rotMultiplier;
      projectPrismRef.current.rotation.z = THREE.MathUtils.damp(
        projectPrismRef.current.rotation.z,
        isProjectsHovered ? Math.sin(time) * 0.4 : 0.5,
        3,
        delta
      );
    }

    // 5. CERTIFICATIONS: Refined floating arrangement
    if (certShieldRef.current) {
      const targetTilt = isCertsHovered ? Math.PI / 2.3 : Math.PI / 2;
      const targetFloat = isCertsHovered ? Math.sin(time * 2) * 0.15 : 0;
      certShieldRef.current.rotation.x = THREE.MathUtils.damp(
        certShieldRef.current.rotation.x,
        targetTilt,
        3,
        delta
      );
      certShieldRef.current.position.y = THREE.MathUtils.damp(
        certShieldRef.current.position.y,
        targetFloat,
        3,
        delta
      );
    }

    // 6. LEARNING JOURNEY: Progressive forward-moving depth effect
    if (journeyGroup.current) {
      journeyGroup.current.children.forEach((child, idx) => {
        const mesh = child as THREE.Group;
        const targetZ = isJourneyHovered ? Math.sin(time * 2 + idx * 0.8) * 0.6 : 0;
        mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, 3, delta);
      });
    }

    // 7. CONTACT: Calm, elegant arrangement
    if (contactRingRef.current) {
      const targetRingTilt = isContactHovered ? Math.PI / 2.8 : Math.PI / 3;
      contactRingRef.current.rotation.x = THREE.MathUtils.damp(
        contactRingRef.current.rotation.x,
        targetRingTilt,
        2.5,
        delta
      );
      contactRingRef.current.rotation.y += delta * (isContactHovered ? 0.1 : 0.2);
    }
  });

  return (
    <group>
      {/* ABOUT: Abstract Floating Frosted Glass Octahedron & Ring */}
      <group ref={aboutGroup} position={[-2.8, -3, -1]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={aboutOctaRef}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#087F5B"
            roughness={0.15}
            metalness={0.2}
            transmission={0.8}
            ior={1.4}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh scale={[1.05, 1.05, 1.05]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#00E6A0" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh ref={aboutRingRef} rotation={[Math.PI / 4, 0, 0]}>
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
        <mesh ref={eduNode1Ref} position={[0, 1.4, 0]}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.8} roughness={0.2} />
        </mesh>
        {/* Node 2 */}
        <mesh ref={eduNode2Ref} position={[0, 0, 0]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#00E6A0" emissive="#087F5B" emissiveIntensity={0.9} roughness={0.2} />
        </mesh>
        {/* Node 3 */}
        <mesh ref={eduNode3Ref} position={[0, -1.4, 0]}>
          <dodecahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* SKILLS: Floating Tech Lattice & Prism Matrix */}
      <group ref={skillsGroup} position={[-2.7, -3, -1.2]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={skillsCubeRef}>
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
        <mesh ref={skillsIcosaRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#8BFFD5" emissive="#00E6A0" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* PROJECTS: Cinematic Glass Prisms & Emerald Reflections */}
      <group ref={projectsGroup} position={[2.8, -3, -1]} scale={[0.001, 0.001, 0.001]}>
        <mesh ref={projectPrismRef} rotation={[0.4, 0.3, 0.5]}>
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
        <mesh ref={certShieldRef} rotation={[Math.PI / 2, 0, 0]}>
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
        <mesh ref={contactRingRef} rotation={[Math.PI / 3, 0.2, 0]}>
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
