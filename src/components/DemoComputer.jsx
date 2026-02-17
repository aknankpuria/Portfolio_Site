import { useGLTF, useTexture } from "@react-three/drei";

const DemoComputer = ({ texture, ...props }) => {
  const { nodes, materials } = useGLTF("/models/computer.glb");

  const txt = useTexture(texture);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshMatcapMaterial map={txt} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      />
    </group>
  );
};

useGLTF.preload("/models/computer.glb");

export default DemoComputer;
