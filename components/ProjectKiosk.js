import { useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useStore } from "../stores/useStore";

export function ProjectKiosk({ data }) {
  const { openProject } = useStore();
  const [hovered, setHover] = useState(false);
  const mesh = useRef();

  // Simple animation: Bob up and down when hovered
  useFrame((state) => {
    if (hovered && mesh.current) {
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
    }
  });

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={data.pos} onClick={() => openProject(data)}>
        {/* The Base/Pedestal */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* The Floating 'Gem' representing the project */}
        <mesh 
          ref={mesh}
          position={[0, 1.5, 0]}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
        >
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial 
            color={data.color} 
            emissive={data.color}
            emissiveIntensity={hovered ? 2 : 0.5} 
          />
        </mesh>

        {/* Floating Text Title */}
        <Text 
          position={[0, 2.5, 0]} 
          fontSize={0.4} 
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {data.title}
        </Text>
      </group>
    </RigidBody>
  );
}
