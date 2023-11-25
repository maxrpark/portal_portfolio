import React, { useRef } from "react";
import Side from "./Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../context/useThreeContext";
import { Cloud, Clouds, Sky } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

interface Props {
  geometry: THREE.BufferGeometry;
}

const MoreSection: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection, activeSection } = useThreeContext();

  const cloudsRef = useRef<THREE.Group>(null!);

  const { color, x, y, z, ...config } = useControls({
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 6, min: 0, max: 100, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    fade: { value: 10, min: 0, max: 400, step: 1 },
    growth: { value: 4, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
    x: { value: 6, min: 0, max: 100, step: 1 },
    y: { value: 1, min: 0, max: 100, step: 1 },
    z: { value: 1, min: 0, max: 100, step: 1 },
    color: "white",
  });

  useFrame((state, delta) => {
    // if (activeSection !== Section.SOCIAL) return;
    cloudsRef.current.rotation.y =
      Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    cloudsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    // cloud0.current.rotation.y -= delta;
  });

  return (
    <Side
      rotation={new THREE.Euler(0, Math.PI * 1.33, 0)}
      geometry={geometry}
      section={Section.SOCIAL}
      color={""}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position-z={-1}
      >
        <Sky />
        <group ref={cloudsRef}>
          <Clouds material={THREE.MeshBasicMaterial}>
            {/* <Cloud
              segments={40}
              bounds={[10, 2, 2]}
              volume={10}
              color='eed0d0'
              scale={0.2}
              seed={2}
            />
            <Cloud seed={1} scale={0.2} volume={5} color='white' fade={100} /> */}
            {/* <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} /> */}
            <Cloud
              {...config}
              bounds={[x, y, z]}
              color='#eed0d0'
              seed={2}
              position={[15, 0, 0]}
            />
            <Cloud
              {...config}
              bounds={[x, y, z]}
              color='#d0e0d0'
              seed={3}
              position={[-15, 0, 0]}
            />
            <Cloud
              {...config}
              bounds={[x, y, z]}
              color='#a0b0d0'
              seed={4}
              position={[0, 0, -12]}
            />
            <Cloud
              {...config}
              bounds={[x, y, z]}
              color='#c0c0dd'
              seed={5}
              position={[0, 0, 12]}
            />
            <Cloud
              concentrate='outside'
              growth={100}
              color='#ffccdd'
              opacity={1.25}
              seed={0.3}
              bounds={200}
              volume={200}
            />
          </Clouds>
        </group>
      </group>
    </Side>
  );
};

export default MoreSection;
