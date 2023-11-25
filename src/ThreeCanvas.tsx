import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import Experience from "./Experience";
const locationHash = window.location.hash;
const ThreeCanvas: React.FC = () => {
  return (
    <div className='webgl-wrapper'>
      <Leva collapsed hidden={locationHash !== "#debug"} />
      <Canvas
        shadows
        gl={{
          antialias: true,
        }}
      >
        <Experience />
        {locationHash === "#debug" && <Perf position='top-left' />}
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
