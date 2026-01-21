"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  Text, 
  Html, 
  MeshTransmissionMaterial 
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useState } from "react";
import * as THREE from "three";

// 1. The Holographic Globe
function HoloGlobe() {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.2; // Rotate
    mesh.current.position.y = Math.sin(t) * 0.1; // Float
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.5, 64, 64]} />
        {/* Wireframe Look */}
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={2}
          wireframe 
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Inner Core */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#000" />
      </mesh>
    </group>
  );
}

// 2. Floating Project Screens
function Screen({ position, rotation, title, color }) {
  const [hovered, setHover] = useState(false);
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        position={position} 
        rotation={rotation}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {/* The Frame */}
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* The "Glass" Screen */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            color="black"
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5} 
          />
        </mesh>

        {/* Text */}
        <Text 
          position={[0, 0, 0.1]} 
          fontSize={0.2} 
          color="white"
          font="/fonts/Inter-Bold.woff" // Optional: Uses default if not found
          anchorX="center" 
          anchorY="middle"
        >
          {title.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
}

// 3. The Main Scene
export default function CommandCenter() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas gl={{ antialias: false }}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        {/* Cinematic Lighting */}
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#ff00ff" />

        {/* The Desk Objects */}
        <group position={[0, -1, 0]}>
          <HoloGlobe />
          
          {/* Screens arranged in a curve */}
          <Screen position={[-3.5, 1, 1]} rotation={[0, 0.5, 0]} title="Smart Trash" color="#ff00ff" />
          <Screen position={[0, 2, -1]} rotation={[0, 0, 0]} title="Aqua Drone" color="#00ffff" />
          <Screen position={[3.5, 1, 1]} rotation={[0, -0.5, 0]} title="Medical App" color="#ffff00" />
          
          {/* The "Desk" Surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial 
              color="#111" 
              metalness={0.8} 
              roughness={0.1} 
            />
          </mesh>
          <gridHelper args={[20, 20, 0x444444, 0x111111]} position={[0, -1.99, 0]} />
        </group>

        {/* POST PROCESSING (The "Glow" Effect) */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} // Objects brighter than this will glow
            mipmapBlur // Smooth blur
            intensity={1.5} // Strength of glow
            radius={0.8} // Size of glow
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* HTML UI Overlay */}
      <div className="absolute top-10 left-10 pointer-events-none select-none">
        <h1 className="text-6xl font-black text-white tracking-tighter" style={{ textShadow: "0 0 20px cyan" }}>
          GOWDHAM
        </h1>
        <p className="text-cyan-400 font-mono tracking-widest mt-2">SYSTEM ONLINE // PORTFOLIO V2</p>
      </div>
    </div>
  );
}