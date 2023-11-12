import React from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";

interface Props {
  geometry: THREE.BufferGeometry;
}

const ProjectsSide: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  return (
    <Side
      rotation={new THREE.Euler(0, 0, 0)}
      geometry={geometry}
      section={Section.PROJECTS}
      color={"red"}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-1}
      >
        {/* <mesh scale={100} position-z={-10}>
          <planeGeometry args={[10, 10]} />
          <shaderMaterial />
        </mesh> */}
        <mesh>
          <planeGeometry args={[1.2, 1.2, 3.2]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>
    </Side>
  );
};

export default ProjectsSide;
