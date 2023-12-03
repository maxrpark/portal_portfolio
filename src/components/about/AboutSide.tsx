import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import Side from "../Side";
import { Section, useThreeContext } from "../../context/useThreeContext";
import EarthGlobe from "./EarthGlobe";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { markers } from "./data";
gsap.registerPlugin(Observer);

interface Props {
  geometry: THREE.BufferGeometry;
}

const AboutSide: React.FC<Props> = ({ geometry }) => {
  const { setActiveSection } = useThreeContext();

  const { activeSection } = useThreeContext();

  const planetRef = useRef<THREE.Group>(null!);

  const curvePoints = useMemo(() => {
    let positions: THREE.Vector3[] = [];

    markers.forEach((el) => {
      for (let i = 0; i < 200 - 1; i++) {
        let points = new THREE.Vector3().lerpVectors(
          el.position,
          el.destination,
          i / 200
        );
        points.normalize();
        points.multiplyScalar(1 + 0.1 * Math.sin(Math.PI * (i / 200)));
        positions.push(points);
      }
    });

    return new THREE.CatmullRomCurve3(positions);
  }, []);

  useEffect(() => {
    if (activeSection !== Section.ABOUT) return;
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      onChange: (self) => {
        planetRef.current.rotation.y += self.deltaX * 0.02;
      },
      onStop: () => {},
    });
    return () => {
      observer.kill();
    };
  }, [activeSection]);

  return (
    <group>
      <Side
        // rotation={new THREE.Euler(0, 0, 0)}
        rotation={new THREE.Euler(0, Math.PI * 0.67, 0)}
        geometry={geometry}
        section={Section.ABOUT}
        color={"black"}
      >
        <group
          onDoubleClick={(event) => {
            event.stopPropagation();
            setActiveSection(Section.HOME);
          }}
          position-z={-4}
        >
          <group scale={2} ref={planetRef}>
            <EarthGlobe />

            <mesh>
              <tubeGeometry args={[curvePoints, 200, 0.01, 8, false]} />
              <meshStandardMaterial
                color={"white"}
                transparent
                envMapIntensity={2}
              />
            </mesh>
          </group>
        </group>
      </Side>
    </group>
  );
};

export default AboutSide;
