import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { PattersMaterial } from "../shaders/PatterShaders";

extend({ PattersMaterial });

const Floor: React.FC = () => {
  const materialRef = useRef();
  useFrame((_, delta) => {
    // @ts-ignore
    materialRef.current.uTime += delta;
  });
  return (
    <mesh position={[0, -1.2, -1.5]} rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[3, 50]} />
      {/* @ts-ignore */}
      <pattersMaterial ref={materialRef} uTime={1} />
    </mesh>
  );
};

export default Floor;
