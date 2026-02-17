import { useRef, useEffect } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";

const DemoComputer = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/computer.glb");

  // Use useVideoTexture from drei - it handles video loading properly
  const txt = useVideoTexture(
    props.texture ? props.texture : "/textures/project/project1.mp4",
  );

  useEffect(() => {
    if (txt) {
      txt.flipY = false;
    }
  }, [txt]);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshBasicMaterial map={txt} toneMapped={false} />
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
