import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = ({ ...props }) => {
  const { nodes } = useGLTF("/models/cube.glb");
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.5;
    cubeRef.current.rotation.x += delta * 0.3;
  });

  return (
    <group {...props} dispose={null} ref={cubeRef} scale={2.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
      />
    </group>
  );
};

useGLTF.preload("/models/cube.glb");

export default Cube;
