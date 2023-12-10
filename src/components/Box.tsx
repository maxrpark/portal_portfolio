import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PattersMaterial } from "../shaders/PatterShaders";
extend({ PattersMaterial });

interface Props {
  position: THREE.Vector3;
}

const Box: React.FC<Props> = ({ position }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    // @ts-ignore
    ref.current.material.uTime += delta;
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.z += delta * 0.2;
  });

  return (
    // <RigidBody >
    <mesh ref={ref} position={position} scale={1}>
      <boxGeometry />
      {/*  @ts-ignore */}
      <pattersMaterial uTime={1} />;
    </mesh>
    // </RigidBody>
  );
};

export default Box;
