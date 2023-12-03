import { Html, Stars, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

const textures = [
  // "/public/textures/earth/map_day.jpeg",
  "/textures/earth/map_test.jpg",
  "/textures/earth/normal.jpg",
  "/textures/earth/specular.jpg",
];

type Props = {};

const EarthGlobe: React.FC = (props: Props) => {
  const [map, normal, specular] = useTexture(textures);

  const earthRef = useRef<THREE.Mesh>(null!);

  const markers = [
    { id: 0, lat: -32.89084, lng: -68.82717, type: "place", name: "mendoza" },
    {
      id: 1,
      lat: 13.25,
      lng: -61.2,
      type: "place",
      name: "saint vincent and the grenadines",
    },

    {
      id: 2,
      lat: -13.254308,
      lng: 34.301525,
      type: "place",
      name: "malawi",
    },
    { id: 3, lat: -32.89084, lng: -68.82717, type: "place", name: "mendoza" },
    { id: 4, lat: 1.373333, lng: 32.290275, type: "place", name: "uganda" },
    { id: 5, lat: -32.89084, lng: -68.82717, type: "place", name: "mendoza" },
    {
      id: 6,
      lat: 37.5326,
      lng: 127.024612,
      type: "place",
      name: "south korea",
    },
  ];

  const calcPosFromLatLongRad = (lat: number, lng: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(Math.sin(phi) * Math.cos(theta));
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  return (
    <group scale={2}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 30, 30]} />
        <meshBasicMaterial map={map} />
      </mesh>

      {markers.map((el) => {
        return (
          <mesh position={calcPosFromLatLongRad(el.lat, el.lng)}>
            <sphereGeometry args={[0.01, 20, 20]} />
            <meshBasicMaterial color={"red"} />
            {/* <Html
              position={[0, 0, 0]}
              occlude={[earthRef]}
              center
              wrapperClass='label'
              distanceFactor={8}
            >
              <div>{el.name}</div>
            </Html> */}
          </mesh>
        );
      })}
    </group>
  );
};

export default EarthGlobe;
