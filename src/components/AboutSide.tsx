import React from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";

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
      color={"lightblue"}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-1}
      >
        <mesh>
          <planeGeometry args={[1.2, 1.2, 3.2]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
    </Side>
  );
};

export default AboutSide;
