const Target = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default Target;
