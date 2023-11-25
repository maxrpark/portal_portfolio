import React from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";
import { Sparkles } from "@react-three/drei";

interface Props {
  geometry: THREE.BufferGeometry;
}

const AboutSide: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  return (
    <Side
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
        position-z={-1}
      >
        <Sparkles count={500} scale={10} speed={0.2} />
        <mesh>
          <planeGeometry args={[1.2, 1.2, 3.2]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
    </Side>
  );
};

export default AboutSide;
