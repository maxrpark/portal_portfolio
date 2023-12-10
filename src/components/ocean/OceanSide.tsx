import React, { useEffect, useState } from "react";
import Side from "../Side";
import * as THREE from "three";
import { Section, useThreeContext } from "../../context/useThreeContext";
import Ocean from "./Ocean";
import { Center, Float, Sky, Text3D } from "@react-three/drei";
// import AirPlane from "../sky/AirPlane";

interface Props {
  geometry: THREE.BufferGeometry;
}

const OceanSide: React.FC<Props> = ({ geometry }) => {
  const [positionZ, setPositionZ] = useState(-1000);
  const [turbidity, setTurbidity] = useState(0.001);
  const { activeSection, setActiveSection } = useThreeContext();

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
        {/* <AirPlane /> */}
        <Sky sunPosition={[400, 10, positionZ]} turbidity={turbidity} />
        <Ocean />
        <Float
          speed={2}
          rotationIntensity={0.1}
          floatIntensity={1.2}
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
