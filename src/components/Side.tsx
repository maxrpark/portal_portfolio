import { ReactNode, useRef, useEffect } from "react";
import {
  Environment,
  MeshPortalMaterial,
  PresentationControls,
  Sparkles,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import {
  ActiveSection,
  Section,
  useThreeContext,
} from "../context/useThreeContext";
import { ThreeEvent, useThree } from "@react-three/fiber";

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
  const glassRef = useRef<THREE.Mesh>(null!);
  const containerGroup = useRef<THREE.Group>(null!);
  const tl = useRef<gsap.core.Timeline>(null!);
  const portalMaterialRef = useRef(null!);

  const { camera } = useThree();

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    if (activeSection === section) {
      setActiveSection(Section.HOME);

      tl.current.reverse();
    } else {
      setActiveSection(section);
      tl.current.play();
    }
  };

  useEffect(() => {
    // if (section === Section.ABOUT) {
    //   portalMaterialRef.current.blend = 1;
    //   glassRef.current.material.opacity = 0;
    // }

    // return;
    tl.current = gsap
      .timeline({ paused: true })
      .to(camera.position, {
        z: 1,
      })
      .to(
        portalMaterialRef.current,
        {
          blend: 1,
        },
        0
      )
      .to(
        glassRef.current.material,
        {
          opacity: 0,
          duration: 0.1,
        },
        0
      );
    // glassRef;
  }, []);

  return (
    <mesh
      name={section}
      ref={meshRef}
      geometry={geometry}
      onDoubleClick={handleClick}
    >
      <MeshPortalMaterial ref={portalMaterialRef}>
        <Environment preset='apartment' />
        <ambientLight />
        <Sparkles
          visible={section === Section.ABOUT}
          count={100}
          scale={2}
          size={0.2}
          speed={0.01}
        />
        <group rotation={rotation}>
          <PresentationControls
            enabled={false}
            // enabled={section === activeSection}
            global={false}
            cursor={false}
            snap={true}
            speed={1}
            zoom={1}
            polar={[0, Math.PI / 2]}
            azimuth={[-Infinity, Infinity]}
            config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
          >
            <group ref={containerGroup}>
              <Text position={[0, 2.5, -10]} color='white'>
                {section}
              </Text>
              <mesh ref={glassRef}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial
                  opacity={0.1}
                  transparent
                  metalness={1}
                  roughness={0}
                />
              </mesh>

              <mesh visible={color.length > 0}>
                <sphereGeometry args={[20, 64, 64]} />
                <meshBasicMaterial side={THREE.BackSide} color={color} />
              </mesh>
              {children}
            </group>
          </PresentationControls>
        </group>
      </MeshPortalMaterial>
    </mesh>
  );
};

export default Side;
