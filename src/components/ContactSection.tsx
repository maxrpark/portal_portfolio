import React from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";
import { Cloud, Clouds } from "@react-three/drei";

interface Props {
  geometry: THREE.BufferGeometry;
}

const ContactSection: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  return (
    <Side
      rotation={new THREE.Euler(0, 0, Math.PI / 2)}
      geometry={geometry}
      section={Section.CONTACT}
      color={"yellow"}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-1}
      >
        <mesh
          rotation={new THREE.Euler(0, Math.PI * 0.5, 0)}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[1.2, 1.2, 3.2]} />

          <meshStandardMaterial color={"violet"} />
        </mesh>
      </group>
    </Side>
  );
};

export default ContactSection;
