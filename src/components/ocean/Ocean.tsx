import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Water } from "three-stdlib";
console.log(Water);

extend({ Water });

const Ocean: React.FC = () => {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpg");

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512 * 2,
      textureHeight: 512 * 2,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      // format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame((_, delta) => {
    // @ts-ignore
    ref.current.material.uniforms.time.value += delta * 0.6;
  });
  return (
    // @ts-ignore
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, 0, 0]}
    />
  );
};

export default Ocean;
