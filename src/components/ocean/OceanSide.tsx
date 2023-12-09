import React, { useEffect, useState } from "react";
import Side from "../Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../../context/useThreeContext";
import Ocean from "./Ocean";
import { Center, Float, Sky, Text3D } from "@react-three/drei";

interface Props {
  geometry: THREE.BufferGeometry;
}

const OceanSide: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection, activeSection } = useThreeContext();
  const [positionZ, setPositionZ] = useState(-1000);
  const [turbidity, setTurbidity] = useState(0.001);

  useEffect(() => {
    if (activeSection === Section.PROJECTS) {
      setPositionZ(-1000);
      setTurbidity(0.001);
    } else {
      setPositionZ(-1001);
      setTurbidity(0.01);
    }
  }, [activeSection]);

  return (
    <Side
      rotation={new THREE.Euler(0, 0, 0)}
      geometry={geometry}
      section={Section.PROJECTS}
    >
      <group
        onDoubleClick={(event) => {
          event.stopPropagation();
          setActiveSection(Section.HOME);
        }}
        position={[0, -20, -100]}
      >
        <Ocean />
        <Sky sunPosition={[400, 10, positionZ]} turbidity={turbidity} />
        <Float
          speed={2} // Animation speed, defaults to 1
          rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
          floatIntensity={1.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-3, 0.5]}
        >
          <Center top>
            <Text3D
              position={[0, 20, 0]}
              letterSpacing={-0.06}
              size={20}
              font='/inter_Bold.json'
            >
              Hello world!
              <meshNormalMaterial />
            </Text3D>
          </Center>
        </Float>
      </group>
    </Side>
  );
};

export default OceanSide;
