import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../stores/useStore"; // Import store

const SPEED = 5;

export function Player() {
  const rb = useRef();
  const { camera } = useThree();
  const { forward, backward, left, right } = useKeyboard();
  const mode = useStore((state) => state.mode); // Get current mode

  useFrame(() => {
    if (!rb.current) return;

    const vel = rb.current.linvel();
    
    // IF READING, STOP MOVEMENT
    if (mode === 'reading') {
      rb.current.setLinvel({ x: 0, y: vel.y, z: 0 });
      return;
    }

    // Normal Movement Logic
    const front = Number(backward) - Number(forward);
    const side = Number(left) - Number(right);
    const direction = new THREE.Vector3(side, 0, front).normalize();

    rb.current.setLinvel({ 
      x: direction.x * SPEED, 
      y: vel.y, 
      z: direction.z * SPEED 
    });

    const pos = rb.current.translation();
    const cameraTarget = new THREE.Vector3(pos.x, pos.y + 5, pos.z + 8);
    camera.position.lerp(cameraTarget, 0.1);
    camera.lookAt(pos.x, pos.y, pos.z);
  });

  return (
    <RigidBody 
      ref={rb} 
      position={[0, 2, 0]} 
      enabledRotations={[false, false, false]} 
      colliders="cuboid"
    >
      <mesh castShadow>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color="#fbbf24" /> {/* Gold color for Gowdham */}
      </mesh>
    </RigidBody>
  );
}
