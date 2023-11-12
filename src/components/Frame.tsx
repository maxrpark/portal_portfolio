import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
};

interface Props {
  index: number;
}

const Frame: React.FC<Props> = ({ index }) => {
  const { nodes } = useGLTF("/frame.glb") as GLTFResult;
  const frameRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    frameRef.current.rotation.z += delta * index * 0.05;
    frameRef.current.position.z += delta * 2;
    if (frameRef.current.position.z > 0) {
      frameRef.current.position.z = -45;
      // gsap.from(frameRef.current.material, {
      //   opacity: 0,
      // });
    }
  });
  return (
    <>
      <mesh
        ref={frameRef}
        scale={[6, 6, 1.2]}
        position-z={index * -15}
        rotation-z={index * 2}
        dispose={null}
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
      />
      <meshStandardMaterial color={"blue"} />
    </>
  );
};

useGLTF.preload("/frame.glb");

export default Frame;
