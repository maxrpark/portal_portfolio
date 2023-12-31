/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Blender Artist (https://sketchfab.com/moizmuhammad373)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/bird-e93a906eb38343c4a14458a637136329
Title: Bird
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface Props {
  position: THREE.Vector3;
}

const Bird: React.FC<Props> = ({ position }) => {
  const { scene, animations } = useGLTF("/models/birds.glb");
  const { actions } = useAnimations(animations, scene);
  const ref = useRef<THREE.Group>(null!);
  useEffect(() => {
    //@ts-ignore
    actions.Scene.play();
  }, []);
  useFrame((_, delta) => {
    ref.current.position.z -= delta;
    if (ref.current.position.z < -100) {
      ref.current.position.z = 10;
    }
  });
  return (
    <group ref={ref} position={position}>
      <primitive object={scene} />
    </group>
  );
};
const Birds: React.FC = () => {
  return (
    <group position-z={20}>
      <Bird position={new THREE.Vector3(1, 0, 0)} />
      <Bird position={new THREE.Vector3(-1, 0, 0)} />
    </group>
  );
};

useGLTF.preload("/models/birds.glb");

export default Birds;
