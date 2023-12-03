import React from "react";
import Side from "../Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../../context/useThreeContext";
import { Sparkles, useTexture } from "@react-three/drei";
import EarthGlobe from "./EarthGlobe";

interface Props {
  geometry: THREE.BufferGeometry;
}

const AboutSide: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  return (
    <Side
      // rotation={new THREE.Euler(0, 0, 0)}
      rotation={new THREE.Euler(0, Math.PI * 0.67, 0)}
      geometry={geometry}
      section={Section.ABOUT}
      color={"black"}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-4}
      >
        <EarthGlobe />
      </group>
    </Side>
  );
};

export default AboutSide;
