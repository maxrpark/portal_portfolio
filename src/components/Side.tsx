import { ReactNode, useRef } from "react";

import { Environment, MeshPortalMaterial } from "@react-three/drei";
import * as THREE from "three";
import {
  ActiveSection,
  Section,
  useThreeContext,
} from "../context/useThreeContext";
import { ThreeEvent } from "@react-three/fiber";

import { gsap } from "gsap";
// import { useControls } from "leva";
interface Props {
  rotation: THREE.Euler;
  geometry: THREE.BufferGeometry;
  children: ReactNode;
  section: ActiveSection;
  color: string;
}

const Side: React.FC<Props> = ({
  geometry,
  rotation,
  children,
  section,
  color,
}) => {
  const { activeSection, setActiveSection } = useThreeContext();
  const meshRef = useRef<THREE.Mesh>(null!);
  const portalMaterialRef = useRef(null!);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    if (activeSection === section) {
      setActiveSection(Section.HOME);

      gsap.to(portalMaterialRef.current, {
        blend: 0,
        duration: 0,
      });
    } else {
      setActiveSection(section);

      gsap.to(portalMaterialRef.current, {
        blend: 1,
        duration: 0,
      });
    }
  };

  return (
    <mesh ref={meshRef} geometry={geometry} onClick={handleClick}>
      <MeshPortalMaterial ref={portalMaterialRef} side={THREE.DoubleSide}>
        <Environment preset='apartment' background />
        <ambientLight />
        <group rotation={rotation}>
          <mesh visible={true}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial
              opacity={0.1}
              transparent
              metalness={1}
              roughness={0}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[10, 64, 64]} />
            <meshBasicMaterial side={THREE.BackSide} color={color} />
          </mesh>
          {children}
        </group>
      </MeshPortalMaterial>
    </mesh>
  );
};

export default Side;
