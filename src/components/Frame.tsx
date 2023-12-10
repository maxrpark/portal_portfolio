import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
};

interface Props {
  index: number;
}

import { PattersMaterial } from "../shaders/PatterShaders";

extend({ PattersMaterial });

const Frame: React.FC<Props> = ({ index }) => {
  const { nodes } = useGLTF("/frame.glb") as GLTFResult;
  const frameRef = useRef<THREE.Mesh>(null!);
  // const materialRef = useRef();

  useFrame((_, delta) => {
    frameRef.current.rotation.z += delta * index * 0.05;
    frameRef.current.position.z += delta * 2;
    if (frameRef.current.position.z > 0) {
      frameRef.current.position.z = -45;
      // gsap.from(frameRef.current.material, {
      //   opacity: 0,
      // });
    }
    // @ts-ignore
    // materialRef.current.uTime += delta;
  });

  return (
    <>
      <mesh
        ref={frameRef}
        scale={[6, 6, 1.2]}
        position-z={index * -15}
        rotation-z={index * 2}
        geometry={nodes.Cube.geometry}
      />
      <boxGeometry args={[20, 20, 20]} />
      <meshBasicMaterial color={"blue"} wireframe />
      {/* <pattersMaterial ref={materialRef} uTime={1} /> */}
    </>
  );
};

useGLTF.preload("/frame.glb");

export default Frame;
