import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Rings = ({ position = [0, 0, 0] }) => {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    ringRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group position={position} ref={ringRef}>
      <mesh>
        <torusGeometry args={[3.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff006e"
          emissive="#ff006e"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#8338ec"
          emissive="#8338ec"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default Rings;
