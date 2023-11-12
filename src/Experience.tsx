import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/Addons.js";
import ProjectsSide from "./components/ProjectsSide";
import AboutSide from "./components/AboutSide";
import ContactSection from "./components/ContactSection";
import MoreSection from "./components/MoreSection";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { Section, useThreeContext } from "./context/useThreeContext";
import Floor from "./components/Floor";
// import Cones from "./components/Cones";
import Frame from "./components/Frame";

gsap.registerPlugin(Observer);

type GLTFResult = GLTF & {
  nodes: {
    Cone001: THREE.Mesh;
    Cone002: THREE.Mesh;
    Cone003: THREE.Mesh;
    Cone004: THREE.Mesh;
  };
};

const Experience: React.FC = () => {
  const { nodes } = useGLTF("/shape.glb") as GLTFResult;
  const geometryRef = useRef<THREE.Group>(null!);
  const { activeSection } = useThreeContext();

  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      onChangeX: (self) => {
        if (activeSection == Section.HOME) {
          geometryRef.current.rotation.y += self.deltaX * 0.02;
        }
      },
      onStop: () => {
        if (activeSection !== Section.HOME) return;

        const snapAngle = (2 * Math.PI) / 3; //
        const currentRotation = geometryRef.current.rotation.y;

        const snappedRotation =
          Math.round(currentRotation / snapAngle) * snapAngle;
        gsap.to(geometryRef.current.rotation, {
          y: snappedRotation,
          duration: 0.3,
        });
      },
    });
    return () => {
      observer.kill(); // Cleanup when the component unmounts
    };
  }, [activeSection]);
  return (
    <>
      <Environment preset='apartment' />

      <group ref={geometryRef} position-z={-0.1}>
        <AboutSide geometry={nodes.Cone001.geometry} />
        <ContactSection geometry={nodes.Cone002.geometry} />
        <ProjectsSide geometry={nodes.Cone003.geometry} />
        <MoreSection geometry={nodes.Cone004.geometry} />
      </group>

      {/* <mesh position={[-2, 0, 0]}>
        <coneGeometry args={[1, 1.5, 3]} />
      </mesh> */}

      {/* <Cones /> */}
      <Frame index={3} />
      <Frame index={2} />
      <Frame index={1} />

      <Floor />
      <mesh position={[2, 0.5, 0]} scale={0.1}>
        <sphereGeometry />
        <meshStandardMaterial color={"lightgreen"} />
      </mesh>
    </>
  );
};

export default Experience;
