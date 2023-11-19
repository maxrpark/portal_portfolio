import React from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";

interface Props {
  geometry: THREE.BufferGeometry;
}

const MoreSection: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  return (
    <Side
      rotation={new THREE.Euler(0, Math.PI * 1.33, 0)}
      geometry={geometry}
      section={Section.SOCIAL}
      color={"red"}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-1}
      >
        <mesh>
          <planeGeometry args={[1.2, 1.2]} />

          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </group>
    </Side>
  );
};

export default MoreSection;
