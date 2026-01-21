"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Player } from "@/components/Player";
import { ProjectKiosk } from "@/components/ProjectKiosk";
import { Interface } from "@/components/Interface";
import { useStore } from "@/stores/useStore";

export default function Home() {
  const projects = useStore((state) => state.projects);

  return (
    <main className="h-screen w-full bg-gray-900 relative">
      
      {/* 1. The 3D World */}
      <Canvas shadows camera={{ position: [0, 8, 8], fov: 50 }}>
        {/* Environment */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <color attach="background" args={['#111827']} />

        <Physics gravity={[0, -9.81, 0]}>
          
          {/* Floor */}
          <RigidBody type="fixed" friction={1}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#1f2937" />
            </mesh>
            <gridHelper args={[50, 50, 0xffffff, 0x555555]} position={[0, 0.01, 0]} />
          </RigidBody>

          {/* Walls (Simple boundaries) */}
          <RigidBody type="fixed">
            <mesh position={[0, 2, -15]}>
              <boxGeometry args={[50, 4, 1]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
          </RigidBody>

          {/* Player */}
          <Player />

          {/* Dynamic Project Kiosks from CV Data */}
          {projects.map((project) => (
            <ProjectKiosk key={project.id} data={project} />
          ))}

        </Physics>
      </Canvas>

      {/* 2. The 2D UI Overlay */}
      <Interface />
      
      {/* 3. Helper Instructions */}
      <div className="absolute top-5 left-5 text-white pointer-events-none">
        <h1 className="text-2xl font-bold">Gowdham Prasath</h1>
        <p className="text-gray-400">Full Stack Developer | Python | React</p>
        <div className="mt-4 text-sm bg-white/10 p-3 rounded backdrop-blur-sm inline-block">
          <p>🎮 <b>WASD</b> to Move</p>
          <p>🖱️ <b>Click</b> floating gems to view details</p>
        </div>
      </div>
    </main>
  );
}
