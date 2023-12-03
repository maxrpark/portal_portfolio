import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { useThreeContext } from "../context/useThreeContext";

const Rig: React.FC = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}: any) => {
  const { controls, scene } = useThree();
  const { activeSection } = useThreeContext();

  useEffect(() => {
    const active = scene.getObjectByName(activeSection);

    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 1.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={0} />;
};

export default Rig;
