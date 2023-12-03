import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { markers } from "./data";

const textures = [
  // "/public/textures/earth/map_day.jpeg",
  "/textures/earth/map_test.jpg",
  "/textures/earth/normal.jpg",
  "/textures/earth/specular.jpg",
];

const EarthGlobe: React.FC = () => {
  const [map] = useTexture(textures);

  const earthRef = useRef<THREE.Mesh>(null!);

  const markersRefs = useRef<THREE.Mesh[]>([]);

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry />
        <meshBasicMaterial map={map} />
      </mesh>

      {markers.map((marker, idx) => {
        return (
          <mesh
            key={marker.id}
            ref={(el) => (markersRefs.current[idx] = el!)}
            position={marker.position}
          >
            <sphereGeometry args={[0.01, 20, 20]} />
            <meshBasicMaterial color={"red"} />
          </mesh>
        );
      })}
    </group>
  );
};

export default EarthGlobe;
