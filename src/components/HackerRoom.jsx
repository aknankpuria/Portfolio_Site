import { useGLTF, useTexture, MeshTransmissionMaterial } from "@react-three/drei";

/**
 * Minimal HackerRoom — only the monitor screen is shown.
 * Strips: table, desk legs, cables, VHS, TV, ground, props, keyboard mat, arm, stand.
 * Keeps: screen display, glass bezel, computer monitor body.
 */
export function HackerRoom(props) {
  const { nodes, materials } = useGLTF("/models/hacker-room.glb");

  const monitortxt = useTexture("textures/desk/monitor.png");
  const screenTxt = useTexture("textures/desk/screen.png");

  return (
    <group {...props} dispose={null}>
      {/* Screen glow display */}
      <mesh
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshMatcapMaterial map={screenTxt} />
      </mesh>

      {/* Monitor glass bezel */}
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />

      {/* Monitor body */}
      <mesh
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      >
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/hacker-room.glb");

export default HackerRoom;
