"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useState } from "react";

function HoloScreen({ position, title, color = "#00ffff" }) {
  const [hovered, setHover] = useState(false);
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Screen Frame */}
        <mesh 
          onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        >
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Screen Glow */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            color="black" 
            emissive={color} 
            emissiveIntensity={hovered ? 3 : 1} // Glow brighter on hover
          />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
          {title}
        </Text>
      </group>
    </Float>
  );
}

export default function CommandCenter() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#00ffff" />

      <group position={[0, -1, 0]}>
        {/* Floating Screens */}
        <HoloScreen position={[0, 1.5, -2]} title="AQUA DRONE" color="#ff00ff" />
        <HoloScreen position={[-3.5, 0.5, 0]} title="SMART TRASH" color="#00ffff" />
        <HoloScreen position={[3.5, 0.5, 0]} title="MEDICAL APP" color="#ffff00" />
        
        {/* Reflective Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#00ffff" />
      </group>

      {/* Post Processing Effects (The "Shopify" Look) */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2.0} radius={0.6} />
        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
    </Canvas>
  );
}