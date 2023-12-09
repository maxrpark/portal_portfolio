import React, { useRef } from "react";
import * as THREE from "three";
import Side from "../Side";
import { Section, useThreeContext } from "../../context/useThreeContext";
import EarthGlobe from "./EarthGlobe";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useFrame } from "@react-three/fiber";
gsap.registerPlugin(Observer);

interface Props {
  geometry: THREE.BufferGeometry;
}

const SpaceSideSection: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  const planetRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    planetRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group>
      <Side
        rotation={new THREE.Euler(0, Math.PI * 0.67, 0)}
        geometry={geometry}
        section={Section.ABOUT}
      >
        <group
          onDoubleClick={(event) => {
            event.stopPropagation();
            setActiveSection(Section.HOME);
          }}
          position-z={-4}
        >
          <group scale={2} ref={planetRef}>
            <EarthGlobe />
          </group>
        </group>
      </Side>
    </group>
  );
};

export default SpaceSideSection;
