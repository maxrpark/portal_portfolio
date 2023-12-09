import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const textures = [
  "/textures/earth/map_test.jpg",
  "/textures/earth/normal.jpg",
  "/textures/earth/specular.jpg",
];

const EarthGlobe: React.FC = () => {
  const [map] = useTexture(textures);

  const earthRef = useRef<THREE.Mesh>(null!);

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={map} />
      </mesh>
    </group>
  );
};

export default EarthGlobe;
