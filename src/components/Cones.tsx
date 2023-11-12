const Cones: React.FC = () => {
  return (
    <>
      {[...Array(150)].map(() => (
        <mesh
          position={[
            10 * Math.sin(Math.random() * 2 * Math.PI),
            10 * Math.cos(Math.random() * 2 * Math.PI),
            -Math.random() * 3 + 2,
          ]}
          scale={0.2 + Math.random() * 0.2}
        >
          <coneGeometry args={[1, 1.5, 3]} />
          {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
        </mesh>
      ))}
    </>
  );
};

export default Cones;
