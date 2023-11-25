import React from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";
import { useLoader } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";

interface Props {
  geometry: THREE.BufferGeometry;
}

const ProjectsSide: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();
  const { scene } = useGLTF("/models/Secret_Camping_spot.glb");

  return (
    <Side
      rotation={new THREE.Euler(0, 0, 0)}
      geometry={geometry}
      section={Section.PROJECTS}
      color={"red"}
    >
      <Clone object={scene} position={[10, 2, -10]} />
      <Clone object={scene} position={[1, 0, -7]} />
      <Clone object={scene} position={[-4, 2, -5]} />

      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-1}
      >
        <mesh>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>
    </Side>
  );
};

export default ProjectsSide;
