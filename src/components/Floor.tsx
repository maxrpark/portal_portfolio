const Floor: React.FC = () => {
  return (
    <mesh position={[0, -1.2, -1.5]} rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[3, 50]} />

      {/* <MeshReflectorMaterial
        mirror={0.1}
        blur={[300, 100]}
        resolution={2048}
        mixBlur={0.1}
        mixStrength={80}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color='#050505'
        metalness={0.5}
      /> */}
    </mesh>
  );
};

export default Floor;
